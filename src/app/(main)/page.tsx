import Spline from '@splinetool/react-spline/next'
import { ContactForm } from '@/components'
import { ContentSection } from '@/components/section/content-section'
import { emailSectionTranslations } from '@/components/section/section-translations'

export default function Home() {
  return (
    <>
      <div className="bg-background relative min-h-screen w-full font-sans transition-colors duration-300">
        {/* Heddline*/}
        <section className="relative h-screen w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="h-full w-full">
              <Spline
                style={{ pointerEvents: 'auto' }}
                scene="https://prod.spline.design/E3Np8UpeDg8IrCCr/scene.splinecode"
              />
            </div>
          </div>

          {/* Conteúdo da Headline*/}
          <main className="pointer-events-none relative z-10 mx-auto flex h-full max-w-350 flex-col items-center px-6 pt-24 lg:grid lg:grid-cols-3 lg:items-center lg:px-16 lg:pt-0">
            <div className="flex flex-col items-center justify-center text-center lg:items-start lg:self-start lg:pt-32 lg:text-left">
              <h1 className="text-tx-primary pointer-events-auto text-3xl leading-[1.1] font-bold tracking-tighter sm:text-4xl md:text-4xl lg:text-5xl xl:text-7xl">
                Olá, eu sou <br className="hidden lg:block" /> Carlos Silva
              </h1>
            </div>

            <div className="hidden lg:block lg:h-full" />

            <div className="mt-4 flex flex-col items-center justify-center text-center lg:mt-0 lg:items-end lg:self-center lg:text-right">
              <h2 className="font-title text-tx-primary pointer-events-auto flex flex-col text-6xl leading-[1.1] font-bold italic sm:text-7xl md:text-8xl lg:text-6xl xl:text-8xl">
                <span className="text-accent-2">Engenheiro</span>
                <span className="text-accent-5 lg:whitespace-nowrap">
                  de Software
                </span>
              </h2>
            </div>
          </main>
        </section>

        <ContentSection
          translations={emailSectionTranslations}
          textOrientation="center"
          sectionSize="small"
        >
          <ContactForm />
        </ContentSection>

        <footer className="text-tx-muted pb-8 text-center text-xs md:text-sm">
          © 2026 • Construído com Next.js
        </footer>
      </div>
    </>
  )
}
