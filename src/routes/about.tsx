import { createRoute } from '@tanstack/react-router'
import { RootRoute } from './__root'

const aboutRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/about',
  component: function About() {
    return <div className="p-2">Hello from About!</div>
  },
})

export { aboutRoute }
