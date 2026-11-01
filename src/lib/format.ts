/** Deterministic 7-char hex "commit hash" for an id (djb2). Purely decorative. */
export function shortHash(value: string): string {
  let hash = 5381
  for (let i = 0; i < value.length; i++) hash = (hash * 33) ^ value.charCodeAt(i)
  return (hash >>> 0).toString(16).padStart(8, '0').slice(0, 7)
}
