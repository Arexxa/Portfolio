import { useEffect, useMemo, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { gsap } from 'gsap'
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, ShaderMaterial } from 'three'
import { CAMERA, COLORS, DURATION, NAME_ASSEMBLY } from '@/lib/constants'
import { sampleText } from '@/three/lib/sampleText'
import fragmentShader from '@/three/shaders/name.frag?raw'
import vertexShader from '@/three/shaders/name.vert?raw'

interface NameParticlesProps {
  count: number
  animate: boolean
  pixelRatio: number
  onReady?: () => void
}

const NAME_LINES_WIDE = [NAME_ASSEMBLY.text]
const NAME_LINES_NARROW = ['SHAHRUL', 'NIZAM']
const HERO_Z = CAMERA.heroPosition[2]

/** Large 3D intro name made of particles that assemble from a scattered cloud. */
export function NameParticles({ count, animate, pixelRatio, onReady }: NameParticlesProps) {
  const aspect = useThree((state) => state.size.width / state.size.height)
  const narrow = aspect < 1
  const visibleWidth = 2 * HERO_Z * Math.tan((CAMERA.fov * Math.PI) / 360) * aspect
  const worldWidth = Math.max(
    4,
    Math.min(NAME_ASSEMBLY.worldWidth, Math.floor(visibleWidth * 0.86)),
  )
  const [geometry, setGeometry] = useState<BufferGeometry | null>(null)

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: {
          uAssemble: { value: 0 },
          uTime: { value: 0 },
          uSize: { value: NAME_ASSEMBLY.pointSize },
          uPixelRatio: { value: pixelRatio },
          uTextWidth: { value: worldWidth },
          uColorA: { value: new Color(COLORS.cyan) },
          uColorB: { value: new Color(COLORS.violet) },
          uColorC: { value: new Color(COLORS.ember) },
        },
      }),
    [pixelRatio, worldWidth],
  )

  useEffect(() => {
    let cancelled = false
    let built: BufferGeometry | null = null
    const build = async () => {
      await document.fonts
        .load(`${NAME_ASSEMBLY.fontWeight} 100px ${NAME_ASSEMBLY.fontFamily}`)
        .catch(() => [])
      if (cancelled) return
      const lines = narrow ? NAME_LINES_NARROW : NAME_LINES_WIDE
      const { points } = sampleText(
        lines,
        count,
        NAME_ASSEMBLY.fontFamily,
        NAME_ASSEMBLY.fontWeight,
        worldWidth,
      )
      const total = points.length / 2
      const target = new Float32Array(total * 3)
      const start = new Float32Array(total * 3)
      const seed = new Float32Array(total)
      for (let i = 0; i < total; i++) {
        target[i * 3] = points[i * 2] ?? 0
        target[i * 3 + 1] = points[i * 2 + 1] ?? 0
        const u = Math.random() * 2 - 1
        const theta = Math.random() * Math.PI * 2
        const r = NAME_ASSEMBLY.scatterRadius * (0.4 + Math.random() * 0.6)
        const s = Math.sqrt(1 - u * u)
        start[i * 3] = r * s * Math.cos(theta)
        start[i * 3 + 1] = r * s * Math.sin(theta)
        start[i * 3 + 2] = r * u - 10
        seed[i] = Math.random()
      }
      built = new BufferGeometry()
      built.setAttribute('position', new BufferAttribute(target, 3))
      built.setAttribute('aStart', new BufferAttribute(start, 3))
      built.setAttribute('aSeed', new BufferAttribute(seed, 1))
      setGeometry(built)
      onReady?.()
    }
    void build()
    return () => {
      cancelled = true
      built?.dispose()
    }
  }, [count, narrow, worldWidth, onReady])

  useEffect(() => {
    const uniform = material.uniforms.uAssemble!
    if (!animate) {
      uniform.value = 1
      return
    }
    uniform.value = 0
    const tween = gsap.to(uniform, {
      value: 1,
      duration: DURATION.nameAssemble,
      delay: 0.4,
      ease: 'power2.inOut',
    })
    return () => {
      tween.kill()
    }
  }, [material, animate, geometry])

  useEffect(() => () => material.dispose(), [material])

  useFrame((state) => {
    material.uniforms.uTime!.value = animate ? state.clock.elapsedTime : 0
  })

  if (!geometry) return null
  return (
    <points
      geometry={geometry}
      material={material}
      position={[0, narrow ? 1.4 : 0.7, 0]}
      frustumCulled={false}
    />
  )
}
