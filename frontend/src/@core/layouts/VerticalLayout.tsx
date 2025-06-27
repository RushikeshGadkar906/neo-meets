// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Fab from '@mui/material/Fab'
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'

// ** Components
import AppBar from './components/vertical/appBar'
import Customizer from 'src/@core/components/customizer'
import Navigation from './components/vertical/navigation'
import Footer from './components/shared-components/footer'
import ScrollToTop from 'src/@core/components/scroll-to-top'
import { useTheme } from '@mui/system'
import Sidebar from 'src/OwnComponents/sidebar/Sidebar'
import { useLocation, useNavigation } from 'react-router-dom'
import { useRouter } from 'next/router'
import { RootState, useAppSelector } from 'src/store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { usePathname } from 'next/navigation'

const VerticalLayoutWrapper = styled('div')({
  height: '100%',
  display: 'flex'
})

const MainContentWrapper = styled(Box)<BoxProps>({
  flexGrow: 1,
  minWidth: 0,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column'
})

const ContentWrapper = styled('main')(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  padding: theme.spacing(6),

  // background: '#F5F5F7',
  transition: 'padding .25s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

const VerticalLayout = (props: LayoutProps) => {
  // ** Props
  const { hidden, settings, children, scrollToTop, footerProps, contentHeightFixed, verticalLayoutProps } = props

  // ** Vars
  const { skin, navHidden, contentWidth } = settings
  const { navigationSize, disableCustomizer, collapsedNavigationSize } = themeConfig
  const navWidth = navigationSize
  const navigationBorderWidth = skin === 'bordered' ? 1 : 0
  const collapsedNavWidth = collapsedNavigationSize
  const { isAuthenticated } = useAppSelector((state: any) => state.login.auth)

  const theme = useTheme()
  const dispatch = useDispatch()
  const pathName = usePathname()
  const pathname = usePathname()
  const router = useRouter()
  const { id } = router.query

  // ** States
  const [navVisible, setNavVisible] = useState<boolean>(false)

  // ** Toggle Functions
  const toggleNavVisibility = () => setNavVisible(!navVisible)
  const isProfileRoute =
    router.pathname === '/profile' ||
    router.pathname === '/profile/personal-information' ||
    router.pathname === '/profile/education' ||
    router.pathname === '/profile/work-experience' ||
    router.pathname === '/profile/skills'

  const hideSidebar =
    router.pathname === '/' ||
    router.pathname === '/find-jobs' ||
    isProfileRoute ||
    router.pathname === '/sign-up' ||
    router.pathname === '/sign-in' ||
    router.pathname === '/applied-jobs/offer-letter' ||
    !isAuthenticated

  const showRightSidebar = router.pathname === '/admin/dashboard/candidate-application-status'

  return (
    <>
      <VerticalLayoutWrapper className='layout-wrapper'>
        {!hideSidebar && (
          <>
            {navHidden && !(navHidden && settings.lastLayout === 'horizontal') ? null : (
              <Navigation
                navWidth={navWidth}
                navVisible={navVisible}
                setNavVisible={setNavVisible}
                collapsedNavWidth={collapsedNavWidth}
                toggleNavVisibility={toggleNavVisibility}
                navigationBorderWidth={navigationBorderWidth}
                navMenuContent={verticalLayoutProps.navMenu.content}
                navMenuBranding={verticalLayoutProps.navMenu.branding}
                menuLockedIcon={verticalLayoutProps.navMenu.lockedIcon}
                verticalNavItems={verticalLayoutProps.navMenu.navItems}
                navMenuProps={verticalLayoutProps.navMenu.componentProps}
                menuUnlockedIcon={verticalLayoutProps.navMenu.unlockedIcon}
                afterNavMenuContent={verticalLayoutProps.navMenu.afterContent}
                beforeNavMenuContent={verticalLayoutProps.navMenu.beforeContent}
                {...props}
              />
            )}
          </>
        )}
        <MainContentWrapper
          className='layout-content-wrapper'
          sx={{ padding: isProfileRoute ? '24px' : 0, ...(contentHeightFixed && { maxHeight: '100vh' }) }}
        >
          <AppBar
            toggleNavVisibility={toggleNavVisibility}
            appBarContent={verticalLayoutProps.appBar?.content}
            appBarProps={verticalLayoutProps.appBar?.componentProps}
            {...props}
          />

          <ContentWrapper
            className='layout-page-content'
            id='mainContainer'
            sx={{
              padding: 0,
              ...(contentHeightFixed && {
                overflow: 'hidden',
                '& > :first-of-type': { height: '100%' }
              }),
              ...(contentWidth === 'boxed' && {
                mx: 'auto',
                '@media (min-width:1440px)': { maxWidth: 1440 },
                '@media (min-width:1200px)': { maxWidth: '100%' }
              })
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                flexWrap: 'nowrap'
              }}
            >
              <Box
                sx={{
                  // width: '96%',
                  width: showRightSidebar ? '96%' : '100%',
                  height: '100%'
                }}
              >
                {children}
              </Box>

              {showRightSidebar && (
                <Box
                  sx={{
                    background: theme.palette.common.white,
                    borderRadius: '10px',
                    width: '4%',
                    ml: 3,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginRight: '-19px',
                    position: 'fixed',
                    top: 120,
                    right: 22
                  }}
                >
                  <Sidebar />
                </Box>
              )}
            </Box>
          </ContentWrapper>

          <Footer footerStyles={footerProps?.sx} footerContent={footerProps?.content} {...props} />
        </MainContentWrapper>
      </VerticalLayoutWrapper>

      {/* Customizer */}
      {disableCustomizer || hidden ? null : <Customizer />}

      {/* Scroll to top button */}
      {scrollToTop ? (
        scrollToTop(props)
      ) : (
        <ScrollToTop className='mui-fixed'>
          <Fab color='primary' size='small' aria-label='scroll back to top'>
            <Icon icon='mdi:arrow-up' />
          </Fab>
        </ScrollToTop>
      )}
    </>
  )
}

export default VerticalLayout
