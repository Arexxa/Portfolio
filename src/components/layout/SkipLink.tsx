/** First focusable element: lets keyboard users bypass the status bar and hero. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed left-4 top-4 z-(--z-skip) -translate-y-24 border border-primary bg-primary px-4 py-2 text-xs uppercase tracking-[0.18em] text-bg transition-transform focus:translate-y-0"
    >
      Skip to content
    </a>
  )
}
