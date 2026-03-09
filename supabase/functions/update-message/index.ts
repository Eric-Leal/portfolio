import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createSupabaseClient } from '../_shared/supabaseClient.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

/**
 * @function UpdateMessage
 * @description Recebe um ID e novo conteúdo via POST, valida o limite de 500 caracteres
 * e atualiza a mensagem correspondente no banco de dados 'messages' utilizando o JWT do usuário para validar as RLS.
 * O campo `updated_at` é atualizado para refletir a data da modificação.
 * Responde com o registro atualizado ou um erro caso a validação falhe ou o ID não exista.
 */

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS')
    return new Response('ok', { headers: corsHeaders })

  try {
    const supabaseClient = createSupabaseClient(
      req.headers.get('Authorization')!,
    )
    const { id, content } = await req.json()

    if (!content || content.length > 500) {
      return new Response(JSON.stringify({ error: 'Conteúdo inválido.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    const { data, error } = await supabaseClient
      .from('messages')
      .update({ content, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      // PGRST116 = nenhuma linha retornada = RLS bloqueou a operação (usuário não é dono)
      const status = error.code === 'PGRST116' ? 403 : 400
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status,
      })
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
