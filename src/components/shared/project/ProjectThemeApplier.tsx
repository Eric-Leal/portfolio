/**
 * @file ProjectThemeApplier.tsx
 * @descrição Aplica o tema visual de um projeto (cores e cursors) como CSS custom
 * properties no elemento <html>, com suporte a alternância light/dark em tempo real.
 * Limpa todas as overrides ao desmontar (ao sair da página do projeto).
 */
'use client'

import { useEffect } from 'react'
import type { ProjectTheme, ProjectThemeColors } from '@/types/project'

const COLOR_PROPS = [
  '--accent-1',
  '--accent-2',
  '--accent-3',
  '--accent-4',
  '--accent-5',
  '--primary',
  '--ring',
] as const

const CURSOR_PROPS = ['--cur-default', '--cur-pointer', '--cur-text'] as const

function applyPalette(el: HTMLElement, palette: ProjectThemeColors) {
  if (palette.accent1) el.style.setProperty('--accent-1', palette.accent1)
  if (palette.accent2) el.style.setProperty('--accent-2', palette.accent2)
  if (palette.accent3) el.style.setProperty('--accent-3', palette.accent3)
  if (palette.accent4) el.style.setProperty('--accent-4', palette.accent4)
  if (palette.accent5) el.style.setProperty('--accent-5', palette.accent5)
  if (palette.primary) {
    el.style.setProperty('--primary', palette.primary)
    el.style.setProperty('--ring', palette.primary)
  }
}

function clearPalette(el: HTMLElement) {
  COLOR_PROPS.forEach((v) => el.style.removeProperty(v))
}

export interface ProjectThemeApplierProps {
  theme?: ProjectTheme
}

export function ProjectThemeApplier({ theme }: ProjectThemeApplierProps) {
  useEffect(() => {
    if (!theme) return

    const el = document.documentElement

    // Cursors — independentes de modo claro/escuro
    if (theme.cursors?.default)
      el.style.setProperty(
        '--cur-default',
        `url('${theme.cursors.default}'), default`,
      )
    if (theme.cursors?.pointer)
      el.style.setProperty(
        '--cur-pointer',
        `url('${theme.cursors.pointer}'), pointer`,
      )
    if (theme.cursors?.text)
      el.style.setProperty('--cur-text', `url('${theme.cursors.text}'), text`)

    // Cores — sensíveis ao modo claro/escuro
    function syncColors() {
      const isDark = el.classList.contains('dark')
      clearPalette(el)
      const palette = isDark ? theme!.dark : theme!.light
      if (palette) applyPalette(el, palette)
    }

    syncColors()

    // Escuta mudanças de tema (next-themes alterna a classe 'dark' no <html>)
    const observer = new MutationObserver(syncColors)
    observer.observe(el, { attributes: true, attributeFilter: ['class'] })

    return () => {
      observer.disconnect()
      clearPalette(el)
      CURSOR_PROPS.forEach((v) => el.style.removeProperty(v))
    }
  }, [theme])

  return null
}
