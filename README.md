# 🚀 Portfólio Profissional - LAB01

> **Disciplina:** Laboratório de Desenvolvimento de Software  
> **Curso:** Engenharia de Software  
> **Professor:** João Paulo Carneiro Aramuni

---

[![Versão](https://img.shields.io/badge/Versão-v0.1.0-blue?style=for-the-badge)](https://github.com/LauraPontara/portfolio/releases)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-2.98.0-007ec6?style=for-the-badge&logo=supabase&logoColor=white)
![GitHub repo size](https://img.shields.io/github/repo-size/LauraPontara/portfolio?style=for-the-badge&logo=files)
![GitHub directory file count](https://img.shields.io/github/directory-file-count/LauraPontara/portfolio?style=for-the-badge&logo=files)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/LauraPontara/portfolio?style=for-the-badge&color=007ec6&logo=gitkraken)
![GitHub last commit](https://img.shields.io/github/last-commit/LauraPontara/portfolio?style=for-the-badge&logo=clockify)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white)

![Views Counter](https://views-counter.vercel.app/badge?pageId=https%3A%2F%2Fgithub%2Ecom%2FLauraPontara%2Fportfolio&leftColor=555555&rightColor=007ec6&type=total&label=RepoViews)

---

## 📚 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#%EF%B8%8F-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Design System](#-design-system)
- [Protótipos e Wireframes](#%EF%B8%8F-protótipos-e-wireframes)
- [Instalação e Execução](#-instalação-e-execução)
- [Deploy](#-deploy)
- [Roadmap de Desenvolvimento](#-roadmap-de-desenvolvimento)
- [Equipe](#-equipe)
- [Licença](#-licença)
- [Agradecimentos](#-agradecimentos)

---

## 📋 Sobre o Projeto

Este projeto consiste no desenvolvimento de um website de portfólio profissional moderno e responsivo, criado como parte do Laboratório 01 da disciplina de Desenvolvimento de Software. O objetivo é apresentar trajetória, habilidades, projetos e formas de contato de maneira profissional e acessível.

### Objetivos do Sistema

O portfólio é uma aplicação **single-page** com seções acessadas via menu de navegação fixo, com suporte bilíngue **(PT/EN)** e alternância de **tema claro/escuro**:

1. **Hero** — Tela inicial com cena 3D interativa (Spline), apresentação animada com nome e cargo, e banner de texto em velocidade.
2. **Sobre Mim** — Apresentação pessoal em português e inglês, destacando formação, área de atuação, interesses e objetivos profissionais.
3. **Projetos** — Grade de projetos com cards detalhados. Cada projeto contém nome, descrição, tecnologias utilizadas, link para o GitHub, galeria de imagens/vídeos e estatísticas. Página individual de detalhes por slug.
4. **Experiências** — Linha do tempo vertical com experiências profissionais, estágios e atividades. Cada item exibe empresa/instituição, cargo, período e descrição.
5. **Contato** — Formulário funcional com campos de nome, e-mail e mensagem, validação via Zod e envio real por e-mail usando EmailJS. Suporte bilíngue completo.
6. **Tecnologias** — Grade de tags exibindo as principais tecnologias do stack, com ícones coloridos oficiais de cada ferramenta.
7. **Guestbook** — Mural de visitantes com autenticação OAuth via GitHub ou Google (Supabase Auth). Usuários autenticados podem deixar mensagens.
8. **GitHub Stats** — Página dedicada com dados da API do GitHub: perfil, repositórios, linguagens mais usadas, commits recentes e calendário de contribuições.
9. **Design System** — Página interna que documenta os tokens visuais, paleta de cores, tipografia e componentes reutilizáveis do projeto.

---

## ✨ Funcionalidades Principais

- 🌐 **Conteúdo em dois idiomas (PT/EN):** Todas as seções do site traduzidas dinamicamente com toggle de idioma na navbar e no menu mobile.
- 🌗 **Tema Claro/Escuro:** Toggle animado com persistência de preferência do usuário e suporte à preferência do sistema operacional.
- 🎮 **Hero 3D Interativo:** Cena Spline embutida no fundo com animações de entrada e banner de texto em velocidade.
- 👤 **Sobre Mim:** Apresentação pessoal em português e inglês com imagem de perfil e layout responsivo em grid.
- �️ **Seção de Tecnologias:** Grade de tags com ícones coloridos oficiais exibindo as principais ferramentas e linguagens do stack, com suporte bilíngue.
- �🗂️ **Projetos com Galeria:** Grade de projetos com cards, página de detalhes por slug, galeria de mídia com lightbox, tags de tecnologias e links para GitHub e site ao vivo.
- ⏱️ **Timeline de Experiências:** Linha do tempo vertical com ícones por categoria, cards animados.
- 📨 **Formulário de Contato Funcional:** Campos de nome, e-mail e mensagem com validação em tempo real (Zod) e envio real via EmailJS.
- 📖 **Guestbook:** Mural de visitantes com autenticação OAuth via GitHub e Google (Supabase Auth), gerenciado por Server Actions.
- 🐙 **GitHub Stats:** Página com dados da API do GitHub — perfil, repositórios, linguagens, commits e mapa de contribuições.
- 🧭 **Navegação Responsiva:** Navbar fixa com menu dropdown e menu mobile animado, smooth scroll com Lenis + GSAP.
- 🛡️ **Qualidade de Código:** ESLint + Prettier configurados com Husky e lint-staged para verificação automática a cada commit.

---

## 🛠️ Tecnologias Utilizadas

### Core

<p align="left">

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://nextjs.org/" target="_blank">
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
</a>
<span>Framework React para produção com App Router</span>
</div>

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://www.typescriptlang.org/" target="_blank">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
</a>
<span>Superset tipado do JavaScript</span>
</div>

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://react.dev/" target="_blank">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
</a>
<span>Biblioteca para construção de interfaces</span>
</div>

</p>

---

### 🎨 Estilização e UI

<p align="left">

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://tailwindcss.com/" target="_blank">
<img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
</a>
<span>Framework CSS utility-first</span>
</div>

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://ui.shadcn.com/" target="_blank">
<img src="https://img.shields.io/badge/shadcn/ui-111827?style=for-the-badge&logo=shadcnui&logoColor=white"/>
</a>
<span>Componentes reutilizáveis e acessíveis</span>
</div>

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://magicui.design/" target="_blank">
<img src="https://img.shields.io/badge/Magic_UI-7C3AED?style=for-the-badge"/>
</a>
<span>Componentes animados e interativos</span>
</div>

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://www.radix-ui.com/" target="_blank">
<img src="https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radixui&logoColor=white"/>
</a>
<span>Primitivos de UI headless e acessíveis</span>
</div>

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://lucide.dev/" target="_blank">
<img src="https://img.shields.io/badge/Lucide-F56565?style=for-the-badge&logo=lucide&logoColor=white"/>
</a>
<span>Ícones SVG modernos</span>
</div>

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://react-icons.github.io/react-icons/" target="_blank">
<img src="https://img.shields.io/badge/React_Icons-E91E63?style=for-the-badge&logo=react&logoColor=white"/>
</a>
<span>Biblioteca de ícones populares para React</span>
</div>

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://iconify.design/" target="_blank">
<img src="https://img.shields.io/badge/Iconify-1769AA?style=for-the-badge&logo=iconify&logoColor=white"/>
</a>
<span>Ícones coloridos oficiais de marcas e tecnologias</span>
</div>

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://www.npmjs.com/package/next-themes" target="_blank">
<img src="https://img.shields.io/badge/next--themes-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
</a>
<span>Suporte a dark/light mode no Next.js</span>
</div>

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://cva.style/docs" target="_blank">
<img src="https://img.shields.io/badge/CVA-111827?style=for-the-badge"/>
</a>
<span>Gerenciamento de variantes de componentes</span>
</div>

</p>

---

### ✨ Animações

<p align="left">

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://www.framer.com/motion/" target="_blank">
<img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white"/>
</a>
<span>Biblioteca de animações para React</span>
</div>

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://gsap.com/" target="_blank">
<img src="https://img.shields.io/badge/GSAP-00A86B?style=for-the-badge&logo=greensock&logoColor=white"/>
</a>
<span>Biblioteca profissional de animações JavaScript</span>
</div>

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://lenis.darkroom.engineering/" target="_blank">
<img src="https://img.shields.io/badge/Lenis-F56565?style=for-the-badge"/>
</a>
<span>Smooth scroll de alta performance</span>
</div>

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://spline.design/" target="_blank">
<img src="https://img.shields.io/badge/Spline-1D1D1D?style=for-the-badge"/>
</a>
<span>Cenas 3D interativas na web</span>
</div>

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://www.npmjs.com/package/tw-animate-css" target="_blank">
<img src="https://img.shields.io/badge/tw--animate--css-06B6D4?style=for-the-badge"/>
</a>
<span>Animações CSS com Tailwind</span>
</div>

</p>

---

### 🧠 Gerenciamento de Estado

<p align="left">

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://zustand.docs.pmnd.rs/" target="_blank">
<img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge"/>
</a>
<span>Gerenciamento de estado minimalista</span>
</div>

</p>

---

### 🗄 Backend e Dados

<p align="left">

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://supabase.com/" target="_blank">
<img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white"/>
</a>
<span>Backend como serviço (BaaS) com PostgreSQL</span>
</div>

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://zod.dev/" target="_blank">
<img src="https://img.shields.io/badge/Zod-408AFF?style=for-the-badge&logo=zod&logoColor=white"/>
</a>
<span>Validação de schemas TypeScript-first</span>
</div>

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://www.emailjs.com/" target="_blank">
<img src="https://img.shields.io/badge/EmailJS-FF9800?style=for-the-badge"/>
</a>
<span>Envio de e-mails direto do front-end</span>
</div>

</p>

---

### 🧹 Qualidade de Código

<p align="left">

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://eslint.org/" target="_blank">
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"/>
</a>
<span>Linter para identificar problemas no código</span>
</div>

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://prettier.io/" target="_blank">
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black"/>
</a>
<span>Formatador de código</span>
</div>

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://typicode.github.io/husky/" target="_blank">
<img src="https://img.shields.io/badge/Husky-000000?style=for-the-badge"/>
</a>
<span>Git hooks para automação</span>
</div>

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://github.com/okonet/lint-staged" target="_blank">
<img src="https://img.shields.io/badge/lint--staged-000000?style=for-the-badge"/>
</a>
<span>Executa linters em arquivos staged</span>
</div>

</p>

---

### ☁️ Hospedagem

<p align="left">

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:8px;">
<a href="https://vercel.com/" target="_blank">
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
</a>
<span>Plataforma de deploy e hospedagem</span>
</div>

</p>

---

## 📁 Estrutura do Projeto

```
portfolio/
├── /.husky                              # 🐺 Git hooks para automação pré-commit.
├── /docs                                # 📚 Documentação e wireframes do projeto.
│   └── /wireframes                      # 🖼️ Imagens dos protótipos do Figma.
│       ├── Home&Sobre.png
│       ├── Projetos&Tecnologias.png
│       ├── Experiencias.png
│       ├── Contato.png
│       ├── DetalhesProjeto.png
│       └── Guestbook.png
├── /public                              # 📂 Arquivos públicos estáticos.
│   └── /cursors                         # 🖱️ Cursores personalizados.
│       ├── beam.cur
│       ├── link.cur
│       └── pointer.cur
├── /src                                 # 📂 Código-fonte da aplicação.
│   ├── /app                             # 🗺️ App Router do Next.js.
│   │   ├── /(main)                      # 🏠 Grupo de rotas principal.
│   │   │   ├── _headline-section.tsx
│   │   │   └── page.tsx                 # 📄 Página inicial (home).
│   │   ├── /api
│   │   │   └── /contact
│   │   │       └── route.ts             # 📨 Rota de envio de mensagens de contato.
│   │   ├── /auth                        # 🔐 Autenticação via Supabase.
│   │   │   ├── actions.ts
│   │   │   └── /callback
│   │   │       └── route.ts             # 🔄 Callback OAuth do Supabase.
│   │   ├── /design-system
│   │   │   └── page.tsx
│   │   ├── /github
│   │   │   ├── _content.tsx
│   │   │   └── page.tsx
│   │   ├── /guestbook
│   │   │   └── page.tsx
│   │   ├── /projects
│   │   │   └── /[slug]
│   │   │       └── page.tsx             # 🗂️ Página dinâmica de detalhes do projeto.
│   │   ├── favicon.ico
│   │   └── layout.tsx                   # 🧩 Layout principal da aplicação.
│   ├── /components
│   │   ├── /shared                      # 🤝 Componentes compartilhados entre páginas.
│   │   │   ├── /about
│   │   │   │   └── about-image.tsx
│   │   │   ├── /contact
│   │   │   │   ├── contact-form.tsx
│   │   │   │   └── index.ts
│   │   │   ├── /footer
│   │   │   │   ├── footer.tsx
│   │   │   │   └── index.ts
│   │   │   ├── /github
│   │   │   │   └── github-calendar.tsx
│   │   │   ├── /lenis-scroll            # 🌊 Smooth scroll com Lenis + GSAP.
│   │   │   │   └── lenis-provider.tsx
│   │   │   ├── /navbar                  # 🧭 Barra de navegação principal.
│   │   │   │   ├── index.ts
│   │   │   │   ├── language-toggle.tsx
│   │   │   │   ├── mobile-menu.tsx
│   │   │   │   └── navbar.tsx
│   │   │   ├── /project                 # 🗂️ Componentes de card e detalhes de projeto.
│   │   │   │   ├── /gallery             # 🖼️ Galeria de mídia dos projetos.
│   │   │   │   │   ├── GalleryCell.tsx
│   │   │   │   │   ├── GalleryLightbox.tsx
│   │   │   │   │   └── ProjectGallery.tsx
│   │   │   │   ├── index.ts
│   │   │   │   ├── MobileTrio.tsx
│   │   │   │   ├── project-card.tsx
│   │   │   │   ├── ProjectActions.tsx
│   │   │   │   ├── ProjectHero.tsx
│   │   │   │   ├── ProjectInfo.tsx
│   │   │   │   ├── ProjectMedia.tsx
│   │   │   │   ├── projects-grid.tsx
│   │   │   │   └── ProjectStats.tsx
│   │   │   ├── /section                 # 📄 Estrutura base de seção de conteúdo.
│   │   │   │   ├── content-section.tsx
│   │   │   │   ├── section-translations.ts
│   │   │   │   └── techstack.tsx        # 🛠️ Grid de tags de tecnologias.
│   │   │   ├── /spline                  # 🌐 Wrapper para cenas 3D com Spline.
│   │   │   │   ├── index.ts
│   │   │   │   └── spline-wrapper.tsx
│   │   │   ├── /timeline                # ⏱️ Linha do tempo de experiências.
│   │   │   │   ├── index.ts
│   │   │   │   ├── TimelineCard.tsx
│   │   │   │   ├── TimelineExperience.tsx
│   │   │   │   └── TimelineIcon.tsx
│   │   │   ├── /velocity-banner         # 🎞️ Banner animado com texto em velocidade.
│   │   │   │   ├── index.ts
│   │   │   │   └── VelocityBanner.tsx
│   │   │   ├── index.ts
│   │   │   └── theme-provider.tsx       # 🌗 Provider de temas (next-themes).
│   │   └── /ui                          # 🎛️ Componentes de interface (shadcn + Magic UI).
│   │       ├── animated-theme-toggler.tsx
│   │       ├── aurora-text.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── blur-fade.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── iphone.tsx
│   │       ├── label.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── progress.tsx
│   │       ├── safari.tsx
│   │       ├── scroll-based-velocity.tsx
│   │       ├── separator.tsx
│   │       ├── textarea.tsx
│   │       └── timeline.tsx
│   ├── /config
│   │   └── emailjs.config.ts            # ⚙️ Configuração do EmailJS.
│   ├── /constants                       # 📌 Constantes e dados estáticos globais.
│   │   ├── index.ts
│   │   ├── navigation.ts
│   │   ├── projects.ts
│   │   └── stacks.ts                    # 🛠️ Lista de tecnologias com ícones Iconify.
│   ├── /hooks                           # 🎣 Hooks personalizados.
│   │   ├── index.ts
│   │   └── useGalleryVideo.ts
│   ├── /lib                             # 🛠️ Utilitários e integrações externas.
│   │   ├── /supabase                    # 🗄️ Clientes Supabase (browser e servidor).
│   │   │   ├── client.ts
│   │   │   ├── index.ts
│   │   │   └── server.ts
│   │   ├── /utils
│   │   │   └── project-logic.ts
│   │   ├── github.ts                    # 🐙 Integração com a API do GitHub.
│   │   ├── index.ts
│   │   └── utils.ts                     # 🔧 Funções utilitárias (cn, etc.).
│   ├── /store
│   │   └── use-portfolio-store.ts       # 🧠 Estado global com Zustand.
│   ├── /styles
│   │   ├── constants.ts
│   │   └── globals.css                  # 🎨 Estilos globais e tokens CSS.
│   └── /types                           # 📝 Tipos e interfaces TypeScript.
│       ├── experience.d.ts
│       ├── project.d.ts
│       └── supabase.ts
├── /supabase                            # 🗃️ Configuração e migrações do Supabase local.
│   ├── /migrations                      # 📜 Scripts de migração do banco de dados.
│   │   └── 20260225000558_add_rls_policies.sql
│   ├── /schema                          # 🏗️ Definição do schema do banco de dados.
│   │   ├── 01_guests.sql
│   │   └── 02_messages.sql
│   └── config.toml
├── .gitignore                           # 🧹 Ignora arquivos não versionados.
├── .prettierrc                          # 🎨 Configuração do Prettier.
├── components.json                      # 🧩 Configuração do Shadcn UI.
├── eslint.config.mjs                    # ✨ Regras de linting do ESLint.
├── next.config.ts                       # ⚙️ Configuração do Next.js.
├── next-env.d.ts                        # 📝 Tipos gerados pelo Next.js.
├── package.json                         # 📦 Dependências e scripts do projeto.
├── postcss.config.mjs                   # 🎨 Configuração do PostCSS.
├── tsconfig.json                        # 🔷 Configuração do TypeScript.
└── README.md                            # 📘 Documentação principal do projeto.
```

---

## 🎨 Design System

O projeto utiliza um design system customizado com suporte a **tema claro e escuro**, implementando:

- **Paleta de Cores Dinâmica:** Tokens CSS personalizados para cores de brand, accent e sistema
- **Tipografia:** Combinação de Outfit (sans-serif) e Cormorant Infant (serif itálico)
- **Componentes Reutilizáveis:** Biblioteca baseada em Shadcn UI com customizações
- **Responsividade:** Mobile-first com breakpoints otimizados
- **Acessibilidade:** Componentes seguem padrões WCAG

## 🖼️ Protótipos e Wireframes

### Wireframes de Média Fidelidade

#### Homepage (Página Principal)

A homepage é uma página única com scroll contendo todas as seções principais:

**Hero Section + Sobre Mim:**

![Wireframe - Hero e Sobre Mim](./docs/wireframes/Home&Sobre.png)

**Seção de Projetos:**

![Wireframe - Seção de Projetos](./docs/wireframes/Projetos&Tecnologias.png)

**Seção de Experiências:**

![Wireframe - Seção de Experiências](./docs/wireframes/Experiencias.png)

**Seção de Contato:**

![Wireframe - Formulário de Contato](./docs/wireframes/Contato.png)

**Página de Detalhes do Projeto:**

![Wireframe - Detalhes do Projeto](./docs/wireframes/DetalhesProjeto.png)

**Página Guestbook:**

![Wireframe - Guestbook](./docs/wireframes/Guestbook.png)

---

## 🚀 Instalação e Execução

### Pré-requisitos

- **Node.js** 20.x ou superior
- **npm**, **yarn**, **pnpm** ou **bun**
- Git

### Passos para Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com//portfolio.git
   cd portfolio
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   # ou
   bun install
   ```

3. **Configure as variáveis de ambiente:**

   ```bash
   cp .env.example .env.local
   ```

   Preencha as variáveis necessárias:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=sua-url-supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-key-supabase
   ```

4. **Execute o servidor de desenvolvimento:**

   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   # ou
   bun dev
   ```

   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   # ou
   bun dev
   ```

5. **Acesse no navegador:**
   ```
   http://localhost:3000
   ```

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa o linter
- `npm run prepare` - Configura Husky hooks
 
### Infraestrutura local (Supabase, OAuth, Webhooks, Testes Deno)

O repositório inclui documentação detalhada sobre como configurar e rodar o ambiente de backend local (Supabase CLI, migrações, OAuth providers, Discord Webhook e testes das Edge Functions com Deno). Veja `docs/infrastructure.md` para passos completos e recomendações de segurança.

Comandos úteis rápidos (executar no root do repositório):

```bash
# autenticar o Supabase CLI
npx supabase login

# vincular ao projeto remoto
npx supabase link --project-ref <id-do-projeto>

# iniciar ambiente local (docker)
npx supabase start

# resetar banco local e aplicar migrations
npx supabase db reset

# rodar testes Deno para as Edge Functions
deno test --allow-all --env-file=.env.test supabase/functions/tests/create-message_test.ts
```

Notas: não versionar credenciais; use `supabase secrets` ou variáveis de ambiente (`.env.local`, `.env.test`).

---

## 🌐 Deploy

O projeto está configurado para deploy automático na **Vercel**. Cada push para a branch `main` dispara um novo deploy.

### Link de Acesso

🔗 **[Em desenvolvimento - Link será disponibilizado na Sprint 2]**

---

## 📅 Roadmap de Desenvolvimento

### ✅ Sprint 1 (Lab01S01) - Planejamento e Prototipação - 4 pontos

**Status:** Concluída

**Entregas:**

- [x] Criação do repositório GitHub com README inicial
- [x] Wireframes das páginas no Figma (média fidelidade)
- [x] Protótipo inicial do front-end com Next.js e TypeScript
- [x] Implementação da navegação (navbar fixa, menu mobile, links entre seções)
- [x] Layout principal (cabeçalho, rodapé e área de conteúdo)
- [x] Theme switcher animado (dark/light mode com next-themes)
- [x] Design system base (tokens CSS, tipografia, paleta de cores)
- [x] Configuração de ferramentas de qualidade (ESLint, Prettier, Husky, lint-staged)
- [x] Internacionalização PT/EN com Zustand
- [x] Hero section com cena Spline 3D e VelocityBanner
- [x] Smooth scroll com Lenis + GSAP ScrollTrigger

**Resultado:** README com imagens dos protótipos, descrição do projeto, tecnologias previstas e estrutura inicial do site.

---

### ✅ Sprint 2 (Lab01S02) - Implementação das Funcionalidades Principais - 4 pontos

**Status:** Concluída

**Entregas:**

- [x] Seção "Sobre Mim" com versões em português e inglês
- [x] Seção "Tecnologias"
- [x] Seção "Projetos" com grade de cards e página de detalhes por slug
- [x] Galeria de mídia com lightbox e suporte a vídeo
- [x] Seção "Experiências" com timeline vertical animada
- [x] Seção "Contato" com formulário funcional (EmailJS) e validação Zod
- [x] Guestbook com autenticação OAuth (GitHub e Google) via Supabase
- [x] Página de GitHub Stats integrada com a API REST do GitHub
- [x] Validações bilíngues e responsividade em todas as seções

**Resultado:** Versão funcional local com todas as seções do enunciado implementadas.

---

### ✅ Sprint 3 (Lab01S03) - Hospedagem e Finalização do Sistema - 7 pontos

**Status:** Concluída

**Entregas:**

- [x] Deploy completo na Vercel
- [x] Ajustes visuais e de usabilidade finais
- [x] Inserção de imagens/GIFs reais dos projetos em execução
- [x] Guestbook implementado com Supabase Auth
- [x] Tecnologias documentadas no README
- [x] Link para o site publicado
- [x] Instruções de instalação e execução local no README

**Resultado:** Sistema hospedado e funcional com documentação completa.

## 👥 Equipe

| 👤 Nome          | 🖼️ Foto                                                                                                                         | :octocat: GitHub                                                                                                                                                    | 💼 LinkedIn                                                                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Eric Leal        | <div align="center"><img src="https://github.com/Eric-Leal.png" width="70px" height="70px" style="object-fit: cover;"></div>    | <div align="center"><a href="https://github.com/Eric-Leal"><img src="https://joaopauloaramuni.github.io/image/github6.png" width="50px" height="50px"></a></div>    | <div align="center"><a href="https://linkedin.com/in/ericgleal"><img src="https://joaopauloaramuni.github.io/image/linkedin2.png" width="50px" height="50px"></a></div>           |
| Giuliano Percope | <div align="center"><img src="https://github.com/GiulianoLBP.png" width="70px" height="70px" style="object-fit: cover;"></div>  | <div align="center"><a href="https://github.com/GiulianoLBP"><img src="https://joaopauloaramuni.github.io/image/github6.png" width="50px" height="50px"></a></div>  | <div align="center"><a href="https://linkedin.com/in/giuliano-lb-percope"><img src="https://joaopauloaramuni.github.io/image/linkedin2.png" width="50px" height="50px"></a></div> |
| Laura Pontara    | <div align="center"><img src="https://github.com/LauraPontara.png" width="70px" height="70px" style="object-fit: cover;"></div> | <div align="center"><a href="https://github.com/LauraPontara"><img src="https://joaopauloaramuni.github.io/image/github6.png" width="50px" height="50px"></a></div> | <div align="center"><a href="https://linkedin.com/in/laura-pontara"><img src="https://joaopauloaramuni.github.io/image/linkedin2.png" width="50px" height="50px"></a></div>       |

---

## 📝 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte do Laboratório de Desenvolvimento de Software da PUC Minas.

---

## 🙏 Agradecimentos

- Professor João Paulo Carneiro Aramuni pela orientação e ensinamentos
