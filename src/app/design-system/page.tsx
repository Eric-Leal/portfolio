import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'

// ─── Types ────────────────────────────────────────────────────────────────────
type ColorToken = {
  variable: string
  usedFor: string
  light: string
  dark?: string
}

type StaticColor = {
  variable: string
  value: string
  usedFor: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const brandColors: StaticColor[] = [
  {
    variable: '--color-brand-1 / brand-1',
    value: '#d9f99d',
    usedFor: 'Gradientes, highlights, elementos primários vibrantes',
  },
  {
    variable: '--color-brand-2 / brand-2',
    value: '#bef264',
    usedFor: 'Links, ícones ativos, CTA secundário',
  },
  {
    variable: '--color-brand-3 / brand-3',
    value: '#84cc16',
    usedFor: 'Botões de ação, bordas de foco',
  },
  {
    variable: '--color-brand-4 / brand-4',
    value: '#16a34a',
    usedFor: 'Texto de ênfase, badges informativas',
  },
  {
    variable: '--color-brand-5 / brand-5',
    value: '#008f39',
    usedFor: 'CTA principal, primary, anel de foco',
  },
]

const accentColors: ColorToken[] = [
  {
    variable: 'accent-1',
    usedFor: 'Destaques sutis, ícones de apoio',
    light: '#bef264',
    dark: '#ecfccb',
  },
  {
    variable: 'accent-2',
    usedFor: 'Texto de link, hover states',
    light: '#a3e635',
    dark: '#d9f99d',
  },
  {
    variable: 'accent-3',
    usedFor: 'Código inline, tags, chips',
    light: '#65a30d',
    dark: '#bef264',
  },
  {
    variable: 'accent-4',
    usedFor: 'Bordas decorativas, separadores coloridos',
    light: '#16a34a',
    dark: '#86efac',
  },
  {
    variable: 'accent-5',
    usedFor: 'Títulos com destaque, gradientes principais',
    light: '#008f39',
    dark: '#4ade80',
  },
]

const textColors: ColorToken[] = [
  {
    variable: 'tx-primary',
    usedFor: 'Títulos e textos principais — maior hierarquia',
    light: '#171717',
    dark: '#ffffff',
  },
  {
    variable: 'tx-secondary',
    usedFor: 'Parágrafos, descrições, body text',
    light: '#737373',
    dark: '#666666',
  },
  {
    variable: 'tx-muted',
    usedFor: 'Placeholders, labels, informações auxiliares',
    light: '#525252',
    dark: '#d0d5db',
  },
  {
    variable: 'tx-accent',
    usedFor: 'Texto em superfícies com cor de fundo',
    light: '#262626',
    dark: '#c9c9c9',
  },
  {
    variable: 'tx-success',
    usedFor: 'Mensagens de sucesso, badges "disponível"',
    light: '#00a63f',
    dark: '#4ade80',
  },
]

const uiColors: ColorToken[] = [
  {
    variable: 'background',
    usedFor: 'Fundo da página',
    light: '#fafafa',
    dark: '#000000',
  },
  {
    variable: 'foreground',
    usedFor: 'Texto padrão sobre o fundo da página',
    light: '#171717',
    dark: '#ffffff',
  },
  {
    variable: 'card',
    usedFor: 'Superfície de cards e painéis',
    light: '#ffffff',
    dark: '#0a0a0a',
  },
  {
    variable: 'border',
    usedFor: 'Bordas de inputs, divisores, outlines',
    light: '#dcdcdc',
    dark: '#171717',
  },
  {
    variable: 'primary',
    usedFor: 'Botão primário, cor de marca aplicada a componentes Shadcn',
    light: '#008f39',
    dark: '#008f39',
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-tx-primary font-title mb-1 text-3xl font-bold italic">
      {children}
    </h2>
  )
}

function SectionSubtitle({ children }: { children: React.ReactNode }) {
  return <p className="text-tx-secondary mb-8 text-sm">{children}</p>
}

function StaticColorCard({ color }: { color: StaticColor }) {
  return (
    <div className="bg-card border-border overflow-hidden rounded-2xl border">
      <div className="h-20 w-full" style={{ backgroundColor: color.value }} />
      <div className="p-4">
        <p className="text-tx-primary mb-1 font-mono text-xs font-bold">
          {color.value}
        </p>
        <p className="text-tx-secondary mb-2 font-mono text-[11px]">
          {color.variable}
        </p>
        <p className="text-tx-muted text-xs">{color.usedFor}</p>
      </div>
    </div>
  )
}

function DynamicColorCard({ token }: { token: ColorToken }) {
  return (
    <div className="bg-card border-border overflow-hidden rounded-2xl border">
      {/* Swatch: light | dark */}
      <div className="flex h-20">
        <div
          className="group relative flex-1"
          style={{ backgroundColor: token.light }}
        >
          <span className="absolute bottom-1 left-1.5 rounded bg-black/30 px-1 py-0.5 font-mono text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
            Light
          </span>
        </div>
        <div
          className="group relative flex-1"
          style={{ backgroundColor: token.dark }}
        >
          <span className="absolute right-1.5 bottom-1 rounded bg-white/20 px-1 py-0.5 font-mono text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
            Dark
          </span>
        </div>
      </div>

      {/* Values */}
      <div
        className="flex divide-x border-t"
        style={{ borderColor: '#dcdcdc22' }}
      >
        <div className="flex-1 px-3 py-2">
          <p className="text-tx-muted mb-0.5 text-[10px] tracking-wider uppercase">
            Light
          </p>
          <p
            className="font-mono text-xs font-bold"
            style={{ color: token.light }}
          >
            {token.light}
          </p>
        </div>
        <div className="flex-1 px-3 py-2">
          <p className="text-tx-muted mb-0.5 text-[10px] tracking-wider uppercase">
            Dark
          </p>
          <p
            className="font-mono text-xs font-bold"
            style={{ color: token.dark }}
          >
            {token.dark}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="border-t px-4 py-3" style={{ borderColor: '#dcdcdc22' }}>
        <p className="text-tx-primary mb-1 font-mono text-xs font-bold">
          {token.variable}
        </p>
        <p className="text-tx-muted text-xs">{token.usedFor}</p>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="border-border sticky top-0 z-50 border-b bg-[var(--background)]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
          <div>
            <span className="font-title text-tx-primary text-xl font-bold italic">
              Design System
            </span>
            <span className="text-tx-muted ml-3 font-mono text-xs">v1.0</span>
          </div>
          <AnimatedThemeToggler />
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-20 px-8 py-16">
        {/* Intro */}
        <section>
          <h1 className="font-title text-tx-primary mb-4 text-6xl leading-tight font-bold italic">
            Guia Visual <br />
            <span className="text-accent-5">do Sistema.</span>
          </h1>
          <p className="text-tx-secondary max-w-2xl text-lg leading-relaxed">
            Referência centralizada de todas as variáveis de cor, tipografia e
            tokens disponíveis. Use o toggle para alternar entre os temas e ver
            como cada cor se comporta.
          </p>
        </section>

        {/* ── Tipografia ─────────────────────────────────────────────────────── */}
        <section>
          <SectionTitle>Tipografia</SectionTitle>
          <SectionSubtitle>
            Duas famílias tipográficas — utilitária e expressiva — controladas
            por variáveis de fonte.
          </SectionSubtitle>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Outfit */}
            <div className="bg-card border-border rounded-2xl border p-8">
              <p className="text-tx-muted mb-1 font-mono text-xs tracking-wider uppercase">
                --font-sans / font-sans
              </p>
              <p className="text-tx-secondary mb-4 text-xs">
                Variável CSS:{' '}
                <code className="bg-accent-3/10 text-accent-3 rounded px-1.5">
                  var(--font-outfit)
                </code>
              </p>
              <p className="text-tx-primary font-sans text-5xl font-bold">
                Outfit
              </p>
              <p className="text-tx-secondary mt-2 font-sans text-base leading-relaxed">
                Usada para todo o corpo de texto, labels, botões e interface de
                forma geral. Excelente legibilidade em tamanhos pequenos e
                grandes.
              </p>
              Não utilizar com itálico para preservar sua clareza e
              simplicidade.
              <div className="mt-4 flex flex-wrap gap-3">
                {[300, 400, 500, 600, 700, 800].map((w) => (
                  <span
                    key={w}
                    className="text-tx-muted font-sans text-sm"
                    style={{ fontWeight: w }}
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>

            {/* Cormorant */}
            <div className="bg-card border-border rounded-2xl border p-8">
              <p className="text-tx-muted mb-1 font-mono text-xs tracking-wider uppercase">
                --font-title / font-title
              </p>
              <p className="text-tx-secondary mb-4 text-xs">
                Variável CSS:{' '}
                <code className="bg-accent-3/10 text-accent-3 rounded px-1.5">
                  var(--font-cormorant)
                </code>
              </p>
              <p className="font-title text-tx-primary text-5xl font-bold italic">
                Cormorant Infant
              </p>
              <p className="text-tx-secondary mt-2 font-sans text-sm leading-relaxed">
                Usada para headings expressivos, hero text e elementos
                editorias. Alta personalidade, ideal em tamanhos grandes e em
                itálico.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {[400, 500, 600, 700].map((w) => (
                  <span
                    key={w}
                    className="font-title text-tx-muted italic"
                    style={{ fontWeight: w }}
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Escala de tamanhos */}
          <div className="bg-card border-border mt-6 rounded-2xl border p-8">
            <p className="text-tx-muted mb-6 font-mono text-xs tracking-wider uppercase">
              Escala tipográfica
            </p>
            <div className="space-y-4">
              {[
                {
                  cls: 'text-xs',
                  label: 'text-xs · 12px',
                  sample: 'Labels, captions, metadados',
                },
                {
                  cls: 'text-sm',
                  label: 'text-sm · 14px',
                  sample: 'Descrições auxiliares, subtítulos de card',
                },
                {
                  cls: 'text-base',
                  label: 'text-base · 16px',
                  sample: 'Body text padrão',
                },
                {
                  cls: 'text-lg',
                  label: 'text-lg · 18px',
                  sample: 'Parágrafos de destaque, lead text',
                },
                {
                  cls: 'text-2xl',
                  label: 'text-2xl · 24px',
                  sample: 'Subtítulos de seção',
                },
                {
                  cls: 'text-4xl font-title italic',
                  label: 'text-4xl · font-title',
                  sample: 'Títulos de página',
                },
                {
                  cls: 'text-6xl font-title italic',
                  label: 'text-6xl · font-title',
                  sample: 'Hero headings',
                },
              ].map(({ cls, label, sample }) => (
                <div key={label} className="flex items-baseline gap-6">
                  <span className="text-tx-muted w-52 shrink-0 font-mono text-[11px]">
                    {label}
                  </span>
                  <span className={`text-tx-primary ${cls}`}>{sample}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Cores de Marca (estáticas) ──────────────────────────────────────── */}
        <section>
          <SectionTitle>Cores de Marca</SectionTitle>
          <SectionSubtitle>
            Cores estáticas — não mudam com o tema. Use{' '}
            <code className="bg-accent-3/10 text-accent-3 rounded px-1">
              bg-brand-N
            </code>{' '}
            ou{' '}
            <code className="bg-accent-3/10 text-accent-3 rounded px-1">
              text-brand-N
            </code>
            .
          </SectionSubtitle>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {brandColors.map((c) => (
              <StaticColorCard key={c.variable} color={c} />
            ))}
          </div>
        </section>

        {/* ── Accent Colors (dinâmicos) ───────────────────────────────────────── */}
        <section>
          <SectionTitle>Cores de Destaque</SectionTitle>
          <SectionSubtitle>
            Pares dinâmicos que mudam com o tema. Passe o mouse sobre o swatch
            para ver o label. Use{' '}
            <code className="bg-accent-3/10 text-accent-3 rounded px-1">
              text-accent-N
            </code>{' '}
            ou{' '}
            <code className="bg-accent-3/10 text-accent-3 rounded px-1">
              bg-accent-N
            </code>
            .
          </SectionSubtitle>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {accentColors.map((t) => (
              <DynamicColorCard key={t.variable} token={t} />
            ))}
          </div>
        </section>

        {/* ── Cores de Texto ─────────────────────────────────────────────────── */}
        <section>
          <SectionTitle>Cores de Texto</SectionTitle>
          <SectionSubtitle>
            Tokens de texto com versões light/dark. Use{' '}
            <code className="bg-accent-3/10 text-accent-3 rounded px-1">
              text-tx-N
            </code>{' '}
            ou{' '}
            <code className="bg-accent-3/10 text-accent-3 rounded px-1">
              bg-tx-N
            </code>
            .
          </SectionSubtitle>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {textColors.map((t) => (
              <DynamicColorCard key={t.variable} token={t} />
            ))}
          </div>

          {/* Preview de hierarquia de texto */}
          <div className="bg-card border-border mt-6 rounded-2xl border p-8">
            <p className="text-tx-muted mb-6 font-mono text-xs tracking-wider uppercase">
              Hierarquia de texto em uso
            </p>
            <p className="text-tx-primary text-2xl font-bold">
              Título Principal · tx-primary
            </p>
            <p className="text-tx-secondary mt-2 text-base leading-relaxed">
              Parágrafo descritivo usando tx-secondary. Ideal para descrições e
              corpo de texto.
            </p>
            <p className="text-tx-muted mt-2 text-sm">
              Label ou caption auxiliar usando tx-muted.
            </p>
            <p className="text-tx-accent mt-2 text-sm">
              Texto de realce em superfícies — tx-accent.
            </p>
            <p className="text-tx-success mt-2 text-sm font-medium">
              ● Disponível para projetos — tx-success
            </p>
          </div>
        </section>

        {/* ── Cores de UI ────────────────────────────────────────────────────── */}
        <section>
          <SectionTitle>Cores de Interface</SectionTitle>
          <SectionSubtitle>
            Tokens de UI mapeados para componentes Shadcn e layout geral.
          </SectionSubtitle>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {uiColors.map((t) => (
              <DynamicColorCard key={t.variable} token={t} />
            ))}
          </div>
        </section>

        {/* ── Tokens de uso rápido ───────────────────────────────────────────── */}
        <section>
          <SectionTitle>Referência Rápida</SectionTitle>
          <SectionSubtitle>
            Tabela de quando usar cada grupo de cor.
          </SectionSubtitle>
          <div className="bg-card border-border overflow-hidden rounded-2xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: '#dcdcdc22' }}>
                  <th className="text-tx-muted px-6 py-4 text-left font-mono text-xs tracking-wider uppercase">
                    Token
                  </th>
                  <th className="text-tx-muted px-6 py-4 text-left font-mono text-xs tracking-wider uppercase">
                    Classe Tailwind
                  </th>
                  <th className="text-tx-muted px-6 py-4 text-left font-mono text-xs tracking-wider uppercase">
                    Quando usar
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#dcdcdc11' }}>
                {[
                  {
                    token: 'brand-1 → brand-5',
                    cls: 'bg-brand-N / text-brand-N',
                    when: 'Elementos visuais da marca, gradientes, CTAs',
                  },
                  {
                    token: 'accent-1 → accent-5',
                    cls: 'text-accent-N / bg-accent-N',
                    when: 'Destaques de conteúdo, links, hover states',
                  },
                  {
                    token: 'tx-primary',
                    cls: 'text-tx-primary',
                    when: 'Títulos e qualquer texto de alta hierarquia',
                  },
                  {
                    token: 'tx-secondary',
                    cls: 'text-tx-secondary',
                    when: 'Parágrafos, descrições, corpo de texto',
                  },
                  {
                    token: 'tx-muted',
                    cls: 'text-tx-muted',
                    when: 'Placeholders, labels, rodapés, metadados',
                  },
                  {
                    token: 'tx-accent',
                    cls: 'text-tx-accent',
                    when: 'Texto sobre fundos coloridos ou intermediários',
                  },
                  {
                    token: 'tx-success',
                    cls: 'text-tx-success / bg-tx-success/10',
                    when: 'Status positivo, disponibilidade, confirmações',
                  },
                  {
                    token: 'background',
                    cls: 'bg-background',
                    when: 'Fundo da página inteira',
                  },
                  {
                    token: 'card',
                    cls: 'bg-card',
                    when: 'Superfície de cards, modais, painéis',
                  },
                  {
                    token: 'border',
                    cls: 'border-border',
                    when: 'Divisores, bordas de input, outlines',
                  },
                  {
                    token: 'primary',
                    cls: 'bg-primary / text-primary',
                    when: 'Botão primário, anel de foco (Shadcn)',
                  },
                  {
                    token: 'font-sans',
                    cls: 'font-sans',
                    when: 'Todo corpo de texto e UI',
                  },
                  {
                    token: 'font-title',
                    cls: 'font-title',
                    when: 'Headings expressivos, hero text',
                  },
                ].map(({ token, cls, when }) => (
                  <tr
                    key={token}
                    className="hover:bg-accent-3/5 transition-colors"
                  >
                    <td className="text-tx-primary px-6 py-3 font-mono text-xs font-bold">
                      {token}
                    </td>
                    <td className="px-6 py-3">
                      <code className="bg-accent-3/10 text-accent-3 rounded px-1.5 py-0.5 text-xs">
                        {cls}
                      </code>
                    </td>
                    <td className="text-tx-secondary px-6 py-3 text-xs">
                      {when}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="border-border border-t py-8 text-center">
        <p className="text-tx-muted font-mono text-xs">
          Design System · Portfolio © 2026
        </p>
      </footer>
    </div>
  )
}
