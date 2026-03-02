'use client'

import { useMemo, useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import type { ContributionMap } from '@/lib/github'

// ─── Types ────────────────────────────────────────────────────────────────────

type DayCell = {
  date: Date
  dateStr: string
  count: number
} | null

type Week = DayCell[]

type TooltipState = {
  text: string
  x: number
  y: number
  flip: boolean // true = tooltip aparece à esquerda do cursor
}

// ─── Constants ───────────────────────────────────────────────────────────────

const MONTH_LABELS = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]

// Apenas Seg, Qua e Sex visíveis — igual ao GitHub (Dom = 0)
const DAY_LABELS: Record<number, string> = { 1: 'Seg', 3: 'Qua', 5: 'Sex' }

const CELL_PX = 12 // largura e altura de cada célula (px)
const GAP_PX = 3 // espaçamento entre células (px)
const DAY_LABEL_W = 28 // largura reservada para os labels de dia

// ─── Color helpers ────────────────────────────────────────────────────────────

/**
 * Retorna a classe de cor Tailwind correspondente ao nível de atividade.
 * 5 níveis idênticos ao GitHub: vazio, leve, médio, alto, intenso.
 */
function getColorClass(count: number): string {
  if (count === 0) return 'bg-border hover:ring-1 hover:ring-border'
  if (count <= 2) return 'bg-brand-5/25 hover:bg-brand-5/35'
  if (count <= 5) return 'bg-brand-5/50 hover:bg-brand-5/60'
  if (count <= 9) return 'bg-brand-5/75 hover:bg-brand-5/85'
  return 'bg-brand-5 hover:brightness-110'
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

function toDateStr(date: Date): string {
  return date.toISOString().split('T')[0]
}

function formatDatePT(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const y = date.getFullYear()
  return `${d}/${m}/${y}`
}

// ─── Grid generator ───────────────────────────────────────────────────────────

/**
 * Gera o grid de semanas dos últimos 365 dias.
 *
 * Retorna:
 * - `weeks`           — array de colunas (cada coluna = 7 dias, Dom→Sáb)
 * - `monthRow`        — array com o label do mês no início de cada semana (ou '')
 */
function generateCalendarGrid(contributionMap: ContributionMap): {
  weeks: Week[]
  monthRow: string[]
} {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Primeiro dia do intervalo (365 dias incluindo hoje)
  const rangeStart = new Date(today)
  rangeStart.setDate(today.getDate() - 364)

  // Recua até o domingo que antecede (ou inicia) a semana de rangeStart
  const gridStart = new Date(rangeStart)
  gridStart.setDate(rangeStart.getDate() - rangeStart.getDay())

  const weeks: Week[] = []
  const seenMonths = new Set<string>()
  const monthByWeek: Record<number, string> = {}

  const cursor = new Date(gridStart)

  while (cursor <= today) {
    const week: Week = []

    for (let d = 0; d < 7; d++) {
      const day = new Date(cursor)
      day.setDate(cursor.getDate() + d)

      // Células de padding (antes do rangeStart ou após hoje)
      if (day > today || day < rangeStart) {
        week.push(null)
      } else {
        const dateStr = toDateStr(day)
        const count = contributionMap[dateStr] ?? 0
        week.push({ date: day, dateStr, count })

        // Registra a primeira semana em que o mês aparece
        const monthKey = `${day.getFullYear()}-${day.getMonth()}`
        if (!seenMonths.has(monthKey)) {
          seenMonths.add(monthKey)
          monthByWeek[weeks.length] = MONTH_LABELS[day.getMonth()]
        }
      }
    }

    weeks.push(week)
    cursor.setDate(cursor.getDate() + 7)
  }

  // Transforma o mapa em array paralelo ao array weeks
  const monthRow = weeks.map((_, i) => monthByWeek[i] ?? '')

  return { weeks, monthRow }
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface GithubCalendarProps {
  contributionMap: ContributionMap
  /** Total de contribuições no período — disponível para exibição externa se necessário */
  totalContributions?: number
}

// ─── Component ────────────────────────────────────────────────────────────────

export function GithubCalendar({ contributionMap }: GithubCalendarProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)

  const { weeks, monthRow } = useMemo(
    () => generateCalendarGrid(contributionMap),
    [contributionMap],
  )

  function handleMouseEnter(cell: NonNullable<DayCell>, e: React.MouseEvent) {
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (!containerRect) return

    const label =
      cell.count === 0
        ? `Nenhuma atividade em ${formatDatePT(cell.date)}`
        : `${cell.count} ${cell.count === 1 ? 'atividade' : 'atividades'} em ${formatDatePT(cell.date)}`

    // Posição relativa ao container (calculada no evento, não no render)
    const relX = e.clientX - containerRect.left
    const relY = e.clientY - containerRect.top
    const flip = relX > containerRect.width - 180

    setTooltip({ text: label, x: relX, y: relY, flip })
  }

  return (
    <div ref={containerRef} className="relative select-none">
      {/* Scroll horizontal em telas pequenas */}
      <div className="overflow-x-auto pb-1">
        <div className="inline-block min-w-max">
          {/* ── Linha de meses ─────────────────────────────────────────────── */}
          <div
            className="mb-1 flex"
            style={{ paddingLeft: DAY_LABEL_W, gap: GAP_PX }}
          >
            {monthRow.map((label, i) => (
              <div
                key={i}
                className="text-tx-muted shrink-0 font-mono text-[10px]"
                style={{ width: CELL_PX }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* ── Grid principal ─────────────────────────────────────────────── */}
          <div className="flex" style={{ gap: GAP_PX }}>
            {/* Labels dos dias (esquerda) */}
            <div
              className="flex shrink-0 flex-col"
              style={{ gap: GAP_PX, width: DAY_LABEL_W }}
            >
              {Array.from({ length: 7 }).map((_, d) => (
                <div
                  key={d}
                  className="text-tx-muted flex items-center font-mono text-[10px]"
                  style={{ height: CELL_PX }}
                >
                  {DAY_LABELS[d] ?? ''}
                </div>
              ))}
            </div>

            {/* Colunas de semanas */}
            {weeks.map((week, wi) => (
              <div
                key={wi}
                className="flex shrink-0 flex-col"
                style={{ gap: GAP_PX }}
              >
                {week.map((cell, di) => {
                  if (!cell) {
                    // Célula de padding — transparente
                    return (
                      <div
                        key={di}
                        style={{ width: CELL_PX, height: CELL_PX }}
                      />
                    )
                  }

                  return (
                    <div
                      key={di}
                      className={cn(
                        'cursor-pointer rounded-xs transition-all duration-100',
                        getColorClass(cell.count),
                      )}
                      style={{ width: CELL_PX, height: CELL_PX }}
                      onMouseEnter={(e) => handleMouseEnter(cell, e)}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  )
                })}
              </div>
            ))}
          </div>

          {/* ── Legenda ────────────────────────────────────────────────────── */}
          <div
            className="mt-3 flex items-center gap-1.5"
            style={{ paddingLeft: DAY_LABEL_W }}
          >
            <span className="text-tx-muted font-mono text-[10px]">Menos</span>
            {[
              'bg-border',
              'bg-brand-5/25',
              'bg-brand-5/50',
              'bg-brand-5/75',
              'bg-brand-5',
            ].map((cls) => (
              <div
                key={cls}
                className={cn('rounded-xs', cls)}
                style={{ width: CELL_PX, height: CELL_PX }}
              />
            ))}
            <span className="text-tx-muted font-mono text-[10px]">Mais</span>
          </div>
        </div>
      </div>

      {/* ── Tooltip ──────────────────────────────────────────────────────────── */}
      {tooltip && (
        <div
          className="border-border bg-card text-tx-primary pointer-events-none absolute z-50 rounded-lg border px-3 py-1.5 font-mono text-[11px] shadow-lg"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y - 32,
            transform: tooltip.flip ? 'translateX(-110%)' : undefined,
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  )
}
