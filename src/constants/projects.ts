import type { Project } from '@/types/project'
import { projectThemes } from './projectsThemes'

/**
 * Dados dos projetos do portfólio.
 *
 * Fonte única de verdade para todos os projetos. Cada entrada é fortemente
 * tipada pelo tipo discriminado `Project`, garantindo que apenas os campos
 * válidos por categoria sejam utilizados.*/

export const projects: Project[] = [
  {
    id: '1',
    slug: 'V-Threat',
    title: {
      pt: 'V-Threat',
      en: 'V-Threat',
    },
    description: {
      pt: 'Projeto de jogo de tiro em terceira pessoa ambientado em um mundo futurista, desenvolvido na Unreal Engine 4 e modelos feitos no Blender. Desenvolvido durante o curso técnico de Programação de Jogos Digitais, SENAI',
      en: 'A third-person shooter game set in a futuristic world, developed with Unreal Engine 4 and models created in Blender. Created during the technical course in Digital Game Programming at SENAI.',
    },
    category: 'game',
    thumbnail: {
      type: 'video',
      url: 'https://wnfwivuugmumfqczpyjt.supabase.co/storage/v1/object/public/projetos/V-Threat/video.mp4',
    },
    tags: [
      'Unreal Engine',
      'Blender',
      'Blueprints',
      'Mixamo',
      'Adobe Substance Painter',
      'Adobe Illustrator',
      'Adobe Photoshop',
    ],
    links: {},
    theme: projectThemes.vThreat,
    gallery: [
      {
        type: 'video',
        url: 'https://wnfwivuugmumfqczpyjt.supabase.co/storage/v1/object/public/projetos/V-Threat/V-Threat.mp4',
        alt: 'Portfolio homepage demo',
      },
      {
        type: 'image',
        url: 'https://wnfwivuugmumfqczpyjt.supabase.co/storage/v1/object/public/projetos/V-Threat/v_1.png',
        alt: 'Design system overview',
      },
      {
        type: 'image',
        url: 'https://wnfwivuugmumfqczpyjt.supabase.co/storage/v1/object/public/projetos/V-Threat/v_2.png',
        alt: 'Mobile responsive view',
      },
    ],
    featured: true,
  },
  {
    id: '2',
    slug: 'foodbridge',
    title: {
      pt: 'FoodBridge',
      en: 'FoodBridge',
    },
    description: {
      pt: 'A plataforma FoodBridge é um ecossistema digital desenvolvido para conectar empresas comprometidas com políticas de <b>ESG (Environmental, Social, and Governance)</b> a instituições sociais e ONGs sem fins lucrativos. O foco central do projeto é o combate ao desperdício de alimentos, facilitando a logística de doação e garantindo que excedentes cheguem a quem mais precisa. Através de um sistema de <b>auto cadastro e login</b>, empresas fornecedoras podem <b>criar e gerenciar ofertas de doação</b>, detalhando informações cruciais como imagens, descrições precisas, quantidades e prazos de validade. Por outro lado, as ONGs podem navegar pelas doações disponíveis, visualizar detalhes dos doadores e <b>solicitar itens</b> de forma direta pela plataforma. O software conta com um <b>fluxo de aprovação</b> onde as empresas gerenciam as solicitações recebidas, culminando em um <b>sistema de avaliações</b>. Este feedback final permite que as ONGs classifiquem a qualidade das doações e a agilidade do processo, promovendo transparência e confiança dentro da rede solidária. Com uma interface intuitiva e foco em impacto social, a FoodBridge moderniza a filantropia corporativa e fortalece a responsabilidade social no setor alimentício.',

      en: 'The FoodBridge platform is a digital ecosystem developed to connect companies committed to <b>ESG (Environmental, Social, and Governance)</b> policies with social institutions and non-profit NGOs. The project’s central focus is the fight against food waste, facilitating donation logistics and ensuring that surpluses reach those in need. Through a <b>self-registration and login system</b>, supplier companies can <b>create and manage donation offers</b>, providing crucial information such as images, precise descriptions, quantities, and expiration dates. On the other hand, NGOs can browse available donations, view donor details, and <b>request items</b> directly through the platform. The software features an <b>approval workflow</b> where companies manage incoming requests, culminating in an <b>evaluation system</b>. This final feedback allows NGOs to rate the quality of donations and the agility of the process, promoting transparency and trust within the solidarity network. With an intuitive interface and a focus on social impact, FoodBridge modernizes corporate philanthropy and strengthens social responsibility in the food sector.',
    },
    category: 'web',
    thumbnail: {
      type: 'image',
      url: 'https://wnfwivuugmumfqczpyjt.supabase.co/storage/v1/object/public/projetos/FoodBridge/f_5.png',
    },
    tags: [
      'JavaScript',
      'CSS',
      'HTML',
      'PostgreSQL',
      'Git',
      'Github',
      'Spring Boot',
      'Vercel',
    ],
    links: {
      github: '',
      website: 'https://www.foodbridge.site/',
    },
    theme: projectThemes.foodBridge,
    gallery: [
      {
        type: 'image',
        url: 'https://wnfwivuugmumfqczpyjt.supabase.co/storage/v1/object/public/projetos/FoodBridge/f_1.png',
        alt: 'Detalhes da doação',
      },
      {
        type: 'image',
        url: 'https://wnfwivuugmumfqczpyjt.supabase.co/storage/v1/object/public/projetos/FoodBridge/f_2.png',
        alt: 'Homepage da plataforma',
      },
      {
        type: 'image',
        url: 'https://wnfwivuugmumfqczpyjt.supabase.co/storage/v1/object/public/projetos/FoodBridge/f_3.png',
        alt: 'Empresas doadoras',
      },
      {
        type: 'image',
        url: 'https://wnfwivuugmumfqczpyjt.supabase.co/storage/v1/object/public/projetos/FoodBridge/f_4.png',
        alt: 'Avaliação de doação',
      },
    ],
    featured: true,
  },
  {
    id: '3',
    slug: 'gestar',
    title: {
      pt: 'Gestar+',
      en: 'Gestar+',
    },
    description: {
      pt: 'A plataforma Gestar+ surge como uma solução completa e projetada especificamente para otimizar o ecossistema de assistência perinatal ao conectar gestantes e enfermeiras obstétricas em um ambiente digital integrado. O projeto foca na centralização da jornada de cuidado, permitindo que a paciente gerencie todo o seu ciclo de acompanhamento, desde a escolha da profissional até o suporte pós-consulta. Através de uma interface intuitiva, a gestante tem acesso a um <b>catálogo diversificado de serviços</b>, como consultoria de amamentação, educação perinatal e massagem para bebês, podendo <b>agendar consultas</b> de forma direta e visualizar sua agenda completa em um <b>calendário dinâmico</b>. Este calendário é uma peça fundamental da experiência, oferecendo transparência total sobre consultas passadas, pendentes e pagas, além de permitir fluxos de solicitação para alterações de horários, garantindo flexibilidade para ambas as partes. A comunicação é realizada por um <b>sistema de chat em tempo real</b>, que humaniza o atendimento e permite orientações rápidas em casos de dúvidas comuns da gestação. Para as enfermeiras, a plataforma funciona como uma poderosa ferramenta de gestão de carreira e produtividade, incluindo o <b>gerenciamento de equipe</b>, acompanhamento de <b>relatórios mensais</b> e a construção de autoridade através de um <b>sistema de avaliações</b>. Os feedbacks das pacientes, agregados com notas em estrelas e comentários detalhados, são exibidos nos perfis das profissionais, criando um ambiente de confiança. Além das funcionalidades transacionais, a Gestar+ reforça seu compromisso com o impacto social ao oferecer uma trilha de <b>conteúdos educacionais gratuitos</b>, democratizando informações essenciais sobre o período puerpério e cuidados com o recém-nascido. Pelo viés administrativo, o software oferece controle rigoroso sobre o fluxo de trabalho, desde o <b>cadastro e login seguro</b> até a <b>triagem e aprovação de currículos</b> de novas enfermeiras, consolidando-se como um sistema robusto, escalável e essencial para a modernização da saúde obstétrica.',
      en: 'The Gestar+ platform emerges as a comprehensive solution specifically designed to optimize the perinatal care ecosystem by connecting pregnant women and obstetric nurses in an integrated digital environment. The project focuses on centralizing the care journey, allowing patients to manage their entire follow-up cycle, from choosing a professional to post-consultation support. Through an intuitive interface, patients have access to a <b>diverse service catalog</b>, such as breastfeeding consultancy, perinatal education, and baby massage, being able to <b>schedule appointments</b> directly and view their full schedule in a <b>dynamic calendar</b>. This calendar is a cornerstone of the experience, offering total transparency regarding past, pending, and paid appointments, while allowing request flows for rescheduling to ensure flexibility for both parties. Communication is handled by a <b>real-time chat system</b>, which humanizes care and allows for quick guidance on common pregnancy concerns. For nurses, the platform acts as a powerful career and productivity management tool, including <b>team management</b>, monitoring of <b>monthly reports</b>, and authority building through an <b>evaluation system</b>. Patient feedback, aggregated with star ratings and detailed comments, is displayed on professional profiles to create a trusting environment. Beyond transactional features, Gestar+ reinforces its social impact commitment by offering a track of <b>free educational content</b>, democratizing essential information about the postpartum period and newborn care. From an administrative perspective, the software provides rigorous workflow control, from <b>secure registration and login</b> to the <b>screening and approval of resumes</b> for new nurses, establishing itself as a robust, scalable, and essential system for the modernization of obstetric healthcare.',
    },
    category: 'web',
    thumbnail: {
      type: 'image',
      url: 'https://wnfwivuugmumfqczpyjt.supabase.co/storage/v1/object/public/projetos/GestarMais/g_1.png',
    },
    tags: [
      'Next.js',
      'Tailwind CSS',
      'TypeScript',
      'PostgreSQL',
      'Nest.js',
      'Git',
      'Github',
      'Vercel',
    ],
    links: {
      github: 'https://github.com/LauraPontara/gestar-mais',
      website: 'https://gestarmais.vercel.app/',
    },
    theme: projectThemes.gestarMais,
    gallery: [
      {
        type: 'image',
        url: 'https://wnfwivuugmumfqczpyjt.supabase.co/storage/v1/object/public/projetos/GestarMais/g_2.png',
        alt: 'Serviços oferecidos',
      },
      {
        type: 'image',
        url: 'https://wnfwivuugmumfqczpyjt.supabase.co/storage/v1/object/public/projetos/GestarMais/g_3.png',
        alt: 'Calendário de consultas',
      },
      {
        type: 'image',
        url: 'https://wnfwivuugmumfqczpyjt.supabase.co/storage/v1/object/public/projetos/GestarMais/g_4.png',
        alt: 'chat em tempo real',
      },
      {
        type: 'image',
        url: 'https://wnfwivuugmumfqczpyjt.supabase.co/storage/v1/object/public/projetos/GestarMais/g_5.jpeg',
        alt: 'Perfil da enfermeira',
      },
    ],
    featured: true,
  },
]
