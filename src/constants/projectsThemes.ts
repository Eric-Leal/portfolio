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
      accent1: '#ff4bd8',
      accent2: '#d946ef',
      accent3: '#a21caf',
      accent4: '#9333ea',
      accent5: '#7e22ce',
      primary: '#7e22ce',
    },
    light: {
      accent1: '#c026d3',
      accent2: '#a21caf',
      accent3: '#9333ea',
      accent4: '#7e22ce',
      accent5: '#6b21a8',
      primary: '#6b21a8',
    },
    cursors: {
      default: '/cursors/gestarmais/pointer.cur',
      pointer: '/cursors/gestarmais/hand.cur',
      text: '/cursors/gestarmais/beam.cur',
    },
  },
  foodBridge: {
    dark: {
      accent1: '#ff4bd8',
      accent2: '#d946ef',
      accent3: '#a21caf',
      accent4: '#9333ea',
      accent5: '#7e22ce',
      primary: '#7e22ce',
    },
    light: {
      accent1: '#c026d3',
      accent2: '#a21caf',
      accent3: '#9333ea',
      accent4: '#7e22ce',
      accent5: '#6b21a8',
      primary: '#6b21a8',
    },
    cursors: {
      default: '/cursors/foodbridge/pointer.cur',
      pointer: '/cursors/foodbridge/hand.cur',
      text: '/cursors/foodbridge/beam.cur',
    },
  },
} as const satisfies Record<string, ProjectTheme>
