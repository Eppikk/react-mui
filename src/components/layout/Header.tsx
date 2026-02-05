import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import { Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from 'auth'
import LanguageSwitcher from 'components/common/LanguageSwitcher'

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth()

  const { t } = useTranslation()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleMenuClose()
    navigate({ to: '/' })
  }

  const handleLogin = () => {
    handleMenuClose()
    navigate({ to: '/login', search: { redirect: '/' } })
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
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
            {({ isActive }: { isActive: boolean }) => (
              <Button
                color="inherit"
                sx={{
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'primary.main' : 'text.primary',
                }}
              >
                {t('nav.home')}
              </Button>
            )}
          </Link>
          <Link to="/routing/items" style={{ textDecoration: 'none' }}>
            {({ isActive }: { isActive: boolean }) => (
              <Button
                color="inherit"
                sx={{
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'primary.main' : 'text.primary',
                }}
              >
                {t('nav.routing')}
              </Button>
            )}
          </Link>
          <Link to="/form" style={{ textDecoration: 'none' }}>
            {({ isActive }: { isActive: boolean }) => (
              <Button
                color="inherit"
                sx={{
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'primary.main' : 'text.primary',
                }}
              >
                {t('nav.form')}
              </Button>
            )}
          </Link>
          <Link to="/tech-stack" style={{ textDecoration: 'none' }}>
            {({ isActive }: { isActive: boolean }) => (
              <Button
                color="inherit"
                sx={{
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'primary.main' : 'text.primary',
                }}
              >
                Tech Stack
              </Button>
            )}
          </Link>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <LanguageSwitcher />

        <IconButton
          color="inherit"
          onClick={handleMenuClick}
          aria-controls={open ? 'user-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          {isAuthenticated && user ? (
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: 'primary.main',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              {getInitials(user.name)}
            </Avatar>
          ) : (
            <AccountCircleIcon />
          )}
        </IconButton>

        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'user-button',
          }}
          slotProps={{
            paper: {
              sx: { minWidth: 200 },
            },
          }}
        >
          {isAuthenticated && user ? (
            <>
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {user.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </>
          ) : (
            <MenuItem onClick={handleLogin}>
              <ListItemIcon>
                <LoginIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Login</ListItemText>
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
