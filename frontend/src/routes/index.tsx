import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { contactFormSchema } from '@/schemas/contact-form.schema'

type FormState = {
  name: string
  email: string
  message: string
}

const initialForm: FormState = {
  name: '',
  email: '',
  message: '',
}

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const result = useMemo(() => contactFormSchema.safeParse(form), [form])

  return (
    <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
      <article className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-[0_15px_30px_rgba(30,47,66,0.08)] backdrop-blur md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-sky-700">
          Router + Validation
        </p>
        <h2 className="mt-2 font-[var(--font-heading)] text-2xl tracking-tight text-slate-900 md:text-3xl">
          Home Route
        </h2>
        <p className="mt-3 max-w-prose text-slate-600">
          This page demonstrates a basic form validated with Zod using
          safeParse, while navigation is powered by TanStack Router file-based
          routes.
        </p>

        <form className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Name
            </span>
            <input
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              value={form.name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, name: event.target.value }))
              }
              placeholder="Your name"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </span>
            <input
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, email: event.target.value }))
              }
              placeholder="you@example.com"
              type="email"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Message
            </span>
            <textarea
              className="min-h-28 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              value={form.message}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, message: event.target.value }))
              }
              placeholder="Tell us about your project goals"
            />
          </label>
        </form>
      </article>

    </section>
  )
}
