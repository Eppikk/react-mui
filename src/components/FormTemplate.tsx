import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  Stack,
  MenuItem,
  Alert,
} from '@mui/material'
import { useForm } from '@tanstack/react-form'
import type { AnyFieldApi } from '@tanstack/react-form'

interface FormData {
  fullName: string
  email: string
  country: string
  message: string
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
          {field.state.meta.errors.join(', ')}
        </Typography>
      ) : null}
    </>
  )
}

const defaultValues: FormData = {
  fullName: '',
  email: '',
  country: '',
  message: '',
}

export default function FormTemplate() {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Form submitted:', value)
      alert(`Form submitted successfully!\n\n${JSON.stringify(value, null, 2)}`)
    },
  })

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Form Template
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Example form with TanStack Form for type-safe form handling
        </Typography>
      </Box>

      <Card>
        <CardContent sx={{ p: 4 }}>
          <form
            onSubmit={e => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <Stack spacing={3}>
              <form.Field
                name="fullName"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? 'Full name is required'
                      : value.length < 2
                        ? 'Name must be at least 2 characters'
                        : undefined,
                }}
                children={field => (
                  <Box>
                    <TextField
                      label="Full Name"
                      placeholder="Enter your full name"
                      fullWidth
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      error={field.state.meta.isTouched && field.state.meta.errors.length > 0}
                      required
                    />
                    <FieldInfo field={field} />
                  </Box>
                )}
              />

              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'Email is required'
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address'
                    return undefined
                  },
                }}
                children={field => (
                  <Box>
                    <TextField
                      label="Email Address"
                      type="email"
                      placeholder="your.email@example.com"
                      fullWidth
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      error={field.state.meta.isTouched && field.state.meta.errors.length > 0}
                      required
                    />
                    <FieldInfo field={field} />
                  </Box>
                )}
              />

              <form.Field
                name="country"
                validators={{
                  onChange: ({ value }) => (!value ? 'Please select a country' : undefined),
                }}
                children={field => (
                  <Box>
                    <TextField
                      label="Country"
                      select
                      fullWidth
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      error={field.state.meta.isTouched && field.state.meta.errors.length > 0}
                      required
                    >
                      <MenuItem value="">Select a country</MenuItem>
                      <MenuItem value="us">United States</MenuItem>
                      <MenuItem value="uk">United Kingdom</MenuItem>
                      <MenuItem value="ca">Canada</MenuItem>
                      <MenuItem value="au">Australia</MenuItem>
                    </TextField>
                    <FieldInfo field={field} />
                  </Box>
                )}
              />

              <form.Field
                name="message"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'Message is required'
                    if (value.length < 10) return 'Message must be at least 10 characters'
                    return undefined
                  },
                }}
                children={field => (
                  <Box>
                    <TextField
                      label="Message"
                      multiline
                      rows={4}
                      placeholder="Enter your message here..."
                      fullWidth
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      error={field.state.meta.isTouched && field.state.meta.errors.length > 0}
                      required
                    />
                    <FieldInfo field={field} />
                  </Box>
                )}
              />

              <form.Subscribe
                selector={state => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      size="large"
                      type="button"
                      onClick={() => form.reset()}
                    >
                      Reset
                    </Button>
                    <Button
                      variant="contained"
                      size="large"
                      type="submit"
                      disabled={!canSubmit || isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                  </Box>
                )}
              />
            </Stack>
          </form>
        </CardContent>
      </Card>

      <Box sx={{ mt: 3 }}>
        <Alert severity="info">
          This form uses TanStack Form for type-safe validation and state management. Try submitting
          invalid data to see validation in action.{' '}
          <a
            href="https://tanstack.com/form/latest"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', fontWeight: 600 }}
          >
            View Documentation
          </a>
        </Alert>
      </Box>
    </Container>
  )
}
