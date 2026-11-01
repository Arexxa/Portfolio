import { useCallback, useState } from 'react'

/** Z-order for desktop windows: the last id in the stack is on top. */
export function useWindowStack(ids: readonly string[]) {
  const [stack, setStack] = useState<string[]>([])

  const bringToFront = useCallback((id: string) => {
    setStack((current) =>
      current.at(-1) === id ? current : [...current.filter((item) => item !== id), id],
    )
  }, [])

  const reset = useCallback(() => setStack([]), [])

  /** 1-based z-index; windows never raised keep their data order. */
  const zIndexOf = (id: string) => {
    const raised = stack.indexOf(id)
    return raised === -1 ? ids.indexOf(id) + 1 : ids.length + raised + 1
  }

  return { bringToFront, reset, zIndexOf }
}
