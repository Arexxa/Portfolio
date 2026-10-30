import type { ExperienceItem } from '@/types/content'

/** CUSTOMIZE: work history, newest first. */
export const experience: readonly ExperienceItem[] = [
  {
    id: 'petronas',
    role: 'Senior Software Developer',
    company: 'PETRONAS',
    period: 'Jul 2025 - Oct 2026',
    scope: 'Full-Stack Developer',
    highlights: [
      'Built scalable, reusable application components with Next.js.',
      'Designed MSSQL databases and Node.js ETL pipelines for large-dataset extraction, transformation and migration.',
      'Delivered RAW to SILVER data workflows with testing, validation and Power BI integration.',
      'Implemented Azure Storage Blob extraction workflows and supported production deployments.',
    ],
    stack: ['Next.js', 'Node.js', 'MSSQL', 'Azure Blob', 'Power BI', 'ETL', 'REST API'],
  },
  {
    id: 'shopopx',
    role: 'Software Developer',
    company: 'ShopOpx Sdn Bhd',
    period: 'Nov 2024 - Jul 2025',
    scope: 'Full-Stack Developer',
    highlights: [
      'Structured reusable Vue.js and Quasar components with Vuex state management.',
      'Built responsive interfaces and integrated REST APIs with Axios.',
      'Developed ASP.NET Core (C#) APIs backed by MySQL.',
    ],
    stack: ['Vue.js', 'Quasar', 'Vuex', 'Tailwind CSS', 'ASP.NET Core', 'MySQL'],
  },
  {
    id: 'consurv',
    role: 'Software Developer',
    company: 'Consurv Technic (M) Sdn Bhd',
    period: 'May 2024 - Sep 2024',
    scope: 'Frontend Web Developer',
    highlights: [
      'Enhanced the Petronas Digital Upstream project across frontend and backend.',
      'Built responsive UIs with React, Next.js, Tailwind CSS and ShadCN UI.',
      'Managed data access with Prisma ORM.',
    ],
    stack: ['React', 'Next.js', 'Tailwind CSS', 'ShadCN UI', 'Prisma'],
  },
  {
    id: 'syntronic',
    role: 'Software Developer',
    company: 'Syntronic Malaysia Sdn Bhd (for TM R&D)',
    period: 'Apr 2023 - Apr 2024',
    scope: 'Frontend Developer',
    highlights: [
      'Maintained the FORCE project and migrated charts from Webix to ApexCharts.',
      'Designed the Angular architecture for FORCE - Supervisor with reusable Material UI components.',
      'Optimised AJAX integration with backend teams.',
    ],
    stack: ['Angular', 'Webix.js', 'ApexCharts', 'Material UI', 'AJAX'],
  },
  {
    id: 'goshare',
    role: 'Analyst Programmer',
    company: 'GoShare Sdn Bhd',
    period: 'Aug 2022 - Mar 2023',
    scope: 'Web3 / Blockchain / Frontend Developer',
    highlights: [
      'Integrated the Project Oasis blockchain game using React, Phaser 3 and TypeScript.',
      'Added MetaMask, Web3Auth, Phantom and Sequence wallet authentication.',
      'Built the Skin Generator that merges uploaded character parts into a single skin.',
    ],
    stack: ['React', 'TypeScript', 'Phaser 3', 'Web3Auth', 'MetaMask', 'Tailwind CSS'],
  },
  {
    id: 'digital-cultivation',
    role: 'Frontend Web Developer (Intern)',
    company: 'Digital Cultivation Sdn Bhd',
    period: 'Mar 2022 - Aug 2022',
    scope: 'Manufacturing Enterprise System and Babble dApp',
    highlights: [
      'Built a Vue.js MES that integrated IoT into a food factory line and improved QA by 100%.',
      'Developed Babble, a Web3 chat dApp with MetaMask authentication.',
    ],
    stack: ['Vue.js', 'React', 'Tailwind CSS', 'MetaMask', 'IoT'],
  },
]
