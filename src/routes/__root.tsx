import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import Header from 'components/layout/Header'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { AuthContextType } from 'auth/AuthProvider'

interface RouterContext {
  auth: AuthContextType
}

const RootLayout = () => {
  // const { auth } = Route.useRouteContext()

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
