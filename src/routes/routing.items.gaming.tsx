import { createFileRoute } from '@tanstack/react-router'
import { Box, Grid, Card, CardContent, CardMedia, Typography, Skeleton } from '@mui/material'
import {
  useFastGamingItems,
  useSlowGamingItems,
  fastGamingItemsQueryOptions,
  slowGamingItemsQueryOptions,
} from 'hooks/useGamingItems'

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

function Gaming() {
  // Fast items - awaited in loader, guaranteed to be available
  const { data: fastItems = [] } = useFastGamingItems()

  // Slow items - prefetched in loader, may still be loading
  const { data: slowItems = [], isLoading: slowLoading } = useSlowGamingItems()

  const totalItems = fastItems.length + (slowItems?.length || 3) // Estimate for loading state

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
        Gaming
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Browse {totalItems} items in this category
      </Typography>

      <Box
        sx={{
          mb: 3,
          p: 2,
          bgcolor: 'success.50',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'success.200',
        }}
      >
        <Typography variant="subtitle2" color="success.main" sx={{ fontWeight: 600, mb: 0.5 }}>
          Pattern: Mixed Loading (Await + Prefetch)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fast items are <code>awaited</code> in the loader (displayed immediately), while slow
          items are <code>prefetched</code> without blocking navigation. This demonstrates hybrid
          loading: critical data blocks navigation, optional data loads in background with skeleton
          placeholders.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Fast items - loaded immediately */}
        {fastItems.map(item => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`fast-${item.id}`}>
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

        {/* Slow items - show skeletons while loading */}
        {slowLoading
          ? [1, 2, 3].map(n => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`skeleton-${n}`}>
                <ItemSkeleton />
              </Grid>
            ))
          : slowItems.map(item => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`slow-${item.id}`}>
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
    </Box>
  )
}

export const Route = createFileRoute('/routing/items/gaming')({
  /**
   * Mixed Loading Pattern: Await Critical + Prefetch Optional
   *
   * Fast items: Awaited with ensureQueryData - blocks navigation until loaded
   * - Guarantees data is available immediately when component renders
   * - No loading state needed for these items
   *
   * Slow items: Prefetched without await - navigation happens immediately
   * - Starts loading in background
   * - Component shows skeletons while loading
   * - Provides progressive loading UX
   *
   * This pattern is ideal when you have:
   * - Critical data that must be ready (above the fold content)
   * - Optional data that can load progressively (below the fold, less important)
   */
  loader: async ({ context: { queryClient } }) => {
    // Await fast items - blocks navigation (300ms delay)
    await queryClient.ensureQueryData(fastGamingItemsQueryOptions)

    // Prefetch slow items - doesn't block navigation (2.5s delay)
    queryClient.prefetchQuery(slowGamingItemsQueryOptions)
  },
  component: Gaming,
})

export default Route
