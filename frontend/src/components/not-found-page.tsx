import { Link } from '@tanstack/react-router'
import { ArrowLeft, CircleAlert, Compass, Home } from 'lucide-react'

export function NotFoundPage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#131313] px-4 py-10 text-[#e5e2e1] sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(93,173,226,0.14),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(162,209,178,0.1),transparent_42%)]" />

      <div className="relative w-full max-w-4xl rounded-3xl border border-white/8 bg-[#131313]/85 p-8 shadow-[0_28px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#8aceff]">
          <CircleAlert size={14} strokeWidth={1.8} />
          Erro 404
        </div>

        <h2 className="mt-4 font-[var(--font-heading)] text-3xl tracking-tight text-[#e5e2e1] md:text-4xl">
          Pagina nao encontrada
        </h2>
        <p className="mt-3 max-w-xl text-sm text-[#bfc7d0] md:text-base">
          Essa rota nao existe neste ambiente. Volte para a home ou retorne para
          a ultima pagina para continuar.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#5dade2] px-4 py-2.5 text-sm font-semibold text-[#003f5d] transition hover:brightness-110"
          >
            <Home size={16} strokeWidth={1.8} />
            Ir para Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-4 py-2.5 text-sm font-semibold text-[#e5e2e1] transition hover:bg-white/10"
          >
            <ArrowLeft size={16} strokeWidth={1.8} />
            Voltar
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-white/8 bg-[#1c1b1b]/80 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[#9cb0bd]">
            Dica
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-[#c8d6df]">
            <Compass size={15} strokeWidth={1.8} className="text-[#8aceff]" />
            Verifique se a URL esta correta ou use o menu principal.
          </p>
        </div>
      </div>

      <div className="absolute -bottom-20 -right-20 h-52 w-52 rounded-full bg-[#5dade2]/10 blur-3xl" />
      <div className="absolute -left-14 -top-14 h-44 w-44 rounded-full bg-[#a2d1b2]/8 blur-3xl" />
    </section>
  )
}
