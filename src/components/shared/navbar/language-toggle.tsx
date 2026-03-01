'use client'

import { usePortfolioStore } from '@/store/use-portfolio-store'
import { cn } from '@/lib/utils'
import { Globe } from 'lucide-react'

interface LanguageToggleProps {
  className?: string
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { language, toggleLanguage } = usePortfolioStore()

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        'font-mono text-sm font-medium tracking-widest uppercase',
        'text-tx-secondary hover:text-tx-primary transition-colors duration-200',
        className,
      )}
    >
      <Globe size={20} className="mr-1 inline" />
      {language === 'pt' ? 'EN' : 'PT'}
    </button>
  )
}
