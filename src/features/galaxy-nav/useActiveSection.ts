import { useEffect, useState } from 'react'
import { sectionDomId } from '@/features/galaxy-nav/usePanelNavigation'
import { sections } from '@/data/sections'
import type { SectionId } from '@/types/content'

const IDS: readonly SectionId[] = ['hero', ...sections.map((section) => section.id)]

/** Which flight stop is centered in the viewport (updates only when it changes). */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const id = IDS.find((candidate) => sectionDomId(candidate) === entry.target.id)
          if (id) setActive(id)
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    IDS.forEach((id) => {
      const element = document.getElementById(sectionDomId(id))
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  return active
}
