import { Typography } from '@mui/material'
import type { AnyFieldApi } from '@tanstack/react-form'

interface FieldInfoProps {
  field: AnyFieldApi
}

export default function FieldInfo({ field }: FieldInfoProps) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
          {field.state.meta.errors.join(', ')}
        </Typography>
      ) : null}
    </>
  )
}
