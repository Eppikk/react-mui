import { createFileRoute } from '@tanstack/react-router'
import { Box, Container, Typography, Card, CardContent, Grid, Chip, Link } from '@mui/material'

interface TechItem {
  name: string
  version: string
  description: string
  url: string
  category: string
}

const techStack: TechItem[] = [
  {
    name: 'Vite',
    version: '7.2.5',
    description: 'Next-generation frontend build tool with lightning-fast HMR',
    url: 'https://vitejs.dev',
    category: 'Build Tool',
  },
  {
    name: 'React',
    version: '19.2.0',
    description: 'JavaScript library for building user interfaces',
    url: 'https://react.dev',
    category: 'Framework',
  },
  {
    name: 'Material-UI',
    version: '7.x',
    description: 'React UI framework with customizable components',
    url: 'https://mui.com',
    category: 'UI Library',
  },
  {
    name: 'TanStack Router',
    version: '1.x',
    description: 'Type-safe router with file-based routing and loaders',
    url: 'https://tanstack.com/router',
    category: 'Routing',
  },
  {
    name: 'TanStack Query',
    version: '5.x',
    description: 'Powerful data synchronization and caching for React',
    url: 'https://tanstack.com/query',
    category: 'Data Fetching',
  },
  {
    name: 'TanStack Form',
    version: '1.x',
    description: 'Type-safe form state management with validation',
    url: 'https://tanstack.com/form',
    category: 'Forms',
  },
  {
    name: 'React i18next',
    version: '16.x',
    description: 'Internationalization framework for React applications',
    url: 'https://react.i18next.com',
    category: 'i18n',
  },
  {
    name: 'Axios',
    version: '1.x',
    description: 'Promise-based HTTP client with interceptors',
    url: 'https://axios-http.com',
    category: 'HTTP Client',
  },
  {
    name: 'Emotion',
    version: '11.x',
    description: 'CSS-in-JS library for styling components',
    url: 'https://emotion.sh',
    category: 'Styling',
  },
]

function TechStack() {
  const categories = Array.from(new Set(techStack.map(tech => tech.category)))

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Tech Stack
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Modern technologies powering this React application
        </Typography>

        <Grid container spacing={3}>
          {techStack.map(tech => (
            <Grid size={{ xs: 12, sm: 6 }} key={tech.name}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" component="h3">
                      {tech.name}
                    </Typography>
                    <Chip label={tech.version} size="small" color="primary" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {tech.description}
                  </Typography>
                  <Link
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ fontSize: '0.875rem' }}
                  >
                    Learn more →
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: 6,
            p: 3,
            bgcolor: 'primary.50',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'primary.200',
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
            Project Features
          </Typography>
          <Typography component="div" variant="body2" color="text.secondary">
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>File-based routing with TanStack Router</li>
              <li>Type-safe API calls with Axios and TypeScript</li>
              <li>Server state management with React Query</li>
              <li>Form validation with TanStack Form</li>
              <li>Authentication with JWT tokens and protected routes</li>
              <li>Internationalization (i18n) support</li>
              <li>Material-UI theming and responsive design</li>
              <li>Hot Module Replacement (HMR) with Vite</li>
              <li>Absolute imports from src root</li>
              <li>ESLint + Prettier for code quality</li>
            </ul>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export const Route = createFileRoute('/tech-stack')({
  component: TechStack,
})

export default Route
