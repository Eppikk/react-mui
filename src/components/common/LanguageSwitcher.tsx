import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import CheckIcon from '@mui/icons-material/Check'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { supportedLanguages } from 'config/i18n'

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode)
    handleClose()
  }

  const currentLanguage = supportedLanguages.find(lang => lang.code === i18n.language)

  return (
    <>
      <Tooltip title={t('common.language')}>
        <IconButton
          onClick={handleClick}
          color="inherit"
          aria-label={t('common.language')}
          aria-controls={open ? 'language-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {supportedLanguages.map(lang => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            selected={lang.code === currentLanguage?.code}
          >
            <ListItemIcon sx={{ fontSize: '1.25rem', minWidth: 36 }}>{lang.flag}</ListItemIcon>
            <ListItemText>{lang.name}</ListItemText>
            {lang.code === currentLanguage?.code && (
              <CheckIcon fontSize="small" sx={{ ml: 1, color: 'primary.main' }} />
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
