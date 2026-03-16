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
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
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
    links: { website: 'https://itch.io' },
    theme: projectThemes.vThreat,
    gallery: [
      {
        type: 'video',
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        alt: 'Portfolio homepage demo',
      },
      {
        type: 'image',
        url: 'https://picsum.photos/200/300',
        alt: 'Design system overview',
      },
      {
        type: 'image',
        url: 'https://picsum.photos/400/300',
        alt: 'Mobile responsive view',
      },
    ],
    featured: true,
  },
  {
    id: '2',
    slug: 'finance-app',
    title: {
      pt: 'Finance App',
      en: 'Finance App',
    },
    description: {
      pt: 'Controle financeiro completo com <b> visual imersivo </b>. Dashboard em tempo real, categorização automática de gastos e relatórios mensais detalhados para ajudar o usuário a ter clareza sobre suas finanças. Contrary to popular belief, Lorem Ipsum is not simply random text. It has <b>roots in a piece of classical</b> Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
      en: 'Full-featured finance tracking app with an immersive UI. Real-time dashboard, automatic expense categorization, and detailed monthly reports to give users complete clarity on their finances.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
    },
    category: 'mobile',
    stats: [
      { label: { pt: 'Downloads', en: 'Downloads' }, value: '45k' },
      { label: { pt: 'Avaliação', en: 'Rating' }, value: '4.5/5' },
    ],
    gallery: [
      {
        type: 'video',
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        alt: 'Finance app dashboard demo',
      },
      {
        type: 'image',
        url: 'https://picsum.photos/id/229/800/600',
        alt: 'Dashboard screen',
      },
      {
        type: 'image',
        url: 'https://picsum.photos/id/574/800/600',
        alt: 'Analytics screen',
      },
      {
        type: 'image',
        url: 'https://picsum.photos/id/100/800/600',
        alt: 'Reports screen',
      },
    ],
    thumbnail: {
      devices: [
        {
          type: 'video',
          url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        },
        { type: 'image', url: 'https://picsum.photos/400/300' },
        { type: 'image', url: 'https://picsum.photos/id/213/400/300' },
      ],
    },
    tags: [
      'React Native',
      'Expo',
      'Supabase',
      'TypeScript',
      'Zustand',
      'Jest',
      'React Testing Library',
      'GitHub Actions',
    ],
    links: { appleStore: 'https://apple.com', playStore: 'https://google.com' },
  },
  {
    id: '3',
    slug: 'language-app',
    title: {
      pt: 'Language App',
      en: 'Language App',
    },
    description: {
      pt: 'Aplicativo completo para aprendizado de idiomas com <b> visual imersivo </b>. Dashboard em tempo real, categorização automática de gastos e relatórios mensais detalhados para ajudar o usuário a ter clareza sobre suas finanças. Contrary to popular belief, Lorem Ipsum is not simply random text. It has <b>roots in a piece of classical</b> Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
      en: 'Full-featured language learning app with an immersive UI. Real-time dashboard, automatic expense categorization, and detailed monthly reports to give users complete clarity on their finances.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
    },
    category: 'mobile',
    stats: [
      { label: { pt: 'Downloads', en: 'Downloads' }, value: '45k' },
      { label: { pt: 'Avaliação', en: 'Rating' }, value: '4.5/5' },
    ],
    gallery: [
      {
        type: 'video',
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        alt: 'Finance app dashboard demo',
      },
      {
        type: 'image',
        url: 'https://picsum.photos/id/123/800/600',
        alt: 'Dashboard screen',
      },
      {
        type: 'image',
        url: 'https://picsum.photos/id/456/800/600',
        alt: 'Analytics screen',
      },
      {
        type: 'image',
        url: 'https://picsum.photos/id/789/800/600',
        alt: 'Reports screen',
      },
    ],
    thumbnail: {
      devices: [
        {
          type: 'video',
          url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        },
        { type: 'image', url: 'https://picsum.photos/id/123/400/300' },
        { type: 'image', url: 'https://picsum.photos/id/213/400/300' },
      ],
    },
    tags: [
      'React Native',
      'Expo',
      'Supabase',
      'TypeScript',
      'Zustand',
      'Jest',
      'React Testing Library',
      'GitHub Actions',
    ],
    links: { appleStore: 'https://apple.com', playStore: 'https://google.com' },
  },
]
