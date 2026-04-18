import { Link } from '@tanstack/react-router'

export function NotFoundPage() {
  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-8 text-center shadow-[0_15px_30px_rgba(30,47,66,0.08)] backdrop-blur">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-rose-700">
        404
      </p>
      <h2 className="mt-2 font-[var(--font-heading)] text-3xl tracking-tight text-slate-900">
        Page not found
      </h2>
      <p className="mx-auto mt-3 max-w-md text-slate-600">
        The route you requested does not exist in this frontend workspace yet.
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Back to home
        </Link>
      </div>
    </section>
  )
}
