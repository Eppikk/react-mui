import { createRouter } from '@tanstack/react-router'
import { routeTree } from 'routeTree.gen'
import type { AuthContextType } from 'auth/AuthProvider'
import type { QueryClient } from '@tanstack/react-query'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }

  interface RouteContext {
    auth: AuthContextType
    queryClient: QueryClient
  }
}

export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
    queryClient: undefined!,
  },
})
