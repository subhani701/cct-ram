/** Stable hash path for routing (handles trailing slashes, missing leading slash). */
export function normalizeHash(raw: string | undefined): string {
  const h = (raw || '#/').trim()
  const body = h.startsWith('#') ? h.slice(1) : h
  const path = body.startsWith('/') ? body : `/${body}`
  const trimmed = path.replace(/\/+$/, '') || '/'
  return `#${trimmed}`
}

export function routesMatch(a: string, b: string): boolean {
  return normalizeHash(a).toLowerCase() === normalizeHash(b).toLowerCase()
}
