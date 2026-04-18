import { createFileRoute } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  CardDescription,
  CardRoot,
  CardTitle,
} from '@/components/ui/card'
import { TextField } from '@/components/ui/text-field'

export const Route = createFileRoute('/components')({
  component: ComponentsPage,
})

function ComponentsPage() {
  return (
    <section className="space-y-6">
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
          UI Showcase
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
          Components
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Catalogo de componentes reutilizaveis em
          <code className="ml-1 rounded bg-slate-100 px-1.5 py-0.5 text-xs">src/components/ui</code>.
        </p>
      </header>

      <CardRoot tone="light" className="border-slate-200 bg-white">
        <CardTitle className="text-slate-900">Buttons</CardTitle>
        <CardDescription className="mt-1 text-slate-600">
          Variantes e tamanhos basicos.
        </CardDescription>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
        </div>
      </CardRoot>

      <CardRoot tone="light" className="border-slate-200 bg-white">
        <CardTitle className="text-slate-900">Badges</CardTitle>
        <CardDescription className="mt-1 text-slate-600">
          Estados semanticos para metadados.
        </CardDescription>
        <div className="mt-4 flex flex-wrap gap-3">
          <Badge variant="info">info</Badge>
          <Badge variant="success">success</Badge>
          <Badge variant="neutral">neutral</Badge>
          <Badge variant="danger">danger</Badge>
        </div>
      </CardRoot>

      <CardRoot tone="light" className="border-slate-200 bg-white">
        <CardTitle className="text-slate-900">Text Fields</CardTitle>
        <CardDescription className="mt-1 text-slate-600">
          Inputs com variantes de tom.
        </CardDescription>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <TextField tone="light" placeholder="Light tone" />
          <TextField tone="dark" placeholder="Dark tone" />
        </div>
      </CardRoot>
    </section>
  )
}
