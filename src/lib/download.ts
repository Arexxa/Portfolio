/** Starts a same-origin file download (e.g. the resume) without navigating away. */
export function triggerDownload(path: string, fileName: string): void {
  const link = document.createElement('a')
  link.href = path
  link.download = fileName
  link.rel = 'noopener'
  document.body.append(link)
  link.click()
  link.remove()
}
