import type { ExperienceSectionTranslation } from '@/types/experience'

export const headlineTranslations: Record<
  string,
  { greeting: string; name: string; rolePart1: string; rolePart2: string }
> = {
  pt: {
    greeting: 'Olá, eu sou',
    name: 'Carlos Silva',
    rolePart1: 'Engenheiro',
    rolePart2: 'de Software',
  },
  en: {
    greeting: "Hello, I'm",
    name: 'Carlos Silva',
    rolePart1: 'Software',
    rolePart2: 'Engineer',
  },
}

export const aboutSectionTranslations = {
  pt: {
    title: 'Sobre',
    auroraText: 'mim',
    description: [
      'Engenheiro de Software apaixonado por construir produtos digitais com foco em experiência do usuário, performance e código limpo. Tenho experiência com aplicações web full-stack, desde a concepção até a entrega em produção.',
      'Atualmente trabalho com React, Next.js e TypeScript no front-end, e Node.js com Supabase no back-end. Adoro explorar novas tecnologias, contribuir com open-source e transformar problemas complexos em soluções elegantes.',
    ],
  },
  en: {
    title: 'About',
    auroraText: 'me',
    description: [
      'Software Engineer passionate about building digital products with a focus on user experience, performance, and clean code. I have experience with full-stack web applications, from conception to production delivery.',
      'I currently work with React, Next.js and TypeScript on the front-end, and Node.js with Supabase on the back-end. I love exploring new technologies, contributing to open-source, and turning complex problems into elegant solutions.',
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
        year: '2023',
        role: 'Senior Developer',
        company: 'Company A',
        description:
          'Desenvolvedor líder em projetos de infraestrutura na Company A, com foco em escalabilidade e otimização de performance. Liderou a migração para arquitetura de microsserviços.',
        category: 'work',
      },
      {
        year: '2021',
        role: 'Mid-level Developer',
        company: 'Company B',
        description:
          'Desenvolveu aplicações web de alto tráfego com frameworks modernos. Trabalhou com equipes multidisciplinares para entregar experiências pixel-perfect e integrações robustas de API.',
        category: 'code',
      },
      {
        year: '2019',
        role: 'Junior Developer',
        company: 'Company C',
        description:
          'Iniciou a jornada contribuindo com módulos front-end e manutenção de sistemas legados. Aprendeu boas práticas de controle de versão e metodologias ágeis apoiando engenheiros sênior.',
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
        year: '2023',
        role: 'Senior Developer',
        company: 'Company A',
        description:
          'Lead developer for core infrastructure projects at Company A, focusing on scalability and performance optimization. Spearheaded the transition to microservices architecture.',
        category: 'work',
      },
      {
        year: '2021',
        role: 'Mid-level Developer',
        company: 'Company B',
        description:
          'Developed high-traffic web applications using modern frameworks. Collaborated with cross-functional teams to deliver pixel-perfect user experiences and robust API integrations.',
        category: 'code',
      },
      {
        year: '2019',
        role: 'Junior Developer',
        company: 'Company C',
        description:
          'Started my journey contributing to front-end modules and maintaining legacy systems. Learned best practices in version control and agile methodologies while supporting senior engineers.',
        category: 'education',
      },
    ],
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
