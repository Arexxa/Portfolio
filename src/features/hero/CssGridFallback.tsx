/** Lightweight CSS perspective grid for low-power devices, no WebGL, or a failed canvas. */
export function CssGridFallback() {
  return (
    <div aria-hidden="true" className="grid-fallback">
      <div className="grid-fallback__horizon" />
      <div className="grid-fallback__plane">
        <div className="grid-fallback__scroll" />
      </div>
    </div>
  )
}
