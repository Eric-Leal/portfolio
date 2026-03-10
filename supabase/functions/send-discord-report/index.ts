import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const DISCORD_WEBHOOK_URL = Deno.env.get('DISCORD_WEBHOOK_URL')

const reportColor = {
  INSERT: 0x29d6d4, // Ciano
  UPDATE: 0x77309a, // Roxo
  WEEKLY_REPORT: 0x3498db, // Azul
}

/**
 * Edge Function para notificar o Discord sobre novos recados ou edições.
 * Recebe o ID da mensagem via payload, busca os detalhes no banco (bypass RLS) e formata um embed bonitão.
 *
 */

Deno.serve(async (req) => {
  try {
    if (!DISCORD_WEBHOOK_URL) {
      throw new Error('DISCORD_WEBHOOK_URL is not defined')
    }

    const { record, type } = await req.json()
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    let discordPayload

    // --- CENÁRIO 1: RELATÓRIO SEMANAL (CRON JOB) ---
    if (type === 'WEEKLY_REPORT') {
      const reportDays = 6
      const intervalDate = new Date()
      intervalDate.setDate(intervalDate.getDate() - reportDays)
      const isoDate = intervalDate.toISOString()

      // Busca estatísticas simultaneamente
      const [newUsers, newMessages, updatedMessages] = await Promise.all([
        supabaseAdmin
          .from('guests')
          .select('*', { count: 'exact', head: true })
          .gt('created_at', isoDate),
        supabaseAdmin
          .from('messages')
          .select('*', { count: 'exact', head: true })
          .gt('created_at', isoDate),
        supabaseAdmin
          .from('messages')
          .select('*', { count: 'exact', head: true })
          .gt('updated_at', isoDate)
          .lt('created_at', isoDate),
      ])

      discordPayload = {
        embeds: [
          {
            title: '📊 Relatório de Atividade (Últimos 6 dias)',
            description: 'Resumo das métricas.',
            color: reportColor.WEEKLY_REPORT,
            fields: [
              {
                name: '👤 Novos Usuários',
                value: `${newUsers.count || 0}`,
                inline: true,
              },
              {
                name: '💬 Novas Mensagens',
                value: `${newMessages.count || 0}`,
                inline: true,
              },
              {
                name: '📝 Mensagens Editadas',
                value: `${updatedMessages.count || 0}`,
                inline: true,
              },
            ],
            footer: { text: 'Relatório Automático • Portfolio' },
            timestamp: new Date().toISOString(),
          },
        ],
      }
    }
    // --- CENÁRIO 2: ATIVIDADE DE MENSAGENS (TRIGGER) ---
    else {
      const { data: message, error: dbError } = await supabaseAdmin
        .from('messages')
        .select('content, guests(name, profile_image)')
        .eq('id', record.id)
        .single()

      if (dbError || !message)
        throw new Error(`Mensagem ${record.id} não encontrada`)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const guest = message.guests as any
      const isInsert = type === 'INSERT'

      discordPayload = {
        embeds: [
          {
            title: isInsert ? '💬 Novo Recado no Mural' : '📝 Recado Editado',
            description: `**${guest?.name ?? 'Visitante'}** ${isInsert ? 'escreveu' : 'atualizou'} uma mensagem no seu portfólio.`,
            color: reportColor[type as 'INSERT' | 'UPDATE'],
            fields: [{ name: 'Mensagem', value: `*"${message.content}"*` }],
            thumbnail: { url: guest?.profile_image || '' },
            footer: { text: `ID: ${record.id}` },
            timestamp: new Date().toISOString(),
          },
        ],
      }
    }

    const discordRes = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload),
    })

    if (!discordRes.ok)
      throw new Error(`Discord API Error: ${discordRes.status}`)

    return new Response(JSON.stringify({ status: 'notified' }), { status: 200 })
  } catch (err) {
    console.error('[FUNCTION ERROR]:', err.message)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})
