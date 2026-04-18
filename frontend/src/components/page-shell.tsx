import type { PropsWithChildren } from 'react'
import { Link } from '@tanstack/react-router'

export function PageShell({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 py-8 md:px-10 md:py-12">
      <header className="mb-10 rounded-3xl border border-slate-200/70 bg-white/80 p-5 shadow-[0_20px_45px_rgba(24,36,56,0.08)] backdrop-blur md:p-7">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-slate-500">
              meetZen
            </p>
            <h1 className="mt-1 font-[var(--font-heading)] text-3xl tracking-tight text-slate-900 md:text-4xl">
              Frontend Foundation
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-600 md:text-base">
              React + Vite, Tailwind v4, TanStack Router and Zod ready in one
              monorepo workspace.
            </p>
          </div>

          <nav className="flex items-center gap-2 rounded-2xl bg-slate-100/80 p-1.5">
            <Link
              to="/"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-slate-900"
              activeProps={{
                className:
                  'rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm',
              }}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-slate-900"
              activeProps={{
                className:
                  'rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm',
              }}
            >
              About
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  )
}
