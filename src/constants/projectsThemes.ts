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
  gestarMais: {
    dark: {
      accent1: '#c084fc',
      accent2: '#a855f7',
      accent3: '#9333ea',
      accent4: '#7c3aed',
      accent5: '#6d28d9',
      primary: '#c084fc',
    },
    light: {
      accent1: '#9b5de5',
      accent2: '#8b52d4',
      accent3: '#7c3aed',
      accent4: '#6d28d9',
      accent5: '#5b21b6',
      primary: '#9b5de5',
    },
    cursors: {
      default: '/cursors/gestarmais/pointer.cur',
      pointer: '/cursors/gestarmais/link.cur',
      text: '/cursors/gestarmais/beam.cur',
    },
  },
  foodBridge: {
    dark: {
      accent1: '#f59e0b',
      accent2: '#ea7a12',
      accent3: '#3cb8af',
      accent4: '#be1f74',
      accent5: '#96225f',
      primary: '#f59e0b',
    },
    light: {
      accent1: '#f7b243',
      accent2: '#f08a16',
      accent3: '#53c4bc',
      accent4: '#c8337f',
      accent5: '#b84b7f',
      primary: '#f08a16',
    },
    cursors: {
      default: '/cursors/foodBridge/pointer.cur',
      pointer: '/cursors/foodBridge/link.cur',
      text: '/cursors/foodBridge/beam.cur',
    },
  },
} as const satisfies Record<string, ProjectTheme>
