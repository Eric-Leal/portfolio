import Spline from '@splinetool/react-spline/next'
import { ContactForm } from '@/components'
import { ProjectsGrid } from '@/components/shared/project'
import { ContentSection } from '@/components/shared/section/content-section'
import {
  emailSectionTranslations,
  experienceSectionTranslations,
  projectsSectionTranslations,
} from '@/components/shared/section/section-translations'
import { AboutSection } from '@/components/shared/about/about-section'
import { StackSection } from '@/components/shared/section/stack-section'
import { HeadlineSection } from './_headline-section'
import { TimelineExperience } from '@/components/shared/timeline'
import { SplineWrapper } from '@/components/shared/spline/'
import { VelocityBanner } from '@/components/shared/velocity-banner'

export default function Home() {
  return (
    <>
      <div className="bg-background relative min-h-screen w-full font-sans transition-colors duration-300">
        {/* Heddline*/}
        <section className="relative h-screen w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-0">
            {/* O Wrapper cliente cuida da performance, o Spline cuida do 3D */}
            <SplineWrapper>
              <Spline
                style={{ pointerEvents: 'auto' }}
                scene="https://prod.spline.design/E3Np8UpeDg8IrCCr/scene.splinecode"
              />
            </SplineWrapper>
          </div>

          <HeadlineSection />
          <VelocityBanner className="absolute bottom-0 left-0 z-20 w-full" />
        </section>

        <AboutSection />

        <StackSection />

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
          <TimelineExperience />
        </ContentSection>

        <ContentSection
          translations={emailSectionTranslations}
          textOrientation="center"
          sectionSize="small"
        >
          <ContactForm />
        </ContentSection>
      </div>
    </>
  )
}
