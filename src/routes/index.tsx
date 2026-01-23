import { createRoute } from '@tanstack/react-router'
import { RootRoute } from './__root'

export const indexRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: function Index() {
    return (
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    )
  },
})

export default indexRoute
