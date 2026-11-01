import { useRef, type RefObject } from 'react'
import { m, useDragControls, useMotionValue } from 'motion/react'
import { useKeyboardNudge } from '@/features/projects/useKeyboardNudge'
import { ProjectWindow } from '@/features/projects/ProjectWindow'
import type { WindowPosition } from '@/features/projects/windowLayout'
import { WINDOW } from '@/lib/constants'
import type { Project } from '@/types/content'

interface DraggableProjectWindowProps {
  project: Project
  position: WindowPosition
  zIndex: number
  desktopRef: RefObject<HTMLDivElement | null>
  onFocus: (id: string) => void
  onOpen: (id: string) => void
}

/**
 * A project window on the desktop. Dragging starts only from the title-bar handle (so text
 * stays selectable and buttons stay clickable); the handle also moves it with arrow keys.
 * Position lives in motion values, so dragging never re-renders React.
 */
export function DraggableProjectWindow({
  project,
  position,
  zIndex,
  desktopRef,
  onFocus,
  onOpen,
}: DraggableProjectWindowProps) {
  const ref = useRef<HTMLDivElement>(null)
  const controls = useDragControls()
  const x = useMotionValue(position.x)
  const y = useMotionValue(position.y)
  const nudge = useKeyboardNudge(x, y, ref, desktopRef)

  const handle = (
    <button
      type="button"
      onPointerDown={(event) => controls.start(event)}
      onKeyDown={nudge}
      aria-label={`Move ${project.title} window. Use arrow keys, hold Shift for larger steps.`}
      className="block w-full cursor-grab touch-none truncate text-left uppercase tracking-[0.18em] active:cursor-grabbing"
    >
      ~/projects/{project.id}
    </button>
  )

  return (
    <m.div
      ref={ref}
      drag
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={desktopRef}
      onPointerDownCapture={() => onFocus(project.id)}
      onFocusCapture={() => onFocus(project.id)}
      style={{ x, y, zIndex, width: WINDOW.width }}
      className="absolute left-0 top-0"
    >
      <ProjectWindow project={project} onOpen={onOpen} handle={handle} />
    </m.div>
  )
}
