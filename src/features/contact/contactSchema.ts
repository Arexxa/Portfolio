import { z } from 'zod'
import { sanitizeText } from '@/lib/sanitize'

export const contactSchema = z.object({
  name: z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().min(2, 'Please enter your name').max(80)),
  email: z.string().trim().pipe(z.email('Enter a valid email address')),
  message: z
    .string()
    .transform(sanitizeText)
    .pipe(
      z
        .string()
        .min(10, 'Tell me a little more (10+ characters)')
        .max(2000, 'Keep it under 2000 characters'),
    ),
  /** Honeypot: hidden from humans, bots fill it. Must stay empty. */
  company: z.string().optional(),
})

export type ContactInput = z.input<typeof contactSchema>
export type ContactValues = z.output<typeof contactSchema>
