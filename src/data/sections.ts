import type { ContentSectionId, SectionMeta } from '@/types/content'

/** CUSTOMIZE: section copy, window file names and order (= page order and nav order). */
export const sections: readonly SectionMeta[] = [
  {
    id: 'about',
    number: '01',
    title: 'About',
    file: 'about.md',
    status: 'RO',
    blurb: 'Operator profile: background, education and certifications.',
    icon: 'user',
  },
  {
    id: 'experience',
    number: '02',
    title: 'Experience',
    file: 'experience.log',
    status: 'APPEND',
    blurb: 'Four years of commits across enterprise, SaaS and Web3 teams. Newest first.',
    icon: 'log',
  },
  {
    id: 'skills',
    number: '03',
    title: 'Skills',
    file: 'modules/',
    status: 'LOADED',
    blurb: 'Installed modules: frontend, backend and data, Web3, cloud and ML.',
    icon: 'chip',
  },
  {
    id: 'projects',
    number: '04',
    title: 'Projects',
    file: 'projects/',
    status: 'RUNNING',
    blurb:
      'Each project runs in its own window. Drag them around, filter by stack, open for details.',
    icon: 'grid',
  },
  {
    id: 'contact',
    number: '05',
    title: 'Contact',
    file: 'contact.sh',
    status: 'LISTENING',
    blurb: 'Open a channel. Say hello, pitch a project or grab the resume.',
    icon: 'mail',
  },
]

export const sectionById = Object.fromEntries(
  sections.map((section) => [section.id, section]),
) as Record<ContentSectionId, SectionMeta>
