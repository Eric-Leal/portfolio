import { createClient } from '@/lib/supabase/server'
import { signInWithProvider, signOut } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'

/**
 * Página do mural de visitantes com autenticação via Supabase. O componente é um Server Component, o que permite obter a sessão do usuário diretamente no servidor, sem precisar de client-side JavaScript para isso. Os formulários de login e logout usam ações server-side para lidar com a autenticação de forma segura e eficiente.
 */

export default async function GuestbookPage() {
  const supabase = await createClient()

  // Tenta obter a sessão do usuário no servidor
  const { data: sessionData } = await supabase.auth.getSession()
  const user = sessionData?.session?.user ?? null

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-title text-tx-primary text-5xl font-bold italic">
        Mural de Visitantes
      </h1>

      {!user ? (
        <div className="mt-6 flex flex-col items-center gap-3">
          <form action={signInWithProvider.bind(null, 'github')}>
            <Button type="submit">Entrar com GitHub</Button>
          </form>

          <form action={signInWithProvider.bind(null, 'google')}>
            <Button type="submit">Entrar com Google</Button>
          </form>
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-4">
          <p className="text-tx-primary">Bem-vindo, {user.email}</p>
          <form action={signOut}>
            <Button type="submit">Sair</Button>
          </form>
        </div>
      )}
    </div>
  )
}
