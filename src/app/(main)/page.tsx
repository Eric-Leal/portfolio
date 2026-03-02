import Spline from '@splinetool/react-spline/next'
import { ContactForm } from '@/components'
import { ProjectsGrid } from '@/components/shared/project'
import { ContentSection } from '@/components/section/content-section'
import {
  emailSectionTranslations,
  experienceSectionTranslations,
  projectsSectionTranslations,
} from '@/components/section/section-translations'
import { AboutSection } from '@/components/about/about-section'
import { HeadlineSection } from './_headline-section'
import { Timeline } from '@/components/shared/timeline'

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

          {/* Conteúdo da Headline */}
          <HeadlineSection />
        </section>

        <AboutSection />

        <ContentSection
          translations={projectsSectionTranslations}
          sectionSize="large"
          textOrientation="center"
        >
          <ProjectsGrid />
        </ContentSection>

        <ContentSection
          translations={experienceSectionTranslations}
          sectionSize="large"
          textOrientation="center"
        >
          <Timeline />
        </ContentSection>

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
