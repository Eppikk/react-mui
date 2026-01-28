import { createRoute } from '@tanstack/react-router'
import { RootRoute } from './__root'
import Dashboard from 'components/Dashboard'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: Dashboard,
})

export default Route
