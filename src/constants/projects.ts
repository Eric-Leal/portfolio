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
    slug: 'food-bridge',
    title: {
      pt: 'FoodBridge',
      en: 'FoodBridge',
    },
    description: {
      pt: 'Projeto FoodBridge desenvolvido em time. Uma plataforma de conexão entre empresas e instituições sem fins lucrativos para doação de alimentos.',
      en: 'FoodBridge project developed in a team. A platform connecting companies and non-profits for food donations.',
    },
    category: 'web',
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
      type: 'video',
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    tags: ['JavaScript', 'Node.js', 'Spring Boot', 'PostgreSQL', 'CSS', 'HTML'],
    links: {},
    theme: projectThemes.foodBridge,
  },
  {
    id: '3',
    slug: 'gestar-mais',
    title: {
      pt: 'Gestar+',
      en: 'Gestar+',
    },
    description: {
      pt: 'Projeto Gestar+, uma plataforma de gestão de clínica obstétrica com acompanhamento gestacional por enfermeiras obstetras.',
      en: 'Gestar+ project, an obstetric clinic management platform with gestational monitoring by obstetric nurses.',
    },
    category: 'web',
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
      type: 'video',
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
    tags: ['Next.js', 'Node.js', 'NestJS', 'TypeScript', 'PostgreSQL'],
    links: {},
    theme: projectThemes.gestarMais,
  },
]
