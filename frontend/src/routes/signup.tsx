import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signup')({
  component: SignupPage,
})

function SignupPage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#121212] px-4 py-10 text-[#f4f6f8] sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgb(93_173_226_/_0.24)_0%,_rgb(18_18_18_/_0)_72%)] blur-2xl" />
        <div className="absolute left-[10%] top-[16%] h-52 w-52 rounded-full bg-[#5dade2]/15 blur-3xl" />
        <div className="absolute bottom-[8%] right-[8%] h-60 w-60 rounded-full bg-[#f5a5a5]/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg rounded-[30px] border border-white/10 bg-[rgb(24_24_24_/_0.76)] p-6 shadow-[0_30px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-[#9cb2c2]">meetZen</p>
          <h1 className="mt-3 font-[var(--font-heading)] text-3xl tracking-tight text-[#f6f9fc]">
            Crie sua conta no santuario digital
          </h1>
        </div>

        <form
          className="mt-8 grid gap-4 sm:grid-cols-2"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="block sm:col-span-2">
            <span className="mb-2 block text-sm font-medium text-[#c9d4dd]">Full Name</span>
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full rounded-xl border border-white/10 bg-[#151515] px-3 py-3 text-sm text-[#f4f6f8] outline-none transition focus:border-[#78b7de] focus:ring-4 focus:ring-[#5dade2]/20"
            />
          </label>

          <label className="block sm:col-span-2">
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

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#c9d4dd]">
              Confirm Password
            </span>
            <input
              type="password"
              placeholder="********"
              className="w-full rounded-xl border border-white/10 bg-[#151515] px-3 py-3 text-sm text-[#f4f6f8] outline-none transition focus:border-[#78b7de] focus:ring-4 focus:ring-[#5dade2]/20"
            />
          </label>

          <label className="mt-1 flex items-center gap-3 sm:col-span-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-white/30 bg-[#151515] accent-[#5dade2]"
            />
            <span className="text-sm text-[#a9bcc9]">Aceito os termos de servico</span>
          </label>

          <button
            type="submit"
            className="sm:col-span-2 mt-1 w-full rounded-xl bg-gradient-to-r from-[#79b8df] to-[#5dade2] px-4 py-3 text-sm font-semibold text-[#102738] shadow-[0_14px_35px_rgba(93,173,226,0.33)] transition hover:brightness-110"
          >
            Cadastrar
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-[#a7bac8]">
          Ja tem conta?{' '}
          <Link to="/login" className="font-semibold text-[#8aceff] hover:text-[#a5d8ff]">
            Faca login
          </Link>
        </p>
      </div>
    </section>
  )
}
