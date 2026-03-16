import type { ProjectTheme } from '@/types/project'

export const projectThemes = {
  vThreat: {
    dark: {
      accent1: '#1de6ff',
      accent2: '#00cfff',
      accent3: '#23b7ff',
      accent4: '#ff4bd8',
      accent5: '#d946ef',
      primary: '#d946ef',
    },
    light: {
      accent1: '#0e7490',
      accent2: '#0284c7',
      accent3: '#0ea5e9',
      accent4: '#c026d3',
      accent5: '#a21caf',
      primary: '#a21caf',
    },
    cursors: {
      default: '/cursors/vthreat/pointer.cur',
      pointer: '/cursors/vthreat/hand.cur',
      text: '/cursors/beam.cur',
    },
  },
} as const satisfies Record<string, ProjectTheme>
