import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material'
import { useState } from 'react'
import { useAuth } from 'auth'
import { useForm } from '@tanstack/react-form'

function Login() {
  const navigate = useNavigate()
  const auth = useAuth()
  const { redirect } = useSearch({ from: '/login' })
  const [error, setError] = useState('')

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setError('')
      try {
        await auth.login(value.email, value.password)
        await navigate({ to: redirect || '/' })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Login failed')
      }
    },
  })

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Login
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
              Sign in to your account
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form
              onSubmit={async e => {
                e.preventDefault()
                e.stopPropagation()
                await form.handleSubmit()
              }}
            >
              <form.Field
                name="email"
                validators={{
                  onBlur: ({ value }) => {
                    if (!value) return 'Email is required'
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    if (!emailRegex.test(value)) return 'Please enter a valid email address'
                    return undefined
                  },
                }}
              >
                {field => (
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    error={field.state.meta.isTouched && !!field.state.meta.errors.length}
                    helperText={
                      field.state.meta.isTouched && field.state.meta.errors.length
                        ? field.state.meta.errors.join(', ')
                        : undefined
                    }
                    sx={{ mb: 2 }}
                    autoComplete="email"
                  />
                )}
              </form.Field>

              <form.Field
                name="password"
                validators={{
                  onBlur: ({ value }) => {
                    if (!value) return 'Password is required'
                    if (value.length < 6) return 'Password must be at least 6 characters'
                    return undefined
                  },
                }}
              >
                {field => (
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    error={field.state.meta.isTouched && !!field.state.meta.errors.length}
                    helperText={
                      field.state.meta.isTouched && field.state.meta.errors.length
                        ? field.state.meta.errors.join(', ')
                        : undefined
                    }
                    sx={{ mb: 3 }}
                    autoComplete="current-password"
                  />
                )}
              </form.Field>

              <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={!canSubmit || isSubmitting}
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                  </Button>
                )}
              </form.Subscribe>
            </form>

            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: 'info.lighter',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'info.light',
              }}
            >
              <Typography variant="body2" color="info.dark" sx={{ fontWeight: 500, mb: 0.5 }}>
                Demo Credentials
              </Typography>
              <Typography variant="caption" color="text.secondary" component="div">
                Email: demo@example.com
              </Typography>
              <Typography variant="caption" color="text.secondary" component="div">
                Password: demo123
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirect: (search.redirect as string) || '/',
    }
  },
  component: Login,
})

export default Route
