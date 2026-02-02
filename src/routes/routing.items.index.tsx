import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/routing/items/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/routing/items/"!</div>
}
