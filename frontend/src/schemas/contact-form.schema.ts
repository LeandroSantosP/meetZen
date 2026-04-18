import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must have at least 2 characters')
    .max(80, 'Name must have at most 80 characters'),
  email: z.email('Please provide a valid email address'),
  message: z
    .string()
    .trim()
    .min(10, 'Message must have at least 10 characters')
    .max(500, 'Message must have at most 500 characters'),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>
