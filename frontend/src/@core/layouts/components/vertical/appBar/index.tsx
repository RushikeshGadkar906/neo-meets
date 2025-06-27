// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar'
import MuiToolbar, { ToolbarProps } from '@mui/material/Toolbar'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { useHeaderFooterVisibility } from 'src/@core/context/HeaderFooterContextVisibility'
import { useRouter } from 'next/router'
import { Box } from '@mui/material'
import BannerSearchBar from 'src/@core/CustomComponent/BannerSearchBar/BannerSearchBar'
import { useAppDispatch, useAppSelector } from 'src/store'
import { usePathname } from 'next/navigation'
import { setJobFilters } from 'src/slice/jobsSlice'

interface Props {
  hidden: LayoutProps['hidden']
  toggleNavVisibility: () => void
  settings: LayoutProps['settings']
  saveSettings: LayoutProps['saveSettings']
  appBarContent: NonNullable<LayoutProps['verticalLayoutProps']['appBar']>['content']
  appBarProps: NonNullable<LayoutProps['verticalLayoutProps']['appBar']>['componentProps']
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  transition: 'none',
  alignItems: 'center',

  // width: '100vw',
  width: '100%',

  // zIndex: 1234,
  // marginLeft: '-148px',
  overflowX: 'hidden',
  justifyContent: 'center',

  // padding: theme.spacing(0, 16),
  padding: theme.spacing(0, 8),
  backgroundColor: '#ffffff',
  color: theme.palette.text.primary,

  // minHeight: theme.mixins.toolbar.minHeight,
  // minHeight: '100px',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    marginLeft: '0px'
  },
  [theme.breakpoints.down('lg')]: {
    marginLeft: '0px'
  }
}))

const Toolbar = styled(MuiToolbar)<ToolbarProps>(({ theme }) => ({
  width: '100%',
  padding: '0 !important',
  borderBottomLeftRadius: theme.shape.borderRadius,
  borderBottomRightRadius: theme.shape.borderRadius,
  minHeight: `${theme.mixins.toolbar.minHeight}px !important`,
  transition: 'padding .25s ease-in-out, box-shadow .25s ease-in-out, background-color .25s ease-in-out'
}))

const LayoutAppBar = (props: Props) => {
  // ** Props
  const { settings, appBarProps, appBarContent: userAppBarContent } = props

  // ** Hooks
  const theme = useTheme()
  const { isVisible, setVisibility } = useHeaderFooterVisibility()
  const scrollTrigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true
  })

  // ** Vars
  const { skin, appBar, appBarBlur, contentWidth } = settings
  const router = useRouter()
  const { showSearchBar } = useAppSelector((state: any) => state.jobFilter)
  const pathName = usePathname()
  const dispatch = useAppDispatch()
  const { searchValue, setSearchVisible } = useHeaderFooterVisibility()
  const { isAuthenticated } = useAppSelector((state: any) => state.login.auth)
  const isProfileRoute =
    router.pathname === '/profile' ||
    router.pathname === '/profile/personal-information/' ||
    router.pathname === '/profile/education/' ||
    router.pathname === '/profile/work-experience/' ||
    router.pathname === '/profile/skills/'
  const isHomepageRoute = router.pathname === '/' || router.pathname === '/find-jobs'

  // const isLoginRoute = router.pathname === '/' || router.pathname === '/find-jobs/'

  const appBarFixedStyles = () => {
    return {
      boxShadow: 'none',
      backgroundColor: 'transperent',
      ...(skin === 'bordered' && {
        border: `1px solid ${theme.palette.divider}`,
        borderTopWidth: 0
      })
    }
  }

  const handleNavigation = (jobTitle: string | null, location: string | null) => {
    setSearchVisible({ location: location, jobTitle: jobTitle })
    dispatch(
      setJobFilters({
        Location: [],
        Company: [],
        Department: [],
        showSearchBar: true
      })
    )
    if (!pathName.startsWith('/find-jobs/')) {
      router.push(`/find-jobs/`)
    }
  }
  dispatchEvent

  if (appBar === 'hidden') {
    return null
  }

  let userAppBarStyle = {}
  if (appBarProps && appBarProps.sx) {
    userAppBarStyle = appBarProps.sx
  }
  const userAppBarProps = Object.assign({}, appBarProps)
  delete userAppBarProps.sx

  return (
    <>
      {!isVisible && (
        <AppBar
          elevation={0}
          color='default'
          className='layout-navbar'
          sx={{
            borderRadius: isProfileRoute ? '10px' : 0,
            minHeight: isHomepageRoute ? '80px' : '100px',
            ...userAppBarStyle
          }}
          position={appBar === 'fixed' ? 'sticky' : 'static'}
          {...userAppBarProps}
        >
          <Toolbar
            className='navbar-content-container'
            sx={{
              minHeight: isHomepageRoute ? '80px !important' : '100px !important',
              ...(appBar === 'fixed' && scrollTrigger && { ...appBarFixedStyles() }),
              ...(contentWidth === 'boxed' && {
                '@media (min-width:1440px)': { maxWidth: '100%' }
              })
            }}
          >
            {(userAppBarContent && userAppBarContent(props)) || null}
          </Toolbar>
          {pathName !== '/' && showSearchBar && (
            <>
              <Box sx={{ width: '100%', my: '24px' }}>
                <BannerSearchBar handleNavigation={handleNavigation} type='outerBanner' />
              </Box>
            </>
          )}
        </AppBar>
      )}
    </>
  )
}

export default LayoutAppBar
