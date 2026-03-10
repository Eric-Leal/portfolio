import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createSupabaseClient } from '../_shared/supabaseClient.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

/**
 * @function DeleteMessage
 * @description Recebe um ID via POST e deleta a mensagem correspondente no banco de dados 'messages' utilizando o JWT do usuário para validar as RLS.
 * Responde com { success: true } ou um erro caso o ID não exista ou a operação falhe.
 * O endpoint suporta CORS para permitir chamadas de qualquer origem, mas requer o header `Authorization` para autenticação.
 */

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS')
    return new Response('ok', { headers: corsHeaders })

  try {
    const supabaseClient = createSupabaseClient(
      req.headers.get('Authorization')!,
    )
    const { id } = await req.json()

    const { error } = await supabaseClient
      .from('messages')
      .delete()
      .eq('id', id)

    if (error) throw error

    return new Response(JSON.stringify({ success: true }), {
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
