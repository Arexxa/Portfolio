import projectOasis1 from '@/assets/img/projects/projectoasis-1.webp'
import projectOasis2 from '@/assets/img/projects/projectoasis-2.webp'
import projectOasis3 from '@/assets/img/projects/projectoasis-3.webp'
import nverse1 from '@/assets/img/projects/nverse-1.webp'
import nverse2 from '@/assets/img/projects/nverse-2.webp'
import kings1 from '@/assets/img/projects/twelvekings-1.webp'
import kings2 from '@/assets/img/projects/twelvekings-2.webp'
import oasisLab1 from '@/assets/img/projects/oasislab-1.webp'
import oasisLab2 from '@/assets/img/projects/oasislab-2.webp'
import skin1 from '@/assets/img/projects/skingenerator-1.webp'
import skin2 from '@/assets/img/projects/skingenerator-2.webp'
import kejehub1 from '@/assets/img/projects/kejehub-1.webp'
import kejehub2 from '@/assets/img/projects/kejehub-2.webp'
import kejehub3 from '@/assets/img/projects/kejehub-3.webp'
import kejehub4 from '@/assets/img/projects/kejehub-4.webp'
import codebtech1 from '@/assets/img/projects/codebtech-1.webp'
import codebtech2 from '@/assets/img/projects/codebtech-2.webp'
import meme1 from '@/assets/img/projects/worldofmeme-1.webp'
import meme2 from '@/assets/img/projects/worldofmeme-2.webp'
import { COLORS } from '@/lib/constants'
import type { Project, ProjectImage } from '@/types/content'

const shot = (src: string, height: number, width = 960): ProjectImage => ({ src, width, height })

/**
 * CUSTOMIZE: projects. The first MOON.maxOrbiting entries orbit the Projects planet,
 * every entry appears in the panel grid. Add screenshots to src/assets/img/projects.
 */
export const projects: readonly Project[] = [
  {
    id: 'kejehub',
    title: 'KejeHub',
    role: 'Software Developer',
    period: 'Jan 2025 - Aug 2025',
    summary: 'React 18 SaaS platform with e-Invoice submission through the LHDN API.',
    highlights: [
      'Role-based access, JWT auth, permission-based routing and dynamic menus.',
      'Reusable tables, forms and charts with Material UI and ApexCharts; data via SWR.',
    ],
    tags: ['React', 'Vite', 'Material UI', 'SWR', 'JWT'],
    links: [{ label: 'Live site', href: 'https://kejehub.com/' }],
    images: [shot(kejehub1, 499), shot(kejehub2, 492), shot(kejehub3, 562), shot(kejehub4, 729)],
    color: COLORS.ember,
  },
  {
    id: 'codebtech',
    title: 'Codebase Technology',
    role: 'Web Developer',
    period: 'Sep 2024 - May 2025',
    summary: 'Corporate website for a Dubai-based company, built in WordPress from Figma designs.',
    highlights: [
      'Translated Figma designs into responsive, production-ready pages with Elementor and Elementor Pro.',
      'Built structured, dynamic content systems with Crocoblock so content is easy to manage.',
      'Optimised load speed with NitroPack and tuned layouts for desktop, tablet and mobile.',
      'Handled ongoing maintenance, plugin selection and configuration, and troubleshooting.',
    ],
    tags: ['WordPress', 'Elementor', 'Crocoblock', 'NitroPack', 'Figma'],
    links: [{ label: 'Live site', href: 'https://www.codebtech.com/' }],
    images: [shot(codebtech1, 480), shot(codebtech2, 483)],
    color: COLORS.violet,
  },
  {
    id: 'world-of-meme',
    title: 'World of Meme',
    role: 'Software Developer',
    period: 'Jul 2024 - Aug 2024',
    summary: 'Interactive Web3 website translated from Figma with a Node/Express backend.',
    highlights: [
      'Animated React and Tailwind frontend with REST integration to MySQL.',
      'Deployed to Vercel (frontend) and Railway (backend).',
    ],
    tags: ['React', 'Express', 'MySQL', 'Vercel'],
    links: [],
    images: [shot(meme1, 566, 559), shot(meme2, 409, 553)],
    color: COLORS.cyan,
  },
  {
    id: 'project-oasis',
    title: 'Project Oasis',
    role: 'Frontend / Game Developer',
    summary: 'A gamified metaverse integrating Web3 into a 2D virtual ecosphere.',
    highlights: [
      'Turned designs into interactive code with Phaser 3 and TypeScript.',
      'Worked on 2D game development and wallet integration with Web3.js.',
    ],
    tags: ['Phaser 3', 'TypeScript', 'Web3.js'],
    links: [{ label: 'Live site', href: 'https://game.projectoasis.io/' }],
    images: [shot(projectOasis1, 464), shot(projectOasis2, 502), shot(projectOasis3, 455)],
    color: COLORS.cyan,
  },
  {
    id: 'nverse',
    title: 'Nverse Labs',
    role: 'Frontend Developer',
    summary: 'Marketing site for a company building the future of digital asset ownership.',
    highlights: [
      'Translated the design into a responsive React website.',
      'Collaborated in a team across desktop and mobile layouts.',
    ],
    tags: ['React', 'Responsive'],
    links: [{ label: 'Live site', href: 'https://www.nverselabs.io/' }],
    images: [shot(nverse1, 469), shot(nverse2, 505)],
    color: COLORS.violet,
  },
  {
    id: 'twelve-kings',
    title: '12 Kings',
    role: 'Frontend Developer',
    summary: 'Web3-enabled website for a well-known Feng Shui master.',
    highlights: [
      'Implemented the design with React in a team environment.',
      'Integrated Web3 wallets using Web3.js.',
    ],
    tags: ['React', 'Web3.js', 'Wallet'],
    links: [{ label: 'Live site', href: 'https://the12kings.com/' }],
    images: [shot(kings1, 467), shot(kings2, 499)],
    color: COLORS.ember,
  },
  {
    id: 'oasis-labs',
    title: 'Oasis Labs',
    role: 'Frontend Developer',
    summary: 'Company website presenting expertise and services.',
    highlights: ['Built the interface with React as part of a development team.'],
    tags: ['React'],
    links: [{ label: 'Live site', href: 'https://oasislabs.tech/' }],
    images: [shot(oasisLab1, 454), shot(oasisLab2, 419)],
    color: COLORS.cyan,
  },
  {
    id: 'skin-generator',
    title: 'Skin Generator',
    role: 'Frontend Developer',
    summary: 'Automated skin generator for Project Oasis characters.',
    highlights: [
      'Merges uploaded character part images into one skin.',
      'Handles image processing and blob conversion in React.',
    ],
    tags: ['React', 'Image processing'],
    links: [],
    images: [shot(skin1, 413), shot(skin2, 581)],
    color: COLORS.violet,
  },
  {
    id: 'aqua-detect',
    title: 'Aqua Detect IoT',
    role: 'Machine Learning Developer',
    period: 'Aug 2022 - Jan 2023',
    summary: 'CNN model that classifies prawn type, gender and body measurements.',
    highlights: [
      'Reached 83% accuracy after image preprocessing and Roboflow annotation.',
      'Flask GUI for uploading images and real-time prediction.',
    ],
    tags: ['Python', 'TensorFlow', 'OpenCV', 'Flask'],
    links: [],
    images: [],
    color: COLORS.violet,
  },
  {
    id: 'solvnex',
    title: 'Solvnex System',
    role: 'Frontend Developer',
    period: 'Jan 2022 - Feb 2022',
    summary: 'Vue.js and Quasar system integration for PETRONAS.',
    highlights: ['Contributed to a team-built system with consistent, responsive UI.'],
    tags: ['Vue.js', 'Quasar', 'Tailwind CSS'],
    links: [],
    images: [],
    color: COLORS.ember,
  },
]
