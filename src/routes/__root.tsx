import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import Header from 'components/layout/Header'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { AuthContextType } from 'auth/AuthProvider'
import type { QueryClient } from '@tanstack/react-query'

interface RouterContext {
  auth: AuthContextType
  queryClient: QueryClient
}

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
})

export default Route
