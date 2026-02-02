import { createRouter } from '@tanstack/react-router'
import { routeTree } from 'routeTree.gen'
import type { AuthContextType } from 'auth/AuthProvider'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }

  interface RouteContext {
    auth: AuthContextType
  }
}

export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
})
