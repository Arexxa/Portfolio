import { useSyncExternalStore } from 'react'

export interface ProjectViewState {
  /** Active tech-tag filter, or null for all. */
  tag: string | null
  /** Project shown in the detail dialog, or null. */
  openId: string | null
}

let state: ProjectViewState = { tag: null, openId: null }
const listeners = new Set<() => void>()

function update(patch: Partial<ProjectViewState>) {
  state = { ...state, ...patch }
  listeners.forEach((listener) => listener())
}

/**
 * Tiny external store for the projects view, so the terminal (`projects <tag>`, `open <id>`)
 * and the projects section share filter/dialog state without a Context provider.
 */
export const projectStore = {
  get: () => state,
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
  setTag: (tag: string | null) => update({ tag }),
  open: (openId: string) => update({ openId }),
  close: () => update({ openId: null }),
}

export function useProjectView(): ProjectViewState {
  return useSyncExternalStore(projectStore.subscribe, projectStore.get, projectStore.get)
}
