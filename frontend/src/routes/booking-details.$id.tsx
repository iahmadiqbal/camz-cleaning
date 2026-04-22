import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/booking-details/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/booking-details/$id"!</div>
}
