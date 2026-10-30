/** Strip control characters / angle brackets and collapse whitespace for plain-text fields. */
export function sanitizeText(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F<>]/g, '')
    .replace(/[ \t]+/g, ' ')
    .trim()
}
