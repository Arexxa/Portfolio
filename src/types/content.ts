export type SectionId = 'hero' | 'about' | 'experience' | 'skills' | 'projects' | 'contact'

/** Sections that are planets and open a glass panel. */
export type PlanetId = Exclude<SectionId, 'hero'>

export interface SectionMeta {
  id: PlanetId
  number: string
  title: string
  eyebrow: string
  blurb: string
  cta: string
}

export interface SiteConfig {
  name: string
  shortName: string
  role: string
  tagline: string
  description: string
  url: string
  email: string
  phone: string
  location: { locality: string; region: string; country: string }
  resumePath: string
  ogImage: string
  keywords: string[]
}

export interface Social {
  id: string
  label: string
  href: string
}

export interface Education {
  degree: string
  school: string
  period: string
  result: string
}

export interface Certification {
  name: string
  issuer: string
  year: string
}

export interface AboutContent {
  summary: string[]
  facts: { label: string; value: string }[]
  education: Education[]
  certifications: Certification[]
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  scope: string
  highlights: string[]
  stack: string[]
}

export interface SkillGroup {
  id: string
  label: string
  skills: string[]
}

export interface ProjectLink {
  label: string
  href: string
}

export interface ProjectImage {
  src: string
  width: number
  height: number
}

export interface Project {
  id: string
  title: string
  role: string
  period?: string
  summary: string
  highlights: string[]
  tags: string[]
  links: ProjectLink[]
  images: ProjectImage[]
  /** Moon color as CSS hex; used by the 3D layer and preview card accent. */
  color: string
}
