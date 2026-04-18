import { Outlet, createRootRoute } from '@tanstack/react-router'
import { NotFoundPage } from '@/components/not-found-page'
import { PageShell } from '@/components/page-shell'

export const Route = createRootRoute({
  notFoundComponent: NotFoundPage,
  component: () => (
    <PageShell>
      <Outlet />
    </PageShell>
  ),
})
