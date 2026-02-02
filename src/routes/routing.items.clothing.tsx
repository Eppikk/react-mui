import { createFileRoute } from '@tanstack/react-router'
import { Box, Grid, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

interface ClothingItem {
  id: number
  title: string
  description: string
  price: string
  image: string
}

// Simulated API fetch function
const fetchClothing = async (): Promise<ClothingItem[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return [
    {
      id: 4,
      title: 'Designer T-Shirt',
      description: 'Premium cotton t-shirt',
      price: '$45',
      image: 'https://via.placeholder.com/300x200/9c27b0/ffffff?text=T-Shirt',
    },
    {
      id: 5,
      title: 'Denim Jeans',
      description: 'Classic fit denim jeans',
      price: '$79',
      image: 'https://via.placeholder.com/300x200/9c27b0/ffffff?text=Jeans',
    },
    {
      id: 6,
      title: 'Winter Jacket',
      description: 'Warm insulated winter jacket',
      price: '$149',
      image: 'https://via.placeholder.com/300x200/9c27b0/ffffff?text=Jacket',
    },
  ]
}

// Query options - can be reused in loader and component
const clothingQueryOptions = queryOptions({
  queryKey: ['clothing'],
  queryFn: fetchClothing,
})

function Clothing() {
  // useSuspenseQuery works with the loader - data is guaranteed to be available
  const { data: items } = useSuspenseQuery(clothingQueryOptions)

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
        Clothing
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Browse {items.length} items in this category
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
          Pattern: Router Loader + useSuspenseQuery (Blocking)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Data is pre-fetched in the route <code>loader</code> using{' '}
          <code>queryClient.ensureQueryData()</code>. The route blocks navigation until data loads.
          Component uses <code>useSuspenseQuery</code> for guaranteed data availability. Best for
          critical data that must be present before render.
        </Typography>
      </Box>

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
    </Box>
  )
}

export const Route = createFileRoute('/routing/items/clothing')({
  // Loader pre-fetches data using queryClient from router context
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(clothingQueryOptions),
  component: Clothing,
})

export default Route
