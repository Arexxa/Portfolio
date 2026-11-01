import type { Project } from '@/types/content'

const MAX_FILTERS = 6

/** The most frequent tags across projects, used as filter chips. */
export function getFilterTags(projects: readonly Project[]): string[] {
  const counts = new Map<string, number>()
  for (const project of projects) {
    for (const tag of project.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_FILTERS)
    .map(([tag]) => tag)
}

/** Every distinct tag, in first-seen order. */
export function getAllTags(projects: readonly Project[]): string[] {
  return [...new Set(projects.flatMap((project) => project.tags))]
}

/** Case-insensitive lookup of a tag's canonical spelling. */
export function resolveTag(projects: readonly Project[], input: string): string | null {
  const needle = input.toLowerCase()
  return getAllTags(projects).find((tag) => tag.toLowerCase() === needle) ?? null
}

export function filterProjects(
  projects: readonly Project[],
  tag: string | null,
): readonly Project[] {
  return tag ? projects.filter((project) => project.tags.includes(tag)) : projects
}

export function findProject(projects: readonly Project[], id: string): Project | undefined {
  return projects.find((project) => project.id === id.toLowerCase())
}
