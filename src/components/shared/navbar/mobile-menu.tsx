'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  User,
  Briefcase,
  Mail,
  BookOpen,
  Send,
  X,
  Menu,
  ChevronLeft,
  Share2,
} from 'lucide-react'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { LanguageToggle } from './language-toggle'
import { usePortfolioStore } from '@/store/use-portfolio-store'
import { navigationTranslations } from '@/constants/navigation'
import { cn } from '@/lib/utils'

const menuVariants = {
  closed: { scale: 0.95, opacity: 0, y: -20 },
  open: { scale: 1, opacity: 1, y: 0 },
}

async function handleShare() {
  const shareData = { title: document.title, url: window.location.href }
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share(shareData)
    } catch {
      // user cancelled — no action needed
    }
  } else {
    await navigator.clipboard.writeText(window.location.href)
  }
}

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = usePortfolioStore()
  const t = navigationTranslations[language]
  const router = useRouter()
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <div className="fixed top-4 right-0 left-0 z-50 flex items-start justify-center px-4">
      {/* Back button — fora do pill, lado esquerdo */}
      <AnimatePresence>
        {!isHome && (
          <motion.button
            key="back"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            onClick={() => router.back()}
            className="border-border/50 bg-card/90 mr-2 flex w-10 shrink-0 items-center justify-center rounded-full border py-3 shadow-lg backdrop-blur-md"
            aria-label="Voltar"
          >
            <ChevronLeft size={20} className="text-tx-primary" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Pill central */}
      <div className="w-full max-w-sm">
        <div
          className={cn(
            'border-border/50 bg-card/90 relative z-50 flex items-center justify-between border px-4 py-3 shadow-lg backdrop-blur-md transition-all duration-300',
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
                  { href: '/#about', label: t.about, icon: User },
                  { href: '/#projects', label: t.projects, icon: Briefcase },
                  { href: '/#contact', label: t.contact, icon: Mail },
                  { href: '/guestbook', label: t.guestbook, icon: BookOpen },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-tx-secondary hover:text-tx-primary flex items-center gap-3 rounded-xl p-3 font-sans transition-colors hover:bg-white/5"
                  >
                    <link.icon size={20} />
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                ))}
                <Link
                  href="/#contact"
                  className="from-brand-3 to-brand-5 mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r py-3 font-sans text-sm font-normal text-white"
                >
                  <Send size={20} /> {t.cta}
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* end pill wrapper */}

      {/* Share button — fora do pill, lado direito */}
      <button
        onClick={handleShare}
        className="border-border/50 bg-card/90 ml-2 flex w-10 shrink-0 items-center justify-center rounded-full border py-3 shadow-lg backdrop-blur-md"
        aria-label="Compartilhar"
      >
        <Share2 size={18} className="text-tx-primary" />
      </button>
    </div>
  )
}
