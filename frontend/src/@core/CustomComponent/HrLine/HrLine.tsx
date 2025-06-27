import { useTheme } from '@mui/material'
import React from 'react'

const HrLine = () => {
  const theme = useTheme()

  return (
    <>
      <hr
        style={{
          borderColor: theme.palette.customColors.text6,
          borderWidth: '1px',
          borderStyle: 'solid',
          margin: '17px 0'
        }}
      />
    </>
  )
}

export default HrLine
