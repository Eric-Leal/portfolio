import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // Permite redirecionar o usuário de volta para onde ele estava (ex: /guestbook)
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    // A troca do código pela sessão acontece aqui no servidor
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Em caso de erro, mande para uma página amigável
  return NextResponse.redirect(`${origin}/auth/auth-error`)
}