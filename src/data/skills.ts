import type { SkillGroup } from '@/types/content'

/** CUSTOMIZE: skill groups shown on the Skills planet. */
export const skillGroups: readonly SkillGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      'React',
      'Next.js',
      'JavaScript',
      'TypeScript',
      'Vue.js',
      'Quasar',
      'Angular',
      'Tailwind CSS',
      'Material UI',
      'ApexCharts',
    ],
  },
  {
    id: 'backend',
    label: 'Backend & Data',
    skills: [
      'Node.js',
      'Express.js',
      'ASP.NET Core',
      'MSSQL',
      'MySQL',
      'Prisma',
      'REST APIs',
      'ETL pipelines',
      'Power BI',
    ],
  },
  {
    id: 'web3',
    label: 'Web3 & Games',
    skills: ['Phaser 3', 'Web3.js', 'MetaMask', 'Web3Auth', 'Wallet integration'],
  },
  {
    id: 'cloud',
    label: 'Cloud & Tools',
    skills: [
      'AWS (Solutions Architect)',
      'Azure Blob Storage',
      'Vercel',
      'Railway',
      'Git',
      'Figma',
      'WordPress',
      'Docker',
    ],
  },
  {
    id: 'ml',
    label: 'Machine Learning',
    skills: ['Python', 'TensorFlow / Keras', 'OpenCV', 'Flask', 'Roboflow'],
  },
]
