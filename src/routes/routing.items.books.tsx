import { createFileRoute } from '@tanstack/react-router'
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Alert,
  Skeleton,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getBooks, type Book } from 'api/services/items'

function BookSkeleton() {
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

function Books() {
  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
  })

  if (isError) {
    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
          Books
        </Typography>
        <Alert severity="error" sx={{ mt: 2 }}>
          Failed to load books: {error instanceof Error ? error.message : 'Unknown error'}
        </Alert>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
        Books
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        {isLoading ? (
          <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={16} /> Loading books...
          </Box>
        ) : (
          `Browse ${books?.length ?? 0} items in this category`
        )}
      </Typography>

      <Box
        sx={{
          mb: 3,
          p: 2,
          bgcolor: 'info.50',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'info.200',
        }}
      >
        <Typography variant="subtitle2" color="info.main" sx={{ fontWeight: 600, mb: 0.5 }}>
          Pattern: useQuery (Component-Level Loading)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Data fetching is handled in the component using <code>useQuery</code>. The component
          manually manages loading, error, and success states. Good for optional data or when you
          need fine-grained control over loading UI.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {isLoading
          ? // Show skeleton placeholders while loading
            [1, 2, 3].map(n => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={n}>
                <BookSkeleton />
              </Grid>
            ))
          : books?.map(item => (
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
    </Box>
  )
}

export const Route = createFileRoute('/routing/items/books')({
  component: Books,
})

export default Route
