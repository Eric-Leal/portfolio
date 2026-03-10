'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { LuGithub } from 'react-icons/lu'
import {
  User,
  Briefcase,
  BookOpen,
  Send,
  X,
  Menu,
  ChevronLeft,
  Share2,
  LayoutGrid,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { LanguageToggle } from './language-toggle'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import { navigationTranslations } from '@/constants/navigation'
import { cn } from '@/lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin)
}

const menuVariants = {
  closed: { scale: 0.95, opacity: 0, y: -20 },
  open: { scale: 1, opacity: 1, y: 0 },
}

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = usePortfolioStore()
  const t = navigationTranslations[language]
  const router = useRouter()
  const pathname = usePathname()
  const isHome = pathname === '/'

  const handleScroll = (id: string) => {
    setIsOpen(false)
    if (!isHome) {
      router.push(`/#${id}`)
      return
    }
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: `#${id}`, offsetY: 40 },
      ease: 'power4.inOut',
    })
  }

  const handleBack = () => {
    if (window.history.length <= 1) {
      router.push('/')
    } else {
      router.back()
    }
  }

  async function handleShare() {
    const shareData = { title: document.title, url: window.location.href }
    if (typeof navigator !== 'undefined' && navigator.share) {
      await navigator.share(shareData)
    } else {
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="fixed top-4 right-0 left-0 z-50 flex h-14 items-stretch justify-center px-4">
      {/* Back button */}
      <AnimatePresence shadow-lg>
        {!isHome && (
          <motion.button
            key="back"
            initial={{ opacity: 0, width: 0, marginRight: 0 }}
            animate={{ opacity: 1, width: 56, marginRight: 8 }}
            exit={{ opacity: 0, width: 0, marginRight: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBack}
            className="border-border/50 bg-card/90 flex shrink-0 items-center justify-center rounded-full border shadow-lg backdrop-blur-md"
            aria-label="Voltar"
          >
            <ChevronLeft size={20} className="text-tx-primary" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Pill central */}
      <div className="relative flex max-w-sm flex-1 flex-col">
        <div
          className={cn(
            'border-border/50 bg-card/90 relative z-50 flex h-full items-center justify-between border px-4 shadow-lg backdrop-blur-md transition-all duration-300',
            isOpen ? 'rounded-t-2xl' : 'rounded-full',
          )}
        >
          <div className="flex items-center gap-3">
            <span className="font-title text-tx-primary text-lg font-bold italic">
              CS
            </span>
            <span className="bg-border h-4 w-px" />
          </div>

          <div className="flex items-center gap-4">
            <LanguageToggle />
            <AnimatedThemeToggler className="text-tx-secondary flex h-8 w-8 items-center justify-center rounded-full" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-tx-primary p-1"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="border-border/50 bg-card/95 absolute top-full left-0 w-full overflow-hidden rounded-b-2xl border border-t-0 px-2 pt-2 pb-4 shadow-xl backdrop-blur-md"
            >
              <nav className="flex flex-col gap-1">
                {[
                  { id: 'about', label: t.about, icon: User },
                  { id: 'projects', label: t.projects, icon: LayoutGrid },
                  { id: 'experience', label: t.experience, icon: Briefcase }, // Readicionado aqui
                ].map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleScroll(link.id)}
                    className="text-tx-secondary hover:text-tx-primary flex w-full items-center gap-3 rounded-xl p-3 text-left font-sans transition-colors hover:bg-white/5"
                  >
                    <link.icon size={20} />
                    <span className="text-sm font-medium">{link.label}</span>
                  </button>
                ))}

                <Link
                  href="/guestbook"
                  onClick={() => setIsOpen(false)}
                  className="text-tx-secondary hover:text-tx-primary flex items-center gap-3 rounded-xl p-3 font-sans transition-colors hover:bg-white/5"
                >
                  <BookOpen size={20} />{' '}
                  <span className="text-sm font-medium">{t.guestbook}</span>
                </Link>

                <Link
                  href="/github"
                  onClick={() => setIsOpen(false)}
                  className="text-tx-secondary hover:text-tx-primary flex items-center gap-3 rounded-xl p-3 font-sans transition-colors hover:bg-white/5"
                >
                  <LuGithub size={20} />{' '}
                  <span className="text-sm font-medium">
                    {t.githubActivity}
                  </span>
                </Link>

                <button
                  onClick={() => handleScroll('contact')}
                  className="from-brand-3 to-brand-5 mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r py-3 font-sans text-sm font-normal text-white"
                >
                  <Send size={20} /> {t.cta}
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Share button*/}
      <button
        onClick={handleShare}
        className="border-border/50 bg-card/90 ml-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border shadow-lg backdrop-blur-md"
        aria-label="Compartilhar"
      >
        <Share2 size={18} className="text-tx-primary" />
      </button>
    </div>
  )
}
