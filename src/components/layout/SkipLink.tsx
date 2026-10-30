/** First focusable element: lets keyboard users bypass the navigation. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-cyan-glow px-5 py-2 font-medium text-void transition-transform focus:translate-y-0"
    >
      Skip to content
    </a>
  )
}
