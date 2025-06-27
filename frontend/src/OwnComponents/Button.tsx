import { Typography, useTheme } from '@mui/material'
import React from 'react'

const Button = () => {
    const theme = useTheme()

  return (
    <div>
      <Typography variant="h1" sx={{color: theme.palette.primary.main}}>Test</Typography>
    </div>
  )
}

export default Button
