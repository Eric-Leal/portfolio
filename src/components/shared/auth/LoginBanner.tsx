'use client'

import Image from 'next/image'
import { SiGithub } from 'react-icons/si'
import { FcGoogle } from 'react-icons/fc'

import { signInWithProvider, signOut } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { MagicCard } from '@/components/ui/magic-card'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import { guestbookTranslations } from '@/components/shared/section/section-translations'
import { AuroraText } from '@/components/ui/aurora-text'
import { LogOut } from 'lucide-react'

export interface LoginBannerProps {
  avatarUrl?: string
  displayName?: string
  email?: string
  isAuthenticated: boolean
}

/**
 * Banner de autenticação do Mural de Visitantes. Exibe botões de login social
 * no estado não autenticado e as informações do usuário com botão de logout no
 * estado autenticado. Consome o idioma ativo via Zustand store.
 */
export function LoginBanner({
  avatarUrl,
  displayName,
  email,
  isAuthenticated,
}: LoginBannerProps) {
  const { language } = usePortfolioStore()
  const t = guestbookTranslations[language]

  return (
    <MagicCard
      className="bg-card w-11/12 rounded-2xl p-8 md:max-w-4/5"
      gradientColor="var(--color-brand-5)"
      gradientOpacity={0.2}
      gradientFrom="var(--color-brand-2)"
      gradientTo="var(--color-brand-5)"
    >
      <div className="mb-8 text-center">
        <h1 className="text-tx-primary font-sans text-5xl leading-tight font-medium md:text-6xl lg:text-7xl">
          {t.title}{' '}
          <AuroraText className="font-title from-brand-2 to-brand-5 bg-linear-to-r bg-clip-text text-6xl font-bold text-transparent italic md:text-7xl lg:text-8xl">
            {t.titleAccent}
          </AuroraText>
        </h1>
        {!isAuthenticated && (
          <p className="text-tx-secondary text-md mt-3 leading-relaxed">
            {t.subtitle}
          </p>
        )}
      </div>

      {!isAuthenticated ? (
        <div className="flex flex-col gap-3 md:flex-row md:justify-center">
          <form action={signInWithProvider.bind(null, 'github')}>
            <Button
              type="submit"
              variant="outline"
              size="lg"
              className="h-12 w-full rounded-full"
            >
              <SiGithub className="size-5" />
              {t.signInGithub}
            </Button>
          </form>

          <form action={signInWithProvider.bind(null, 'google')}>
            <Button
              type="submit"
              variant="outline"
              size="lg"
              className="h-12 w-full rounded-full"
            >
              <FcGoogle className="size-5" />
              {t.signInGoogle}
            </Button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={displayName ?? ''}
                width={48}
                height={48}
                className="rounded-full"
              />
            ) : (
              <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-full text-sm font-semibold">
                {(displayName ?? email ?? '?').charAt(0).toUpperCase()}
              </div>
            )}
            <div className="text-left">
              <p className="text-tx-primary text-lg font-medium">
                {t.welcomeBack}, {displayName || email}!
              </p>
              {displayName && (
                <p className="text-tx-secondary text-sm">{email}</p>
              )}
            </div>
          </div>

          <form action={signOut} className="w-full">
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="text-tx-secondary hover:text-tx-primary w-full"
            >
              {t.signOut}
              <LogOut className="size-4" />
            </Button>
          </form>
        </div>
      )}
    </MagicCard>
  )
}
