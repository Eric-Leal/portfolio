import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const DISCORD_WEBHOOK_URL = Deno.env.get('DISCORD_WEBHOOK_URL')

/**
 * Edge Function para notificar o Discord sobre novos recados ou edições.
 * Recebe o ID da mensagem via payload, busca os detalhes no banco (bypass RLS) e formata um embed bonitão.
 *
 */

Deno.serve(async (req) => {
  try {
    // Validação de segurança da URL
    if (!DISCORD_WEBHOOK_URL) {
      throw new Error(
        'DISCORD_WEBHOOK_URL is not defined in environment variables',
      )
    }

    const { record, type } = await req.json()

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Busca detalhada com log de erro para debug
    const { data: message, error: dbError } = await supabaseAdmin
      .from('messages')
      .select('content, guests(name, profile_image)')
      .eq('id', record.id)
      .single()

    if (dbError || !message) {
      console.error('Database Error:', dbError)
      throw new Error(
        `Mensagem ${record.id} não encontrada ou erro no Join com guests`,
      )
    }

    const guest = message.guests as {
      name: string
      profile_image: string
    } | null
    const isInsert = type === 'INSERT'

    const discordPayload = {
      embeds: [
        {
          title: isInsert ? '💬 Novo Recado no Mural' : '📝 Recado Editado',
          description: `**${guest?.name ?? 'Visitante'}** ${isInsert ? 'escreveu' : 'atualizou'} uma mensagem no seu portfólio.`,
          color: isInsert ? 0x29d6d4 : 0x77309a,
          fields: [{ name: 'Mensagem', value: `*"${message.content}"*` }],
          thumbnail: { url: guest?.profile_image || '' },
          footer: { text: `ID: ${record.id}` },
          timestamp: new Date().toISOString(),
        },
      ],
    }

    const discordRes = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload),
    })

    if (!discordRes.ok) {
      const errorText = await discordRes.text()
      throw new Error(`Discord API Error: ${discordRes.status} - ${errorText}`)
    }

    return new Response(JSON.stringify({ status: 'notified' }), { status: 200 })
  } catch (err) {
    console.error('Edge Function Error:', err.message)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})
