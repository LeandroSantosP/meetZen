import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  CircleUserRound,
  Grid2x2,
  MessageSquarePlus,
  Mic,
  Plus,
  Settings,
  Trash2,
  Video,
} from 'lucide-react'

type Status = 'Online' | 'Privada' | 'Pausada'

type FakeUser = {
  name: string
  plan: string
  avatarUrl: string
}

type FakeRoom = {
  id: string
  title: string
  createdAt: string
  status: Status
  participants: string[]
  totalCount: number
  variant: 'primary' | 'neutral' | 'muted'
}

const fakeUser: FakeUser = {
  name: 'Alex Santos',
  plan: 'Premium Sanctuary',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCNUzX9I6PjBgPCcPt6Q3allAzZ51xwmvrviEisueE7HbC5tF0dNMLm7ZIwY_ZmBXN7e8hRUa5Xop1ndjilZV50FM7Yy2hhNVNF60OGs1ImFblFyx7Z1bf-hLM2iB8gkaKEhVFPHiRv6Hwp6z8yXhwbag4QGmfhZSCz93IiRQpt9pEXDwB1-IbWRKgilFLwtSmJn0v7DwTP_5Ek27lnqypz0QGWAf7nJNDOEzTqile07ba1fH24WL_9B52HpIOfZSPpjkSQTMekBJ8',
}

const roomAvatars = {
  a: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2srBH5dNvVy_HluO__j8R0JJjFhH-eqyiTW8KYf4WMtgrHEVm5sQ6FAPaVnn9z-A-pnrtITCTHySxJi1XfW53qLXK4AKmb96RtMEobwkYmLb8tqXCpGGNWBGSKCtIG4ewW6uJVUL11GW4gJxNJ3XR4FNiV-e8LPc_utQ0TQ6drokQyuXNHDh4di8l8UG7IHiyHeqJbay77tvpbVLr8xLzFEIBInrwLyptFAykoGn-6OfAJjp7yFFmCqCRKTs2qOJg-4AHS7UYLps',
  b: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAejzwyuRCsJPJNRGmMwu_jcTQ2U6P-Yt_uYJUfDs7HkNJylweQV_oQYAwzmUU5_ojNAw_yLintanjezwA85fO7lW1rGlw4RaFKOZTOqkOmu-hRKse1-iaRNP1SxEASyCQfh5_9F71-WLXo8rDOG3XkZgPmPaBBNN2XERiiRbK_WtzJiFuif0bxCblE2k5S--JD5Zcse4132XL1x7EFFtO5GDD6eHoaLj0bsQS8xvodQFFDvxX813UxWUqaBC-sGpSyXy0kFYv-2qg',
  c: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCtmumriJ5v8nPWuUzH7-lkTBWQRr2avSOxi1agXvfbUuacHgS70MiZDYyGELxPw1uFJkDudyshQTS1_d4DUCTXMqlnVuhTllq3ShkVDlW23oeq1ae-f8nE6VFDwe4VAa36mrT8iHwxxyNQU2P8ALmnkyJBYGOpKjv2a2Te-9VvB1MoajmfwveUmi_FiY_tL-66n2iuToh5WNobkzTaPuh71i8L6D_XqSR9_UkdgBdOqwpxjozgkqySEKQE9tX2cnCAKWNjLcnNOQ',
  d: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYURU39X3rIJ2iDJd3cSYua1k1YjvAgTusZBNR5bhVtWsH0i8F4Vc6cRLxFDRzx3WBqzEXP5lPHQTx2N53YqtYXn8pzO4kApW9K10IRfQCkcPyEFJRuAZL4F43_BTeKva08eAMt3NoiNhWBa70led1ZkllyzOCa_beycjq1W_OEaUTijRCELj3WMk8pzQ2DKBst2GiYdZ8iQIDh5dQ6RqhRqxvA7kzRye6Ep0U3Uug0llM7Ogclnfk53pb5IFBD0zizNbuocTwsXo',
}

const fakeRooms: FakeRoom[] = [
  {
    id: 'design-team',
    title: 'Equipe de Design',
    createdAt: '12 Out, 2023',
    status: 'Online',
    participants: [roomAvatars.a, roomAvatars.b],
    totalCount: 3,
    variant: 'primary',
  },
  {
    id: 'sprint-planning',
    title: 'Sprint Planejamento',
    createdAt: '14 Out, 2023',
    status: 'Privada',
    participants: [roomAvatars.c],
    totalCount: 8,
    variant: 'neutral',
  },
  {
    id: 'daily-sync',
    title: 'Daily Sync',
    createdAt: '15 Out, 2023',
    status: 'Pausada',
    participants: [roomAvatars.d],
    totalCount: 0,
    variant: 'muted',
  },
]

export const Route = createFileRoute('/landing')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <section className="min-h-screen overflow-x-hidden bg-[#131313] text-[#e5e2e1] antialiased">
      <header className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between bg-[#1c1b1b]/80 px-6 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold tracking-tight text-[#5dade2]">RoomChat</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-4 md:flex">
            <button type="button" className="text-sm font-semibold text-[#5dade2]">
              Dashboard
            </button>
            <button
              type="button"
              className="text-sm text-[#bfc7d0] transition-colors hover:text-[#e5e2e1]"
            >
              Meetings
            </button>
            <button
              type="button"
              className="text-sm text-[#bfc7d0] transition-colors hover:text-[#e5e2e1]"
            >
              Recordings
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button type="button" className="text-sm font-medium text-[#ffb3b3] transition-opacity hover:opacity-80">
              Logout
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2a2a2a] text-[#e5e2e1] transition-colors hover:bg-[#353534]"
              aria-label="User menu"
            >
              <CircleUserRound size={18} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </header>

      <aside className="fixed left-0 top-0 hidden h-full w-64 flex-col space-y-6 bg-[#131313] p-4 pt-20 md:flex">
        <div className="px-2">
          <div className="mb-8 flex items-center gap-3 px-2">
            <div className="h-10 w-10 overflow-hidden rounded-xl">
              <img
                src={fakeUser.avatarUrl}
                alt={`${fakeUser.name} avatar`}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#e5e2e1]">{fakeUser.name}</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#bfc7d0]">
                {fakeUser.plan}
              </p>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg bg-[#5dade2]/10 px-4 py-2 text-left font-medium text-[#5dade2]"
            >
              <Grid2x2 size={18} strokeWidth={1.8} />
              <span className="text-sm">Dashboard</span>
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left text-[#bfc7d0] transition-all hover:bg-[#2a2a2a] hover:text-[#e5e2e1]"
            >
              <Video size={18} strokeWidth={1.8} />
              <span className="text-sm">Meetings</span>
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left text-[#bfc7d0] transition-all hover:bg-[#2a2a2a] hover:text-[#e5e2e1]"
            >
              <Mic size={18} strokeWidth={1.8} />
              <span className="text-sm">Recordings</span>
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left text-[#bfc7d0] transition-all hover:bg-[#2a2a2a] hover:text-[#e5e2e1]"
            >
              <Settings size={18} strokeWidth={1.8} />
              <span className="text-sm">Settings</span>
            </button>
          </nav>
        </div>

        <div className="mt-auto px-2">
          <button
            type="button"
            className="flex w-full scale-95 items-center justify-center gap-2 rounded-xl bg-[#5dade2] px-4 py-3 font-semibold text-[#003f5d] transition-all duration-200 hover:brightness-110"
          >
            <Plus size={18} strokeWidth={1.8} />
            New Meeting
          </button>
        </div>
      </aside>

      <main className="min-h-screen px-6 pb-20 pt-20 md:pl-64">
        <div className="mx-auto w-full max-w-6xl">
          <section className="mb-12">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="space-y-1">
                <h1 className="text-3xl font-extrabold tracking-tighter text-[#e5e2e1]">
                  Minhas Salas
                </h1>
                <p className="text-sm text-[#bfc7d0]">
                  Bem-vindo de volta, Alex. Organize suas sessoes aqui.
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Codigo da sala..."
                  className="w-full rounded-xl border-none bg-[#0e0e0e] px-4 py-3 pr-12 text-sm text-[#e5e2e1] outline-none ring-0 placeholder:text-[#7b8590]/80 focus:ring-1 focus:ring-[#8aceff]"
                />
                  <button
                    type="button"
                    aria-label="Entrar em sala"
                    className="absolute right-2 top-1.5 rounded-lg p-1.5 text-[#8aceff] transition-colors hover:bg-[#8aceff]/10"
                  >
                    <ArrowRight size={16} strokeWidth={1.8} />
                  </button>
                </div>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5dade2] px-6 py-3 font-bold text-[#003f5d] transition-all hover:shadow-[0_0_20px_rgba(93,173,226,0.3)] sm:w-auto"
                >
                  <MessageSquarePlus size={18} strokeWidth={1.8} />
                  Criar Nova Sala
                </button>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fakeRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}

            <article className="group flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#40484f]/30 p-6 transition-all hover:border-[#8aceff]/50">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#353534] transition-colors group-hover:bg-[#8aceff]/20">
                <Plus
                  size={20}
                  strokeWidth={1.8}
                  className="text-[#bfc7d0] transition-colors group-hover:text-[#8aceff]"
                />
              </div>
              <span className="text-sm font-bold text-[#bfc7d0] transition-colors group-hover:text-[#8aceff]">
                Criar Nova Sala
              </span>
            </article>
          </section>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-around bg-[#131313]/90 px-4 backdrop-blur-xl md:hidden">
        <button type="button" className="flex flex-col items-center gap-1 text-[#8aceff]">
          <Grid2x2 size={18} strokeWidth={1.8} />
          <span className="text-[10px] font-bold">Inicio</span>
        </button>
        <button type="button" className="flex flex-col items-center gap-1 text-[#bfc7d0]">
          <Video size={18} strokeWidth={1.8} />
          <span className="text-[10px]">Salas</span>
        </button>
        <div className="relative -top-6">
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5dade2] text-[#003f5d] shadow-lg"
          >
            <Plus size={18} strokeWidth={1.8} />
          </button>
        </div>
        <button type="button" className="flex flex-col items-center gap-1 text-[#bfc7d0]">
          <Mic size={18} strokeWidth={1.8} />
          <span className="text-[10px]">Gravacoes</span>
        </button>
        <button type="button" className="flex flex-col items-center gap-1 text-[#bfc7d0]">
          <Settings size={18} strokeWidth={1.8} />
          <span className="text-[10px]">Ajustes</span>
        </button>
      </nav>
    </section>
  )
}

function RoomCard({ room }: { room: FakeRoom }) {
  const containerClass =
    room.variant === 'primary'
      ? 'bg-[#2a2a2a] hover:bg-[#393939] relative overflow-hidden'
      : room.variant === 'neutral'
        ? 'bg-[#2a2a2a] hover:bg-[#393939]'
        : 'bg-[#1c1b1b] border border-[#40484f]/10 hover:bg-[#2a2a2a]'

  const badgeClass =
    room.status === 'Online'
      ? 'bg-[#8aceff]/10 text-[#8aceff]'
      : room.status === 'Privada'
        ? 'bg-[#353534] text-[#bfc7d0]'
        : 'bg-[#a2d1b2]/10 text-[#a2d1b2]'

  return (
    <article
      className={`group flex min-h-[220px] flex-col justify-between rounded-3xl p-6 transition-all ${containerClass}`}
    >
      {room.variant === 'primary' ? (
        <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#8aceff]/5 blur-3xl" />
      ) : null}

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <span
            className={`mb-3 inline-block rounded px-2 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${badgeClass}`}
          >
            {room.status}
          </span>
          <h2 className="text-xl font-bold tracking-tight text-[#e5e2e1]">{room.title}</h2>
          <p className="mt-1 text-xs text-[#bfc7d0]">Criada em: {room.createdAt}</p>
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-[#ffb3b3]/60 transition-colors hover:bg-[#ffb3b3]/10 hover:text-[#ffb3b3]"
          aria-label={`Remover sala ${room.title}`}
        >
          <Trash2 size={18} strokeWidth={1.8} />
        </button>
      </div>

      <div className="relative z-10 mt-8 flex items-center justify-between">
        <div className="flex -space-x-3">
          {room.participants.map((avatar, index) => (
            <div
              key={`${room.id}-participant-${index}`}
              className="h-8 w-8 overflow-hidden rounded-full border-2 border-[#2a2a2a]"
            >
              <img
                src={avatar}
                alt={`${room.title} participant ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}

          {room.totalCount > 0 ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#2a2a2a] bg-[#353534] text-[10px] font-bold text-[#bfc7d0]">
              +{room.totalCount}
            </div>
          ) : null}
        </div>

        <button
          type="button"
          className="rounded-xl bg-[#8aceff] px-5 py-2 text-sm font-bold text-[#00344e] transition-transform hover:scale-105"
        >
          Entrar
        </button>
      </div>
    </article>
  )
}
