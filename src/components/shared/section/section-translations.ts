import type { ExperienceSectionTranslation } from '@/types/experience'

export const headlineTranslations: Record<
  string,
  { greeting: string; name: string; rolePart1: string; rolePart2: string }
> = {
  pt: {
    greeting: 'Olá, eu sou',
    name: 'Eric Leal',
    rolePart1: 'Engenheiro',
    rolePart2: 'de Software',
  },
  en: {
    greeting: "Hello, I'm",
    name: 'Eric Leal',
    rolePart1: 'Software',
    rolePart2: 'Engineer',
  },
}

export const aboutSectionTranslations = {
  pt: {
    title: 'Sobre',
    auroraText: 'mim',
    description: [
      'Meu nome é Eric, sou de Belo Horizonte, MG, Brasil.',
      'Sou estudante de Engenharia de Software na PUC Minas. Sou formado em Técnico de Programação de Jogos Digitais pelo SENAI BH CFP Nansen Araújo.',
      'Tenho foco em desenvolvimento web fullstack. Atualmente sigo evoluindo em aplicações com TypeScript, Next.js e integrações com serviços backend.',
    ],
  },
  en: {
    title: 'About',
    auroraText: 'me',
    description: [
      'My name is Eric, I am from Belo Horizonte, MG, Brazil.',
      'I am a student of Software Engineering at PUC Minas. I am a graduate of Technical Programming for Digital Games by SENAI BH CFP Nansen Araújo.',
      'I focus on fullstack web development. I am currently evolving in applications with TypeScript, Next.js and integrations with backend services.',
    ],
  },
}

export const emailSectionTranslations = {
  pt: {
    title: 'Entre em',
    auroraText: 'contato',
    description: 'Tem uma pergunta ou quer trabalhar junto? Fique à vontade!',
  },
  en: {
    title: "Let's",
    auroraText: 'talk',
    description:
      'Have a question or want to work together? Feel free to reach out!',
  },
}

export const projectsSectionTranslations = {
  pt: {
    title: 'Meus',
    auroraText: 'projetos',
    description: 'Dê uma olhada em alguns dos meus projetos mais recentes.',
  },
  en: {
    title: 'My',
    auroraText: 'projects',
    description: 'Take a look at some of my recent projects.',
  },
}

export const experienceSectionTranslations: Record<
  string,
  ExperienceSectionTranslation
> = {
  pt: {
    title: 'Jornada',
    auroraText: 'profissional',
    description:
      'Uma linha do tempo da minha evolução técnica e contribuições em diferentes papéis de engenharia.',
    items: [
      {
        year: '2024 - 2028',
        role: 'Graduação em Engenharia de Software',
        company: 'PUC Minas Lourdes',
        description:
          'Formação acadêmica em Engenharia de Software. Participei de projetos práticos e atividades extracurriculares que complementaram minha formação técnica e habilidades de trabalho em equipe.',
        category: 'education',
      },
      {
        year: '2025.2',
        role: 'Melhores Trabalhos Interdisciplinares de Software - PUC Minas',
        company: 'Trabalho Interdisciplinar: Aplicações para Cenários Reais',
        description:
          'Desenvolvedor fullstack no projeto Gestar+, uma plataforma de gestão de clínica obstétrica com acompanhamento gestacional por enfermeiras obstetras, desenvolvida em Next.js, Node.js, NestJS, TypeScript, PostgreSQL.',
        category: 'education',
      },
      {
        year: '2025',
        role: 'Estágio em Desenvolvimento de Software',
        company: 'Webimob',
        description:
          'Atuo como desenvolvedor trabalhando com Next.js e Supabase, fazendo tanto o frontend quanto o backend da aplicação da empresa.',
        category: 'work',
      },
      {
        year: '2025.1',
        role: 'Melhores Trabalhos Interdisciplinares de Software - PUC Minas',
        company:
          'Trabalho Interdisciplinar: Aplicações para Processos de Negócios',
        description:
          'Projeto FoodBridge desenvolvido em time. Uma plataforma de conexão entre empresas e instituições sem fins lucrativos para doação de alimentos. Contribui para o desenvolvimento de funcionalidades front-end e integrações back-end, utilizando JavaScript, Node.js, Spring Boot, PostgreSQL, CSS e HTML.',
        category: 'education',
      },
      {
        year: '2024.2',
        role: 'Melhores Trabalhos Interdisciplinares de Software - PUC Minas',
        company: 'Trabalho Interdisciplinar: Aplicações Web',
        description:
          'Desenvolvi em grupo o projeto Moneo, uma plataforma de gestão financeira pessoal. Contribui para o desenvolvimento de funcionalidades front-end e integrações back-end, utilizando JavaScript, Node.js, CSS e HTML.',
        category: 'education',
      },
    ],
  },
  en: {
    title: 'Professional',
    auroraText: 'journey',
    description:
      'A timeline of my technical evolution and contributions across different engineering roles.',
    items: [
      {
        year: '2024 - 2028',
        role: 'B.S. in Software Engineering',
        company: 'PUC Minas Lourdes',
        description:
          'Academic background in Software Engineering. Participated in hands-on projects and extracurricular activities that complemented my technical training and teamwork skills.',
        category: 'education',
      },
      {
        year: '2025.2',
        role: 'Top Interdisciplinary Software Projects - PUC Minas',
        company: 'Interdisciplinary Work: Real-World Scenarios',
        description:
          'Full-stack developer for the Gestar+ project, an obstetric clinic management platform with gestational monitoring by obstetric nurses. Built with Next.js, Node.js, NestJS, TypeScript, and PostgreSQL.',
        category: 'education',
      },
      {
        year: '2025',
        role: 'Software Development Intern',
        company: 'Webimob',
        description:
          'Working as a software development intern, contributing to the development of web applications using Next.js and Supabase. I am involved in both frontend and backend aspects of the company’s application.',
        category: 'work',
      },
      {
        year: '2025.1',
        role: 'Top Interdisciplinary Software Projects - PUC Minas',
        company: 'Interdisciplinary Work: Business Process Applications',
        description:
          'FoodBridge project developed in a team. A platform connecting companies and non-profits for food donations. Contributed to front-end features and back-end integrations using JavaScript, Node.js, Spring Boot, PostgreSQL, CSS, and HTML.',
        category: 'education',
      },
      {
        year: '2024.2',
        role: 'Top Interdisciplinary Software Projects - PUC Minas',
        company: 'Interdisciplinary Work: Web Applications',
        description:
          'Developed the Moneo project in a group, a personal financial management platform. Contributed to front-end features and back-end integrations using JavaScript, Node.js, CSS, and HTML.',
        category: 'education',
      },
    ],
  },
}

export const stackSectionTranslations = {
  pt: {
    title: '',
    auroraText: 'Tecnologias',
    description:
      'As principais ferramentas e linguagens que uso no meu dia a dia.',
  },
  en: {
    title: '',
    auroraText: 'Technologies',
    description: 'The main tools and languages I use on a daily basis.',
  },
}

export const guestbookTranslations = {
  pt: {
    title: 'Mural de',
    titleAccent: 'Visitantes',
    subtitle:
      'Entre para deixar uma mensagem, compartilhar um feedback ou apenas dizer olá.',
    signInGithub: 'Continuar com GitHub',
    signInGoogle: 'Continuar com Google',
    welcomeBack: 'Olá',
    signOut: 'Sair',
    inputPlaceholder: (name: string) => `Deixe uma mensagem para ${name}...`,
    charCount: (count: number, max: number) => `${count}/${max}`,
    signButton: 'Assinar Guestbook',
    signingButton: 'Assinando...',
    recentSignatures: 'ASSINATURAS RECENTES',
    loadMore: 'Carregar mais',
    loading: 'Carregando...',
    likedBy: (name: string) => `Curtido por ${name}`,
    pinned: 'Fixado',
    editButton: 'Editar',
    deleteButton: 'Deletar',
    saveButton: 'Salvar',
    cancelButton: 'Cancelar',
    editModalTitle: 'Editar Mensagem',
    deleteModalTitle: 'Deletar Mensagem?',
    deleteModalDescription:
      'Tem certeza que deseja deletar esta mensagem? Esta ação não pode ser desfeita.',
    confirmDeleteButton: 'Deletar Mensagem',
    // Toast messages
    toastSigned: 'Mensagem assinada!',
    toastUpdated: 'Mensagem atualizada!',
    toastDeleted: 'Mensagem deletada!',
    toastError: 'Erro ao processar a solicitação.',
  },
  en: {
    title: 'Guest',
    titleAccent: 'Book',
    subtitle:
      'Sign in to leave a message, share feedback, or just say hello to the community.',
    signInGithub: 'Continue with GitHub',
    signInGoogle: 'Continue with Google',
    welcomeBack: 'Hello',
    signOut: 'Log out',
    inputPlaceholder: (name: string) => `Leave a message for ${name}...`,
    charCount: (count: number, max: number) => `${count}/${max}`,
    signButton: 'Sign Guestbook',
    signingButton: 'Signing...',
    recentSignatures: 'RECENT SIGNATURES',
    loadMore: 'Load more',
    loading: 'Loading...',
    likedBy: (name: string) => `Liked by ${name}`,
    pinned: 'Pinned',
    editButton: 'Edit',
    deleteButton: 'Delete',
    saveButton: 'Save Changes',
    cancelButton: 'Cancel',
    editModalTitle: 'Edit Message',
    deleteModalTitle: 'Delete Message?',
    deleteModalDescription:
      'Are you sure you want to delete this message? This action cannot be undone.',
    confirmDeleteButton: 'Delete Message',
    // Toast messages
    toastSigned: 'Message signed!',
    toastUpdated: 'Message updated!',
    toastDeleted: 'Message deleted!',
    toastError: 'Error processing request.',
  },
}
