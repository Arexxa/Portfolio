import { about } from '@/data/about'
import { experience } from '@/data/experience'
import { projects } from '@/data/projects'
import { site } from '@/data/site'
import { skillGroups } from '@/data/skills'
import { socials } from '@/data/socials'
import { requestContactFocus } from '@/features/contact/contactFocus'
import { findProject, getAllTags, resolveTag } from '@/features/projects/projectUtils'
import { completions, suggest } from '@/features/terminal/suggest'
import type { Command, TerminalOutput } from '@/features/terminal/types'

const PROJECT_IDS = projects.map((project) => project.id)
const TAGS = getAllTags(projects)

const muted = (text: string): TerminalOutput => ({ kind: 'text', text, tone: 'muted' })
const error = (text: string): TerminalOutput => ({ kind: 'text', text, tone: 'error' })
const jumping = (file: string) => muted(`-> opening ~/${file}`)

/** Commands that print a summary from /data and jump to the matching section. */
export const contentCommands: Command[] = [
  {
    name: 'about',
    usage: 'about',
    summary: 'Who I am',
    section: 'about',
    run: (_, ctx) => {
      ctx.navigate('about')
      return [
        { kind: 'text', text: about.summary[0] ?? '' },
        { kind: 'table', rows: about.facts.map((fact) => [fact.label, fact.value] as const) },
        jumping('about.md'),
      ]
    },
  },
  {
    name: 'experience',
    usage: 'experience',
    summary: 'Work history',
    section: 'experience',
    run: (_, ctx) => {
      ctx.navigate('experience')
      return [
        {
          kind: 'table',
          rows: experience.map((job) => [job.period, `${job.role} @ ${job.company}`] as const),
        },
        jumping('experience.log'),
      ]
    },
  },
  {
    name: 'skills',
    usage: 'skills',
    summary: 'Installed modules',
    section: 'skills',
    run: (_, ctx) => {
      ctx.navigate('skills')
      return [
        {
          kind: 'table',
          rows: skillGroups.map((group) => [group.label, group.skills.join(', ')] as const),
        },
        jumping('modules/'),
      ]
    },
  },
  {
    name: 'projects',
    usage: 'projects [tag]',
    summary: 'List projects, optionally filtered by tech',
    section: 'projects',
    complete: (partial) => completions(partial, TAGS),
    run: ([input], ctx) => {
      const tag = input ? resolveTag(projects, input) : null
      if (input && !tag) {
        const hint = suggest(
          input,
          TAGS.map((value) => value.toLowerCase()),
        )
        return [error(`no projects tagged "${input}".${hint ? ` did you mean \`${hint}\`?` : ''}`)]
      }
      ctx.filterProjects(tag)
      ctx.navigate('projects')
      const list = tag ? projects.filter((project) => project.tags.includes(tag)) : projects
      return [
        { kind: 'table', rows: list.map((project) => [project.id, project.summary] as const) },
        muted(`${list.length} window(s)${tag ? ` tagged ${tag}` : ''}. \`open <id>\` for details.`),
      ]
    },
  },
  {
    name: 'open',
    usage: 'open <project-id>',
    summary: 'Open a project window',
    complete: (partial) => completions(partial, PROJECT_IDS),
    run: ([id], ctx) => {
      if (!id) return [error('usage: open <project-id>'), muted(`ids: ${PROJECT_IDS.join(', ')}`)]
      const project = findProject(projects, id)
      if (!project) {
        const hint = suggest(id, PROJECT_IDS)
        return [error(`no project "${id}".${hint ? ` did you mean \`${hint}\`?` : ''}`)]
      }
      ctx.navigate('projects')
      ctx.openProject(project.id)
      return [{ kind: 'text', text: `opening ${project.title}`, tone: 'success' }]
    },
  },
  {
    name: 'contact',
    usage: 'contact',
    summary: 'Ways to reach me',
    section: 'contact',
    run: (_, ctx) => {
      ctx.navigate('contact', requestContactFocus())
      return [
        { kind: 'link', label: site.email, href: `mailto:${site.email}` },
        { kind: 'text', text: site.phone },
        muted('-> contact form focused. Type your message there.'),
      ]
    },
  },
  {
    name: 'socials',
    usage: 'socials',
    summary: 'Profiles elsewhere',
    run: () =>
      socials.map((social) => ({
        kind: 'link',
        label: `${social.label}: ${social.handle}`,
        href: social.href,
        external: true,
      })),
  },
  {
    name: 'whoami',
    usage: 'whoami',
    summary: 'Identity',
    run: () => [
      {
        kind: 'table',
        rows: [
          ['name', site.name],
          ['role', site.role],
          ['location', `${site.location.locality}, ${site.location.region}, Malaysia`],
        ],
      },
    ],
  },
  {
    name: 'resume',
    usage: 'resume',
    summary: 'Download my resume (PDF)',
    run: (_, ctx) => {
      ctx.downloadResume()
      return [
        { kind: 'text', text: 'download started.', tone: 'success' },
        {
          kind: 'link',
          label: 'not working? open the PDF',
          href: site.resumePath,
          download: site.resumeFileName,
        },
      ]
    },
  },
]
