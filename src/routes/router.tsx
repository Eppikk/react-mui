import { createRouter } from '@tanstack/react-router'
import { indexRoute } from 'routes'
import { aboutRoute } from 'routes/about'
import { RootRoute } from 'routes/__root'

const routeTree = RootRoute.addChildren([indexRoute, aboutRoute])

export const router = createRouter({
  routeTree,
})
