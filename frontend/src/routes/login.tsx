import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#121212] px-4 py-10 text-[#f4f6f8] sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[35rem] w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgb(93_173_226_/_0.28)_0%,_rgb(18_18_18_/_0)_70%)] blur-2xl" />
        <div className="absolute left-[18%] top-[18%] h-48 w-48 rounded-full bg-[#4f88a7]/25 blur-3xl" />
        <div className="absolute bottom-[12%] right-[12%] h-56 w-56 rounded-full bg-[#3a4d59]/25 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md rounded-[28px] border border-white/10 bg-[rgb(24_24_24_/_0.74)] p-6 shadow-[0_30px_70px_rgba(0,0,0,0.48)] backdrop-blur-xl sm:p-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-[#9cb2c2]">meetZen</p>
          <h1 className="mt-3 font-[var(--font-heading)] text-3xl tracking-tight text-[#f6f9fc]">
            Premium Sanctuary
          </h1>
        </div>

        <form className="mt-8 space-y-4" onSubmit={(event) => event.preventDefault()}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#c9d4dd]">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-[#151515] px-3 py-3 text-sm text-[#f4f6f8] outline-none transition focus:border-[#78b7de] focus:ring-4 focus:ring-[#5dade2]/20"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#c9d4dd]">Password</span>
            <input
              type="password"
              placeholder="********"
              className="w-full rounded-xl border border-white/10 bg-[#151515] px-3 py-3 text-sm text-[#f4f6f8] outline-none transition focus:border-[#78b7de] focus:ring-4 focus:ring-[#5dade2]/20"
            />
          </label>

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#79b8df] to-[#5dade2] px-4 py-3 text-sm font-semibold text-[#102738] shadow-[0_14px_35px_rgba(93,173,226,0.33)] transition hover:brightness-110"
          >
            Entrar
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs uppercase tracking-[0.22em] text-[#8da0af]">Ou</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="space-y-3">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/4 px-4 py-3 text-sm font-medium text-[#d6e2ea] transition hover:bg-white/10"
          >
            Entrar com Google
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/4 px-4 py-3 text-sm font-medium text-[#d6e2ea] transition hover:bg-white/10"
          >
            Entrar com GitHub
          </button>
        </div>

        <p className="mt-7 text-center text-sm text-[#a7bac8]">
          Nao tem conta?{' '}
          <Link to="/signup" className="font-semibold text-[#8aceff] hover:text-[#a5d8ff]">
            Cadastre-se
          </Link>
        </p>
      </div>
    </section>
  )
}
