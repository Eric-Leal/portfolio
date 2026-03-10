import { createClient } from '@/lib/supabase/server'
import { LoginBanner } from '@/components/shared/auth'
import { GuestbookInput, MessageList } from '@/components/shared/guestbook'

/** Nome do dono do portfolio, exibido no placeholder do input e título. */
const OWNER_NAME = 'Laura'

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
    <div className="mx-auto mt-11 flex w-full max-w-7xl flex-col items-center gap-8 px-4 py-12 md:px-6 lg:mt-10 lg:px-8">
      <LoginBanner
        isAuthenticated={!!user}
        avatarUrl={avatarUrl}
        displayName={displayName || undefined}
        email={user?.email}
      />

      {user && (
        <div className="w-full max-w-3xl">
          <GuestbookInput
            userId={user.id}
            avatarUrl={avatarUrl}
            displayName={displayName || undefined}
            ownerName={OWNER_NAME}
          />
        </div>
      )}

      <div className="w-full">
        <MessageList currentUserId={user?.id ?? null} />
      </div>
    </div>
  )
}
