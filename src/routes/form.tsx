import { createFileRoute } from '@tanstack/react-router'
import FormTemplate from 'components/FormTemplate'

export const Route = createFileRoute('/form')({
  component: FormTemplate,
})

export default Route
