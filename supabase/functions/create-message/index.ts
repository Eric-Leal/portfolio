import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createSupabaseClient } from '../_shared/supabaseClient.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

/**
 * @function CreateMessage
 * @description Recebe uma mensagem via POST, valida o limite de 500 caracteres
 * e insere no banco de dados 'messages' utilizando o JWT do usuário para validar as RLS.
 */

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing Authorization header' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        },
      )
    }

    // 1. Criar o cliente usando a função compartilhada
    const supabaseClient = createSupabaseClient(authHeader)

    const { content, guest_id } = await req.json()

    if (!content || content.length > 500) {
      throw new Error('Conteúdo inválido ou muito longo (máx 500 caracteres).')
    }

    // 2. Inserir respeitando as RLS Policies
    const { data, error } = await supabaseClient
      .from('messages')
      .insert([{ content, guest_id }])
      .select()
      .single()

    if (error) throw error

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
