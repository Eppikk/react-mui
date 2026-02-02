import { createFileRoute } from '@tanstack/react-router'
import { Box, Grid, Card, CardContent, CardMedia, Typography } from '@mui/material'

const items = [
  {
    id: 7,
    title: 'The Design of Everyday Things',
    description: 'Classic book on design principles',
    price: '$24',
    image: 'https://via.placeholder.com/300x200/f57c00/ffffff?text=Design+Book',
  },
  {
    id: 8,
    title: 'Clean Code',
    description: 'A handbook of agile software craftsmanship',
    price: '$32',
    image: 'https://via.placeholder.com/300x200/f57c00/ffffff?text=Clean+Code',
  },
  {
    id: 9,
    title: 'Fiction Bestseller',
    description: 'Award-winning contemporary fiction',
    price: '$18',
    image: 'https://via.placeholder.com/300x200/f57c00/ffffff?text=Fiction',
  },
]

function Books() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
        Books
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

export const Route = createFileRoute('/routing/items/books')({
  component: Books,
})

export default Route
