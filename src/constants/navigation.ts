/**
 * Traduções de navegação
 *
 * Fonte única de verdade para os rótulos do `navbar` e do `footer`.
 */

export const navigationTranslations = {
  pt: {
    // ── Navegação ──────────────────────────────────────────
    about: 'Sobre mim',
    projects: 'Projetos',
    experience: 'Experiências',
    contact: 'Contato',
    more: 'Mais',
    cta: 'Enviar mensagem',

    // ── Dropdown / Recursos do rodapé ───────────────────────────────────────
    guestbook: 'Mural de Visitantes',
    guestbookDesc: 'Deixe uma mensagem no mural de visitantes',
    githubActivity: 'Atividades no GitHub',
    githubActivityDesc: 'Veja minha linha do tempo de contribuições',

    // ── Rodapé ───────────────────────────────────────────────────
    footerHeadline: 'Vamos construir algo',
    footerHighlight: 'incrível',
    footerHeadlineEnd: 'juntos?',

    footerSectionsTitle: 'Seções',
    footerResourcesTitle: 'Recursos',
    footerConnectTitle: 'Conecte-se',

    copyright: '© 2026. Todos os direitos reservados.',
  },

  en: {
    // ── Navegação ──────────────────────────────────────────
    about: 'About me',
    projects: 'Projects',
    experience: 'Experience',
    contact: 'Contact',
    more: 'More',
    cta: 'Send a message',

    // ── Dropdown / Recursos do rodapé ───────────────────────────────────────
    guestbook: 'Guestbook',
    guestbookDesc: 'Leave a message on the visitor wall',
    githubActivity: 'GitHub Activity',
    githubActivityDesc: 'See my contribution timeline',

    // ── Rodapé ───────────────────────────────────────────────────
    footerHeadline: "Let's build something",
    footerHighlight: 'amazing',
    footerHeadlineEnd: 'together?',

    footerSectionsTitle: 'Sections',
    footerResourcesTitle: 'Resources',
    footerConnectTitle: 'Connect',

    copyright: '© 2026. All rights reserved.',
  },
} as const

export type Language = 'pt' | 'en'
export type NavigationTranslations = (typeof navigationTranslations)[Language]
