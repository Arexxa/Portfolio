import { env } from '@/lib/env'
import type { SiteConfig } from '@/types/content'

/**
 * CUSTOMIZE: core identity, contact details and SEO strings.
 * index.html holds static copies of name/role/description/URLs; keep them in sync.
 */
export const site: SiteConfig = {
  name: 'Shahrulnizam bin Ibrahim',
  shortName: 'Shahrulnizam',
  osName: 'SHAHRUL.OS',
  role: 'Senior Software Developer',
  tagline:
    'Full-stack engineer shipping fast, resilient web products and the data pipelines behind them.',
  description:
    'Portfolio of Shahrulnizam bin Ibrahim, a Senior Software Developer specialising in React, Next.js, Node.js and data engineering. Boot the terminal to explore experience, skills and projects.',
  url: env.siteUrl || 'https://shahrulnizam-portfolio.vercel.app',
  email: 'shahrulofficial12@gmail.com',
  phone: '+6011-33314120',
  location: { locality: 'Segamat', region: 'Johor', country: 'MY' },
  resumePath: '/resume.pdf',
  resumeFileName: 'Shahrulnizam-Ibrahim-Resume.pdf',
  ogImage: '/og-image.png',
}
