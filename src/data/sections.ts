import type { PlanetId, SectionMeta } from '@/types/content'

/** CUSTOMIZE: copy shown next to each planet and in the navigation. Order = flight order. */
export const sections: readonly SectionMeta[] = [
  {
    id: 'about',
    number: '01',
    title: 'About',
    eyebrow: 'Planet Origin',
    blurb: 'Who is flying this ship: background, education and certifications.',
    cta: 'Land on About',
  },
  {
    id: 'experience',
    number: '02',
    title: 'Experience',
    eyebrow: 'Ringed World',
    blurb: 'Four years of shipping products across enterprise, SaaS and Web3.',
    cta: 'Explore Experience',
  },
  {
    id: 'skills',
    number: '03',
    title: 'Skills',
    eyebrow: 'Ember Forge',
    blurb: 'The toolkit: frontend, backend, data pipelines, Web3 and cloud.',
    cta: 'Open the Toolkit',
  },
  {
    id: 'projects',
    number: '04',
    title: 'Projects',
    eyebrow: 'Moon System',
    blurb: 'Each moon is a project. Hover to preview, click to dive in.',
    cta: 'Visit the Moons',
  },
  {
    id: 'contact',
    number: '05',
    title: 'Contact',
    eyebrow: 'Signal Station',
    blurb: 'Send a signal. Say hello, pitch a project or grab the resume.',
    cta: 'Send a Signal',
  },
]

export const sectionById: Record<PlanetId, SectionMeta> = Object.fromEntries(
  sections.map((section) => [section.id, section]),
) as Record<PlanetId, SectionMeta>

export const isPlanetId = (value: string): value is PlanetId => value in sectionById
