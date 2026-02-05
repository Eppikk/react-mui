import { createFileRoute, Await, defer } from '@tanstack/react-router'
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Skeleton,
  CircularProgress,
} from '@mui/material'
import { Suspense } from 'react'
import { getElectronicsItems, type ElectronicsItem } from 'api/services/items'

function ItemSkeleton() {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Skeleton variant="rectangular" height={200} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" sx={{ fontSize: '1.5rem', mb: 1 }} />
        <Skeleton variant="text" sx={{ mb: 2 }} />
        <Skeleton variant="text" width="40%" sx={{ fontSize: '1.5rem' }} />
      </CardContent>
    </Card>
  )
}

function ItemsGrid({ items }: { items: ElectronicsItem[] }) {
  return (
    <Grid container spacing={3}>
      {items.map(item => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={item.image}
              alt={item.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {item.description}
              </Typography>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 600, mt: 'auto' }}>
                {item.price}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

function Electronics() {
  const { deferredItems } = Route.useLoaderData()

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
        Electronics
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Browse our electronics collection
      </Typography>

      <Box
        sx={{
          mb: 3,
          p: 2,
          bgcolor: 'warning.50',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'warning.200',
        }}
      >
        <Typography variant="subtitle2" color="warning.main" sx={{ fontWeight: 600, mb: 0.5 }}>
          Pattern: Deferred Loading with defer() + Await
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The route <code>loader</code> returns immediately using <code>defer()</code>, allowing the
          page shell to render instantly. The <code>Await</code> component with{' '}
          <code>Suspense</code> streams in data when ready. Best for slow or non-critical data where
          fast navigation is prioritized.
        </Typography>
      </Box>

      {/* Await handles the deferred promise with Suspense fallback */}
      <Suspense
        fallback={
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <CircularProgress size={20} />
              <Typography color="text.secondary">Loading electronics...</Typography>
            </Box>
            <Grid container spacing={3}>
              {[1, 2, 3].map(n => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={n}>
                  <ItemSkeleton />
                </Grid>
              ))}
            </Grid>
          </Box>
        }
      >
        <Await promise={deferredItems}>{items => <ItemsGrid items={items} />}</Await>
      </Suspense>
    </Box>
  )
}

export const Route = createFileRoute('/routing/items/electronics')({
  // Loader returns immediately with a deferred promise
  // The route renders without waiting for data to load
  loader: () => ({
    deferredItems: defer(getElectronicsItems()),
  }),
  component: Electronics,
})

export default Route
