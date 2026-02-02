import { createFileRoute, redirect } from '@tanstack/react-router'
import RoutingExample from 'components/RoutingExample'

export const Route = createFileRoute('/routing/items')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: '/routing/items',
        },
      })
    }
  },
  component: RoutingExample,
})

export default Route
