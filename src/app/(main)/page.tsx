import Spline from '@splinetool/react-spline/next'
import { ContactForm } from '@/components'
import { ProjectsGrid } from '@/components/shared/project'
import { ContentSection } from '@/components/shared/section/content-section'
import {
  aboutSectionTranslations,
  emailSectionTranslations,
  experienceSectionTranslations,
  projectsSectionTranslations,
  stackSectionTranslations,
} from '@/components/shared/section/section-translations'
import { TechStack } from '@/components/shared/section/techstack'
import { HeadlineSection } from './_headline-section'
import { TimelineExperience } from '@/components/shared/timeline'
import { SplineWrapper } from '@/components/shared/spline/'
import { VelocityBanner } from '@/components/shared/velocity-banner'
import { AboutImage } from '@/components/shared/about/about-image'

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
                scene="https://prod.spline.design/b1uXntkbxq8Yjb3p/scene.splinecode"
              />
            </SplineWrapper>
          </div>

          <HeadlineSection />
          <VelocityBanner className="absolute bottom-0 left-0 z-20 w-full" />
        </section>

        {/* Seção Sobre Mim */}
        <ContentSection
          id="about"
          grid={true}
          translations={aboutSectionTranslations}
          textOrientation="left"
        >
          <AboutImage />
        </ContentSection>

        {/* Seção Projetos */}
        <ContentSection
          id="projects"
          translations={projectsSectionTranslations}
        >
          <ProjectsGrid />
        </ContentSection>

        {/* Seção Experiência */}
        <ContentSection
          id="experience"
          translations={experienceSectionTranslations}
        >
          <TimelineExperience />
        </ContentSection>

        {/* Seção Tecnologias */}
        <ContentSection
          translations={stackSectionTranslations}
          sectionSize="large"
          textOrientation="center"
        >
          <TechStack />
        </ContentSection>

        {/* Seção Contato (Email) */}
        <ContentSection
          id="contact"
          translations={emailSectionTranslations}
          sectionSize="small"
        >
          <ContactForm />
        </ContentSection>
      </div>
    </>
  )
}
