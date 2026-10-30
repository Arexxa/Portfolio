import { PLANETS } from '@/lib/constants'
import type { PlanetId } from '@/types/content'

interface PlanetOrbProps {
  id: PlanetId
}

/** CSS-only planet used when WebGL is unavailable or the device tier is low. */
export function PlanetOrb({ id }: PlanetOrbProps) {
  const planet = PLANETS.find((candidate) => candidate.id === id)
  if (!planet) return null
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none mx-auto size-40 rounded-full sm:size-56 lg:absolute lg:top-1/2 lg:size-80 lg:-translate-y-1/2"
      style={{
        background: `radial-gradient(circle at 30% 28%, ${planet.accent}, ${planet.base} 62%, #000 100%)`,
        boxShadow: `0 0 80px -10px ${planet.atmosphere}88, inset -20px -20px 60px #000a`,
      }}
    />
  )
}
