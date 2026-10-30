/** Typed access to public env vars (see .env.example). */
export const env = {
  formspreeEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT ?? '',
  siteUrl: (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, ''),
} as const
