import { env } from '@/lib/env'
import type { SiteConfig } from '@/types/content'

/** CUSTOMIZE: core identity, contact details and SEO strings. */
export const site: SiteConfig = {
  name: 'Shahrulnizam bin Ibrahim',
  shortName: 'Shahrulnizam',
  role: 'Senior Software Developer',
  tagline: 'Full-stack engineer building fast, resilient web products and data pipelines.',
  description:
    'Portfolio of Shahrulnizam bin Ibrahim, a Senior Software Developer specialising in React, Next.js, Node.js and data engineering. Fly through an interactive 3D galaxy of experience, skills and projects.',
  url: env.siteUrl || 'https://shahrulnizam-portfolio.vercel.app',
  email: 'shahrulofficial12@gmail.com',
  phone: '+6011-33314120',
  location: { locality: 'Segamat', region: 'Johor', country: 'MY' },
  resumePath: '/resume.pdf',
  ogImage: '/og-image.png',
  keywords: [
    'Shahrulnizam',
    'Senior Software Developer',
    'React',
    'Next.js',
    'Node.js',
    'Full-stack',
    'Web3',
    'Malaysia',
  ],
}
