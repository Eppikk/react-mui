import { createRouter } from '@tanstack/react-router'
import { Route } from 'routes'
import { aboutRoute } from 'routes/about'
import { formTemplateRoute } from 'routes/form'
import { RootRoute } from 'routes/__root'

const routeTree = RootRoute.addChildren([Route, aboutRoute, formTemplateRoute])

export const router = createRouter({
  routeTree,
})
