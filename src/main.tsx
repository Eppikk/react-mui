import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'index.css'
import { createRouter, RouterProvider } from '@tanstack/react-router'

import { RootRoute } from 'routes/__root'
import { indexRoute } from 'routes'
import { aboutRoute } from 'routes/about'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const routeTree = RootRoute.addChildren([indexRoute, aboutRoute])

export const router = createRouter({
  routeTree,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
