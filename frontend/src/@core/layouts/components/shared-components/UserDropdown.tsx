// ** React Imports
import { useState, SyntheticEvent, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'
import UserIcon from 'src/layouts/components/UserIcon'
import { useSession } from 'next-auth/react'
import { logoutUser } from 'src/services/authService'
import { CircularProgress, useTheme } from '@mui/material'
import { useAppSelector } from 'src/store'
import { getInitials, handleLogoutUser } from 'src/utils/helper'

interface Props {
  settings: Settings
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const ProgressBorder = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: theme.palette.common.white,
  padding: '0px 4px',
  borderRadius: '10px',
  fontWeight: 'bold',
  color: theme.palette.primary.dark,
  border: `1px solid ${theme.palette.primary.dark}`,
  fontSize: '10px'
}))

const UserDropdown = (props: Props) => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const [percentage, setPercentage] = useState<number>(74)
  const theme = useTheme()
  const { first_name, last_name, isAuthenticated } = useAppSelector((state: any) => state.login.auth)

  // ** Hooks
  const router = useRouter()
  const { logout } = useAuth()
  const progressColor = '#3F41D1'

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2,
      fontSize: '1.375rem',
      color: 'text.primary'
    }
  }

  const session = useSession()

  const handleLogout = async () => {
    // console.log('logout>>', session)
    // if (session) {
    //   await logoutUser(session)
    // } else {
    //   window.location.href = '/signout'
    // }

    if (isAuthenticated) {
      handleLogoutUser()

      // router.replace("/sign-in/")
      window.location.href = '/sign-in/'
    }
    handleDropdownClose()
  }
  const progressValue = 74

  return (
    <Fragment>
      <Box onClick={handleDropdownOpen} sx={{ ml: 0, cursor: 'pointer' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
            <CircularProgress
              variant='determinate'
              value={progressValue}
              size={64}
              thickness={2}
              sx={{
                color: theme.palette.primary.dark,
                width: '54px !important',
                height: '60px !important'
              }}
            />
            {/* Avatar */}
            <Avatar
              alt='John Doe'
              sx={{
                width: 48,
                height: 48,
                position: 'absolute',
                borderRadius: '50px'
              }}
            >
              <Typography variant='h6' sx={{ color: 'customColors.mainText' }}>
                {getInitials(first_name + ' ' + last_name)}
              </Typography>
            </Avatar>
            <ProgressBorder>{`${progressValue}%`}</ProgressBorder>
          </Box>
          <Box display={'flex'} alignItems={'flex-end'}>
            <Box sx={{ marginLeft: '10px', marginRight: '5px' }}>
              <Typography variant='subtitle1' sx={{ fontWeight: 400, color: 'text.primary', lineHeight: '24px' }}>
                {`Hi, ${first_name || ''} ${last_name || ''}`}
              </Typography>
              <Typography variant='body2' sx={{ color: 'customColors.mainText' }}>
                {/* CEO | Founder */}
              </Typography>
            </Box>
            <ExpandMoreIcon sx={{ color: '#292D32', marginTop: '-20px' }} />
          </Box>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: direction === 'ltr' ? 'right' : 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: direction === 'ltr' ? 'right' : 'left'
        }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar alt='John Doe' src='/images/avatars/1.png' sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box
              sx={{
                display: 'flex',
                ml: 3,
                alignItems: 'flex-start',
                flexDirection: 'column'
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>
                {first_name} {last_name}
              </Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}></Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: '0 !important' }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='mdi:account-outline' />
            Profile
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='mdi:email-outline' />
            Inbox
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='mdi:message-outline' />
            Chat
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='mdi:cog-outline' />
            Settings
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='mdi:currency-usd' />
            Pricing
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='mdi:help-circle-outline' />
            FAQ
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 2,
            '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' }
          }}
        >
          <Icon onClick={handleLogout} icon='mdi:logout-variant' />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
