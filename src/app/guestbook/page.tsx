import { createClient } from '@/lib/supabase/server'
import { LoginBanner } from '@/components/shared/auth'

export default async function GuestbookPage() {
  const supabase = await createClient()
  const { data: sessionData } = await supabase.auth.getSession()
  const user = sessionData?.session?.user ?? null

  const avatarUrl: string | undefined = user?.user_metadata?.avatar_url
  const displayName: string =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.user_name ??
    user?.email ??
    ''

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginBanner
        isAuthenticated={!!user}
        avatarUrl={avatarUrl}
        displayName={displayName || undefined}
        email={user?.email}
      />
    </div>
  )
}
