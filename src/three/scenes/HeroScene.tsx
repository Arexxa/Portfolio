import { lazy, Suspense, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { FOG } from '@/lib/constants'
import { useMouseParallax } from '@/three/hooks/useMouseParallax'
import { useThemeColors } from '@/three/hooks/useThemeColors'
import { CameraRig } from '@/three/objects/CameraRig'
import { DataParticles } from '@/three/objects/DataParticles'
import { GridFloor } from '@/three/objects/GridFloor'
import { HorizonTerrain } from '@/three/objects/HorizonTerrain'
import type { QualityPreset } from '@/types/device'

const Effects = lazy(() => import('@/three/objects/Effects'))

interface HeroSceneProps {
  preset: QualityPreset
  /** Pointer-driven camera drift (off for touch devices and reduced motion). */
  parallax: boolean
}

/** Composition of the hero backdrop: grid floor, horizon terrain, data particles. */
export function HeroScene({ preset, parallax }: HeroSceneProps) {
  const colors = useThemeColors()
  const invalidate = useThree((state) => state.invalidate)
  useMouseParallax(parallax)

  // In "demand" mode nothing re-renders on its own, so repaint after a theme change.
  useEffect(() => invalidate(), [colors, invalidate])

  return (
    <>
      <color attach="background" args={[colors.bg]} />
      <fog attach="fog" args={[colors.bg, FOG.near, FOG.far]} />
      <GridFloor color={colors.primary} fogColor={colors.bg} />
      <HorizonTerrain color={colors.secondary} segments={preset.terrainSegments} />
      {preset.particles > 0 && <DataParticles count={preset.particles} color={colors.accent} />}
      {parallax && <CameraRig />}
      {preset.bloom && (
        <Suspense fallback={null}>
          <Effects />
        </Suspense>
      )}
    </>
  )
}
