import { createFileRoute } from '@tanstack/react-router'
import { Box, Grid, Card, CardContent, CardMedia, Typography } from '@mui/material'

const items = [
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

function Clothing() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
        Clothing
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
                <Typography variant="h5" color="primary" sx={{ fontWeight: 600, mt: "auto" }}>
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
  component: Clothing,
})

export default Route
