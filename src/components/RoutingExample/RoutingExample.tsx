import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material'
import { Link, Outlet, useMatchRoute } from '@tanstack/react-router'
import LaptopIcon from '@mui/icons-material/Laptop'
import CheckroomIcon from '@mui/icons-material/Checkroom'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'

const drawerWidth = 280

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: <LaptopIcon />,
    path: '/routing/items/electronics',
  },
  { id: 'clothing', name: 'Clothing', icon: <CheckroomIcon />, path: '/routing/items/clothing' },
  { id: 'books', name: 'Books', icon: <MenuBookIcon />, path: '/routing/items/books' },
  { id: 'gaming', name: 'Gaming', icon: <SportsEsportsIcon />, path: '/routing/items/gaming' },
]

export default function RoutingExample() {
  const matchRoute = useMatchRoute()

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Navigation Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            position: 'static',
            height: 'calc(100vh - 64px)',
            borderRight: '1px solid',
            borderColor: 'divider',
            borderRadius: 0,
          },
          borderRadius: 0,
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Categories
          </Typography>
          <Divider />
        </Box>
        <List>
          {categories.map(category => {
            const isActive = matchRoute({ to: category.path })

            return (
              <ListItem key={category.id} disablePadding>
                <ListItemButton
                  component={Link}
                  to={category.path}
                  selected={!!isActive}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? 'inherit' : 'action.active',
                    }}
                  >
                    {category.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={category.name}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}
