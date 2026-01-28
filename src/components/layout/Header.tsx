import { AppBar, Toolbar, Box, Button, Typography, IconButton, Menu, MenuItem } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img src="/logo192.png" alt="Logo" style={{ height: 40, marginRight: 12 }} />
          <Typography variant="h6" component="div" color="text.primary" sx={{ fontWeight: 600 }}>
            React template
          </Typography>
        </Link>

        <Box sx={{ display: 'flex', gap: 1, ml: 4 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <Button
                color="inherit"
                sx={{
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'primary.main' : 'text.primary',
                }}
              >
                Home
              </Button>
            )}
          </Link>
          <Link to="/form" style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <Button
                color="inherit"
                sx={{
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'primary.main' : 'text.primary',
                }}
              >
                Form
              </Button>
            )}
          </Link>
          <Link to="/about" style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <Button
                color="inherit"
                sx={{
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'primary.main' : 'text.primary',
                }}
              >
                About
              </Button>
            )}
          </Link>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton
          color="inherit"
          onClick={handleMenuClick}
          aria-controls={open ? 'user-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <AccountCircleIcon />
        </IconButton>

        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'user-button',
          }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
