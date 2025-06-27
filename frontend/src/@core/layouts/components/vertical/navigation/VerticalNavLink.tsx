// ** React Imports
import { ElementType } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Chip from '@mui/material/Chip'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton'

// ** Configs Import
import themeConfig from 'src/configs/themeConfig'

// ** Types
import { NavLink, NavGroup } from 'src/@core/layouts/types'
import { Settings } from 'src/@core/context/settingsContext'

// ** Custom Components Imports
import UserIcon from 'src/layouts/components/UserIcon'
import Translations from 'src/layouts/components/Translations'
import CanViewNavLink from 'src/layouts/components/acl/CanViewNavLink'

// ** Util Import
import { handleURLQueries } from 'src/@core/layouts/utils'
import { Divider, Tooltip } from '@mui/material'
import { padding } from '@mui/system'
import { handleLogoutUser } from 'src/utils/helper'
import { useAppSelector } from 'src/store'

interface Props {
  parent?: boolean
  item: NavLink
  navHover?: boolean
  settings: Settings
  navVisible?: boolean
  collapsedNavWidth: number
  navigationBorderWidth: number
  toggleNavVisibility: () => void
  isSubToSub?: NavGroup | undefined
  setGroupActive: (value: string) => void
  setCurrentActiveGroup: (item: string[]) => void
}

// ** Styled Components
const MenuNavLink = styled(ListItemButton)<
  ListItemButtonProps & {
    component?: ElementType
    href: string
    target?: '_blank' | undefined
  }
>(({ theme }) => ({
  width: '100%',
  borderRadius: 8,
  transition: 'padding-left .25s ease-in-out',
  backgroundColor: theme.palette.common.white,

  '&.active': {
    '& .MuiListItemIcon-root': {
      width: '56px',
      height: '32px',
      borderRadius: '100px',
      backgroundColor: theme.palette.primary.main,
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '4px',
      color: `${theme.palette.common.white} !important`
    },
    '& .MuiTypography-root': {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '21px',
      textAlign: 'center',
      marginTop: '4px',
      color: theme.palette.primary.main
    },
    '&.Mui-focusVisible': {
      backgroundColor: theme.palette.primary.main
    },
    '&:hover': {
      '& .MuiListItemIcon-root': {
        width: '56px',
        height: '32px',
        borderRadius: '100px',
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '4px',
        color: `${theme.palette.common.white} !important`
      },
      '& .MuiTypography-root': {
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '21px',
        textAlign: 'center',
        marginTop: '4px',
        color: theme.palette.primary.main
      },
      '&.Mui-focusVisible': {
        backgroundColor: theme.palette.primary.main
      }
    }
  },

  '&:hover': {
    backgroundColor: theme.palette.common.white,
    '& .MuiListItemIcon-root': {
      backgroundColor: theme.palette.grey[50],
      paddingTop: '4px',
      color: theme.palette.customColors.mainText
    },
    '& .MuiTypography-root': {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '21px',
      textAlign: 'center',
      marginTop: '4px',
      color: `${theme.palette.customColors.mainText}`
    }
  },
  '& .MuiTypography-root': {
    fontSize: '14px ',
    fontWeight: 400,
    lineHeight: '21px',
    textAlign: 'center',
    marginTop: '4px',
    color: `${theme.palette.customColors.mainText} `
  },

  '& .MuiListItemIcon-root': {
    color: `${theme.palette.customColors.mainText}`,
    width: '56px',
    height: '32px',
    borderRadius: '100px',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '4px',
    marginLeft: '5px'
  }
}))

const MenuItemTextMetaWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  gap: theme.spacing(2),
  justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
}))

const VerticalNavLink = ({
  item,
  parent,
  navHover,
  settings,
  navVisible,
  isSubToSub,
  collapsedNavWidth,
  toggleNavVisibility,
  navigationBorderWidth,
  setGroupActive,
  setCurrentActiveGroup
}: Props) => {
  // ** Hooks
  const router = useRouter()
  const { isAuthenticated } = useAppSelector((state: any) => state.login.auth)

  // const handleSignout = async () => {
  //   // const storageToken = localStorage.getItem('token')
  //   const idToken = getLocalStorageVal("idToken");
  //   console.log("idToken", idToken);

  //   const userSession = {
  //     idToken,
  //   };
  //   const path = logoutUserData(userSession);
  //   if (path && path.url) {
  //     window.open(path.url, "_self");
  //   } else {
  //     window.open("/", "_self");
  //   }
  // };
  // ** Vars
  const { navCollapsed } = settings

  const icon = parent && !item.icon ? themeConfig.navSubItemIcon : item.icon

  const isNavLinkActive = () => {
    const itemPath = item.path || ''
    if (
      // router.asPath === item.path ||
      // router.pathname === item.path ||
      router.asPath.startsWith(itemPath) ||
      router.pathname.startsWith(itemPath) ||
      handleURLQueries(router, itemPath)
    ) {
      return true
    } else {
      return false
    }

    // const currentPath = router.asPath.split('?')[0]
    // const itemPath = item.path || '/'

    // const getFirstSegment = (path: string) => path.split('/').filter(Boolean)[1]

    // const currentFirstSegment = getFirstSegment(currentPath)
    // const itemFirstSegment = getFirstSegment(itemPath)

    // return currentFirstSegment === itemFirstSegment
  }

  return (
    <CanViewNavLink navLink={item}>
      {/* {item.title == 'Setting' ? (
        <Divider
          className='nav-setting footer-link'
          style={{
            width: '70%',
            marginLeft: '20px',
            borderWidth: '1px',
            borderColor: '#C6C8D2',
            borderRadius: '10px'
          }}
        />
      ) : null} */}
      <Tooltip
        title={item.title}
        slotProps={{
          popper: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, -20]
                }
              }
            ],
            sx: {
              pointerEvents: 'none'
            }
          }
        }}
      >
        <ListItem
          disablePadding
          className={
            item.title == 'Setting'
              ? 'nav-setting footer-link'
              : item.title == 'Logout'
              ? 'nav-logout footer-link'
              : 'nav-link'
          }
          disabled={item.disabled || false}
          sx={{
            mt: 1.5,
            transition: 'padding .25s ease-in-out',
            px: theme => (parent ? '0 !important' : `${theme.spacing(navCollapsed && !navHover ? 2 : 3)} !important`)
          }}
        >
          <MenuNavLink
            component={Link}
            style={{ display: 'flex', flexDirection: 'column' }}
            {...(item.disabled && { tabIndex: -1 })}
            className={isNavLinkActive() ? 'active' : ''}
            href={item.path === undefined ? '/' : `${item.path}`}
            {...(item.openInNewTab ? { target: '_blank' } : null)}
            onClick={e => {
              if (item.title == 'Logout') {
                if (isAuthenticated) {
                  handleLogoutUser()

                  // router.replace("/sign-in/")
                  window.location.href = '/sign-in/'
                }
              }
              if (item.path === undefined) {
                e.preventDefault()
                e.stopPropagation()
              }
              if (navVisible) {
                toggleNavVisibility()
              }
              if (setGroupActive != undefined) {
                setGroupActive('')
              }

              if (setCurrentActiveGroup != undefined) {
                setCurrentActiveGroup([])
              }

              // setGroupActive("");
              // setCurrentActiveGroup([])
            }}
            sx={{
              py: 2.25,
              ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' }),
              pr: navCollapsed && !navHover ? (collapsedNavWidth - navigationBorderWidth - 24 - 16) / 8 : 3,
              pl: navCollapsed && !navHover ? (collapsedNavWidth - navigationBorderWidth - 24 - 16) / 8 : 4
            }}
          >
            {isSubToSub ? null : (
              <ListItemIcon
                sx={{
                  transition: 'margin .25s ease-in-out',
                  color: parent ? 'text.secondary' : 'text.primary',
                  ...(navCollapsed && !navHover ? { mr: 0 } : { mr: 2 }),
                  ...(parent ? { ml: 2, mr: 4 } : {}), // This line should be after (navCollapsed && !navHover) condition for proper styling
                  '& svg': {
                    ...(!parent ? { fontSize: '1.5rem' } : { fontSize: '0.5rem' }),
                    ...(parent && item.icon ? { fontSize: '0.875rem' } : {})
                  }
                }}
              >
                {/* {parent ? null : <UserIcon icon={icon as string} />} */}
                {parent ? null : <span className={item.icon}></span>}
              </ListItemIcon>
            )}

            <MenuItemTextMetaWrapper
              style={{ display: 'flex', justifyContent: 'center' }}
              sx={{
                ...(isSubToSub ? { ml: 8 } : {}),
                ...(navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 })
              }}
            >
              <Typography
                variant='subtitle1'
                {...((themeConfig.menuTextTruncate || (!themeConfig.menuTextTruncate && navCollapsed && !navHover)) && {
                  noWrap: true
                })}
              >
                {item.title}
                {/* <Translations text={item.title} /> */}
              </Typography>

              {item.badgeContent ? (
                <Chip
                  size='small'
                  label={item.badgeContent}
                  color={item.badgeColor || 'primary'}
                  sx={{
                    '& .MuiChip-label': {
                      px: 2.5,
                      lineHeight: 1.385,
                      textTransform: 'capitalize'
                    }
                  }}
                />
              ) : null}
            </MenuItemTextMetaWrapper>
          </MenuNavLink>
        </ListItem>
      </Tooltip>
    </CanViewNavLink>
  )
}

export default VerticalNavLink
