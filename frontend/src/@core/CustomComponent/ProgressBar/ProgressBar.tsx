import React, { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import { Stack, Avatar, Typography, LinearProgress, Box } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import CircleIcon from '@mui/icons-material/Circle'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: `${theme.palette.customColors.text5} !important`
}))

interface AvatarDetails {
  bgcolor: string
  icon: JSX.Element
  progressColor: string
  text: string
}

export default function ProgressBar() {
  const [value, setValue] = useState(100)
  const theme = useTheme()

  const getAvatarDetails = (value: number): AvatarDetails => {
    if (value >= 100) {
      return {
        bgcolor: `${theme.palette.success.main} !important`,
        icon: <DoneIcon />,
        progressColor: theme.palette.success.main,
        text: 'Completed'
      }
    } else if (value < 100 && value >= 76) {
      return {
        bgcolor: `${theme.palette.success.main} !important`,
        icon: <DoneIcon />,
        progressColor: theme.palette.success.main,
        text: 'Completed'
      }
    } else if (value <= 75 && value >= 51) {
      return {
        bgcolor: `${theme.palette.error.main} !important`,
        icon: <CloseIcon />,
        progressColor: theme.palette.error.main,
        text: 'Not Confirmed!'
      }
    } else if (value <= 50 && value >= 31) {
      return {
        bgcolor: `${theme.palette.customColors?.chipPendingText} !important`,
        icon: <PriorityHighIcon sx={{ fontSize: '1.2rem' }} />,
        progressColor: theme.palette.customColors?.chipPendingText,
        text: 'Payment has not been made!'
      }
    } else {
      return {
        bgcolor: '#FFF',
        icon: <CircleIcon sx={{ color: theme.palette.primary.dark, fontSize: '0.7rem' }} />,
        progressColor: theme.palette.primary.dark,
        text: 'Shipping ...'
      }
    }
  }

  const { bgcolor, icon, progressColor, text } = getAvatarDetails(value)

  return (
    <Box sx={{ backgroundColor: '#fff', height: '100vh', width: '100%' }}>
      <Stack spacing={2} direction='row'>
        <Avatar
          sx={{
            bgcolor: bgcolor,
            color: '#fff !important',
            border: bgcolor === '#FFF' ? `2px solid ${theme.palette.primary.dark} !important` : ''
          }}
        >
          {icon}
        </Avatar>
        <Stack sx={{ flexGrow: '1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Typography>{`${value}%`}</Typography>
            <Typography
              variant='overline'
              style={{ textTransform: 'capitalize', color: theme.palette.customColors?.mainText }}
            >
              {text}
            </Typography>
          </div>
          <BorderLinearProgress
            variant='determinate'
            value={value}
            sx={{
              '& .MuiLinearProgress-bar': { backgroundColor: progressColor }
            }}
          />
        </Stack>
      </Stack>
    </Box>
  )
}
