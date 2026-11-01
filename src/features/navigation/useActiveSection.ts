import { useEffect, useState } from 'react'
import { sections } from '@/data/sections'
import type { SectionId } from '@/types/content'

const IDS: SectionId[] = ['hero', ...sections.map((section) => section.id)]

/** The section crossing the middle band of the viewport, for nav `aria-current`. */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting)
        if (hit) setActive(hit.target.id as SectionId)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    IDS.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  return active
}
