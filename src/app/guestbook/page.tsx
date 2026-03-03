import { createClient } from '@/lib/supabase/server'
import { signInWithProvider, signOut } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'

// Local server-action wrappers so we don't pass inline closures
async function signInWithGithubAction(formData: FormData) {
  'use server'
  await signInWithProvider('github')
}

async function signInWithGoogleAction(formData: FormData) {
  'use server'
  await signInWithProvider('google')
}

async function signOutAction(formData: FormData) {
  'use server'
  await signOut()
}

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
          <form action={signInWithGithubAction}>
            <Button type="submit">Entrar com GitHub</Button>
          </form>

          <form action={signInWithGoogleAction}>
            <Button type="submit">Entrar com Google</Button>
          </form>
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-4">
          <p className="text-tx-primary">Bem-vindo, {user.email}</p>
          <form action={signOutAction}>
            <Button type="submit">Sair</Button>
          </form>
        </div>
      )}
    </div>
  )
}
