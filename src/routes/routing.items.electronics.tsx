import { createFileRoute } from '@tanstack/react-router'
import { Box, Grid, Card, CardContent, CardMedia, Typography } from '@mui/material'

const items = [
  {
    id: 1,
    title: 'Laptop Pro 15',
    description: 'High-performance laptop with 16GB RAM',
    price: '$1,299',
    image: 'https://via.placeholder.com/300x200/1976d2/ffffff?text=Laptop',
  },
  {
    id: 2,
    title: 'Smartphone X',
    description: 'Latest smartphone with 5G support',
    price: '$899',
    image: 'https://via.placeholder.com/300x200/1976d2/ffffff?text=Phone',
  },
  {
    id: 3,
    title: 'Wireless Earbuds',
    description: 'Noise-cancelling wireless earbuds',
    price: '$199',
    image: 'https://via.placeholder.com/300x200/1976d2/ffffff?text=Earbuds',
  },
]

function Electronics() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
        Electronics
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Browse {items.length} items in this category
      </Typography>

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

export const Route = createFileRoute('/routing/items/electronics')({
  component: Electronics,
})

export default Route
