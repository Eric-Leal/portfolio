'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { LuGithub } from 'react-icons/lu'
import { Send, BookOpen } from 'lucide-react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { LanguageToggle } from './language-toggle'
import { MobileMenu } from './mobile-menu'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import { navigationTranslations } from '@/constants/navigation'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin)
}

const navItemClass = cn(
  'text-tx-secondary hover:text-tx-primary cursor-pointer',
  'rounded-full px-3 py-1.5 text-sm font-medium',
  'transition-colors duration-150 hover:bg-white/5',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border',
)

export function Navbar() {
  const { language } = usePortfolioStore()
  const t = navigationTranslations[language]
  const router = useRouter()
  const pathname = usePathname()
  const isHome = pathname === '/'

  const handleScroll = (id: string) => {
    if (!isHome) {
      router.push(`/#${id}`)
      return
    }

    gsap.to(window, {
      duration: 1.2,
      scrollTo: {
        y: `#${id}`,
        offsetY: 20,
      },
      ease: 'power4.inOut',
    })
  }

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed top-0 right-0 left-0 z-40 hidden justify-center px-4 pt-4 md:flex"
      >
        <div className="border-border/50 bg-card/80 flex w-full max-w-5xl items-center justify-between rounded-2xl border px-4 py-2.5 shadow-sm backdrop-blur-md">
          <Link
            href="/"
            className="font-title text-tx-primary text-xl font-bold italic transition-opacity hover:opacity-80"
          >
            Carlos Silva
          </Link>

          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-0 rounded-full px-1 py-1">
              <NavigationMenuItem>
                <button
                  onClick={() => handleScroll('about')}
                  className={navItemClass}
                >
                  {t.about}
                </button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <button
                  onClick={() => handleScroll('projects')}
                  className={navItemClass}
                >
                  {t.projects}
                </button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <button
                  onClick={() => handleScroll('experience')}
                  className={navItemClass}
                >
                  {t.experience}
                </button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    navItemClass,
                    'bg-transparent data-[state=open]:bg-white/5',
                    'h-auto',
                  )}
                >
                  {t.more}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="border-border/50 bg-card/95 mt-2 min-w-55 rounded-xl border p-2 shadow-lg backdrop-blur-md">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/guestbook"
                      className={cn(
                        'flex items-start gap-3 rounded-lg p-3',
                        'text-tx-secondary hover:text-tx-primary hover:bg-white/5',
                        'transition-colors duration-150',
                      )}
                    >
                      <BookOpen
                        size={16}
                        className="mt-0.5 shrink-0 opacity-70"
                      />
                      <div>
                        <p className="text-sm font-medium">{t.guestbook}</p>
                        <p className="text-tx-muted mt-0.5 text-xs">
                          {t.guestbookDesc}
                        </p>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/github"
                      className={cn(
                        'flex items-start gap-3 rounded-lg p-3',
                        'text-tx-secondary hover:text-tx-primary hover:bg-white/5',
                        'transition-colors duration-150',
                      )}
                    >
                      <LuGithub
                        size={16}
                        className="mt-0.5 shrink-0 opacity-70"
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {t.githubActivity}
                        </p>
                        <p className="text-tx-muted mt-0.5 text-xs">
                          {t.githubActivityDesc}
                        </p>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-8">
            <AnimatedThemeToggler className="text-tx-secondary hover:text-tx-primary flex h-8 w-8 items-center justify-center rounded-full transition-colors [&_svg]:size-5" />
            <LanguageToggle />
            <button
              onClick={() => handleScroll('contact')}
              className="from-brand-3 to-brand-5 flex items-center gap-1.5 rounded-full bg-linear-to-r px-4 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            >
              <Send size={20} />
              {t.cta}
            </button>
          </div>
        </div>
      </motion.header>

      <div className="md:hidden">
        <MobileMenu />
      </div>
    </>
  )
}
