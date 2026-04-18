import { Link, createFileRoute } from '@tanstack/react-router'
import {
  Keyboard,
  MessageSquareMore,
  MicOff,
  Settings,
  Video,
  VideoOff,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#121212] text-[#e5e2e1]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(93,173,226,0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(162,209,178,0.05),transparent_40%)]" />

      <div className="relative mx-auto flex min-h-screen w-full flex-col">
        <header className="fixed left-0 right-0 top-0 z-50 bg-[#131313]/80 backdrop-blur-xl">
          <nav className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between px-2 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <span className="font-[var(--font-heading)] text-2xl font-bold tracking-tight text-sky-400">
                meetZen
              </span>
            </div>

            <div className="hidden items-center gap-8 md:flex">
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  className="text-neutral-400 transition-colors hover:text-sky-200"
                  aria-label="Settings"
                >
                  <Settings size={18} strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  className="text-neutral-400 transition-colors hover:text-sky-200"
                  aria-label="Help"
                >
                  <CircleHelpIcon />
                </button>
                <button
                  type="button"
                  className="text-neutral-400 transition-colors hover:text-sky-200"
                  aria-label="Feedback"
                >
                  <MessageSquareMore size={18} strokeWidth={1.8} />
                </button>
              </div>

              <Link
                to="/login"
                className="px-1 py-1 text-sm font-semibold text-sky-400 transition-colors duration-300 hover:text-sky-200"
              >
                Sign In
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-grow px-4 pt-20 sm:px-8 md:px-12 lg:px-16">
          <section className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 items-center gap-16 py-12 md:py-24 lg:grid-cols-2">
            <article className="flex max-w-xl flex-col gap-8">
              <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-[#e5e2e1] md:text-6xl">
              Videochamadas com qualquer pessoa, em qualquer lugar
              </h1>

              <p className="text-lg font-light leading-relaxed text-[#bfc7d0] md:text-xl">
                O meetZen e um santuario minimalista projetado para a
                colaboracao digital. Desfrute de conexoes nitidas em um
                ambiente calmo e sofisticado.
              </p>

              <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#5dade2] to-[#8aceff] px-8 py-4 font-semibold text-[#003f5d] shadow-lg shadow-[#8aceff]/20 transition-all hover:shadow-[#8aceff]/35 active:scale-95 sm:w-auto"
                >
                  <Video size={18} strokeWidth={2} />
                  Nova Reuniao
                </button>

                <div className="group flex w-full items-center gap-2 rounded-xl border border-white/5 bg-[#0e0e0e] p-1 transition-all focus-within:border-[#8aceff]/40 sm:w-auto">
                  <div className="pl-3 text-[#bfc7d0]">
                    <Keyboard size={16} strokeWidth={1.8} />
                  </div>
                  <input
                    type="text"
                    placeholder="Digite um codigo ou link"
                    className="w-full bg-transparent py-3 text-sm text-[#e5e2e1] outline-none placeholder:text-[#6b7280] sm:w-56"
                  />
                  <button
                    type="button"
                    className="rounded-lg px-6 py-2 font-medium text-[#8aceff] transition-colors hover:bg-[#2a2a2a]"
                  >
                    Entrar
                  </button>
                </div>
              </div>

              <div className="mt-4 border-t border-white/5 pt-8">
                <p className="text-sm text-[#737373]">
                  <span className="text-[#a2d1b2]">Saiba mais</span> sobre a
                  seguranca e privacidade do meetZen.
                </p>
              </div>
            </article>

            <aside className="relative flex w-full items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#8aceff]/5 blur-[120px]" />

              <div className="relative grid w-full grid-cols-2 gap-4">
                <div className="group relative col-span-1 row-span-1 overflow-hidden rounded-2xl bg-[#2a2a2a] shadow-2xl transition-transform hover:scale-[1.02]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBT0LweiZGA9mRtaZ8bmHJE86H310GdmbSJgaR1mS7BkpLVk2DrFOdzYiCiwdaQnw88a5BKOIr5aglKAiwBT8KukhocO3t-tftkxGPV3aO3oPwe47cLwpOI2hEgqqcdtt_SjpGIqmSCkry8AuqOqEygF7GlexMn5A0Xw8E7n0M5icUawQO1o4VNU_IbQcYCSwqmuY-gUz6Jl463w3trZiLExFU5f3jnf6nZzzV7gbKxBdp2h7yShjF_lzQhhz-EvHhUff6ZIAlLcj4"
                    alt="Ana Santos on call"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 rounded-full bg-[#2a2a2a]/40 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-xl">
                    Ana Santos
                  </div>
                </div>

                <div className="group relative col-span-1 row-span-2 overflow-hidden rounded-2xl bg-[#2a2a2a] shadow-2xl transition-transform hover:scale-[1.02]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVKgjeGqsBfuY6cYtkjVLFTpJVFhp_1vmo1UFWBm_ZGyGXU4CAUA4CmgfZo8RF1CsjP4rfkb12yLGog1iolWflQZMaqzGgEXUmnpIv1c7GNgbTPQ5DsMFB2VULRAiFc5WAvhqUxnoawMiRzVb1QIrcYjriKnvXc8FWB9gWvtPztWdtlAXVAffxBh-BfuwnFsY5JdmN04_9_U06HE56_Ybw2mI0JLvhvwbUGnyhWiqbofyuwOrrJzDfOfl7gfx7CvxhBqtjKex6vL0"
                    alt="Marco Viana on call"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 rounded-full bg-[#2a2a2a]/40 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-xl">
                    Marco Viana
                  </div>
                </div>

                <div className="group relative col-span-1 row-span-1 overflow-hidden rounded-2xl bg-[#2a2a2a] shadow-2xl transition-transform hover:scale-[1.02]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH9Au0SJTkTvOAxlUO0xtL7iaFFFeq4gRcOGwhNJZCNRlX4d0t6gjsLOxfZQ3Pak2lhbF4T0wuvK4HOFanf3V4LaNQAJYjh9gEdsKAHl_bkZ3IWcjDxZKO5tY9tsXahJeFqjscDO51Zyf9AwqXNRIqhNZ6roHwJHwUJ0U5h-PiB9yN3UDR2JVaC8QWqiZLqmwBKksv5UHx8IGumx0DigcPTQJ8ZlfOG5bie2E5ibxXPhl5P7Aa7t28hAD6wzDMqEZm_Au5lyhXC9g"
                    alt="Julia Chen on call"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 rounded-full bg-[#2a2a2a]/40 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-xl">
                    Julia Chen
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 flex items-center gap-4 rounded-2xl border border-white/5 bg-[#2a2a2a]/40 p-4 shadow-xl backdrop-blur-xl">
                  <div className="flex gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6f3537] text-[#efa0a0]">
                      <MicOff size={18} strokeWidth={2} />
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5dade2] text-[#003f5d]">
                      <VideoOff size={18} strokeWidth={2} />
                    </div>
                  </div>
                  <div className="mx-2 h-8 w-px bg-white/10" />
                  <div className="flex -space-x-3">
                    <div className="h-8 w-8 rounded-full border-2 border-[#2a2a2a] bg-neutral-600" />
                    <div className="h-8 w-8 rounded-full border-2 border-[#2a2a2a] bg-neutral-500" />
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#2a2a2a] bg-[#5dade2] text-[10px] font-bold text-[#003f5d]">
                      +12
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </section>
        </main>

        <footer className="mt-auto w-full border-t border-white/5 bg-[#0e0e0e]">
          <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row md:px-12">
            <div className="flex flex-col gap-2">
              <span className="font-[var(--font-heading)] text-xl font-bold tracking-tight text-sky-400 md:hidden">
                meetZen
              </span>
              <p className="text-sm tracking-wide text-neutral-500">
                © 2024 Velvet Sanctuary. Designed for the Digital Void.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              <a className="text-sm tracking-wide text-neutral-500 transition-colors hover:text-neutral-200" href="#">
                Privacy Policy
              </a>
              <a className="text-sm tracking-wide text-neutral-500 transition-colors hover:text-neutral-200" href="#">
                Terms of Service
              </a>
              <a className="text-sm tracking-wide text-neutral-500 transition-colors hover:text-neutral-200" href="#">
                Help Center
              </a>
              <a className="text-sm tracking-wide text-neutral-500 transition-colors hover:text-neutral-200" href="#">
                Safety
              </a>
              <a className="text-sm tracking-wide text-neutral-500 transition-colors hover:text-neutral-200" href="#">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}

function CircleHelpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-[18px] w-[18px]"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M9.65 9.72a2.36 2.36 0 1 1 4.7.37c0 1.56-2.35 1.56-2.35 3.12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.9" r="0.9" fill="currentColor" />
    </svg>
  )
}
