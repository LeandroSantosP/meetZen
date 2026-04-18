import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-[0_15px_30px_rgba(30,47,66,0.08)] backdrop-blur md:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-700">
        About Route
      </p>
      <h2 className="mt-2 font-[var(--font-heading)] text-2xl tracking-tight text-slate-900 md:text-3xl">
        Why this stack
      </h2>
      <p className="mt-3 max-w-2xl text-slate-600">
        This frontend setup combines fast development with type-safe routing and
        robust schema validation. It is ready for scaling features while keeping
        the initial structure simple.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="font-semibold text-slate-900">TanStack Router</h3>
          <p className="mt-1 text-sm text-slate-600">
            File-based routes with strong TypeScript inference.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="font-semibold text-slate-900">Zod</h3>
          <p className="mt-1 text-sm text-slate-600">
            Predictable runtime validation for forms and API contracts.
          </p>
        </div>
      </div>
    </section>
  )
}
