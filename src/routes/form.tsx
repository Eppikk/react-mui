import { createRoute } from '@tanstack/react-router'
import { RootRoute } from './__root'
import FormTemplate from 'components/FormTemplate'

export const formTemplateRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/form',
  component: FormTemplate,
})

export default formTemplateRoute
