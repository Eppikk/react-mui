import { Box, Card, CardActionArea, CardContent, Container, Grid, Typography } from '@mui/material'
import CodeIcon from '@mui/icons-material/Code'
import FormIcon from '@mui/icons-material/Description'
import ThemeIcon from '@mui/icons-material/Palette'
import RouterIcon from '@mui/icons-material/Route'
import { Link } from '@tanstack/react-router'

export default function Dashboard() {
  const features = [
    {
      title: 'Routing',
      description: 'See an example of nested routes and navigation',
      icon: <RouterIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
      link: '/routing/items',
    },
    {
      title: 'Form Components',
      description: 'See an example of form validation',
      icon: <FormIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
      link: '/form',
    },
    {
      title: 'Custom Theme',
      description: 'Material-UI theme configuration',
      icon: <ThemeIcon sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
    },
    {
      title: 'TypeScript',
      description: 'Strict TypeScript configuration',
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
    },
  ]

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          React + MUI Template
        </Typography>
        <Typography variant="body1" color="text.secondary">
          A minimal template with React 19, TypeScript, Material-UI, and TanStack Router
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {features.map(feature => {
          const cardContent = (
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
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <Box sx={{ color: feature.color }}>{feature.icon}</Box>
                </Box>
                <Typography variant="h6" align="center" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          )

          return (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={feature.title}>
              {feature.link ? (
                <Link to={feature.link} style={{ textDecoration: 'none' }}>
                  <CardActionArea sx={{ height: '100%' }}>{cardContent}</CardActionArea>
                </Link>
              ) : (
                cardContent
              )}
            </Grid>
          )
        })}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Getting Started
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              This template includes absolute imports, MUI theming, TanStack Router, and more. Click
              on the cards above to see examples of routing and form components.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Check the README for development commands and architecture guidelines.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
