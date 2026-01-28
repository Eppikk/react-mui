import { createRootRoute, Outlet } from '@tanstack/react-router'
import Header from 'components/layout/Header'
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => (
  <>
    <Header />
    <Outlet />
    {/* <TanStackRouterDevtools /> */}
  </>
)

export const RootRoute = createRootRoute({ component: RootLayout })
