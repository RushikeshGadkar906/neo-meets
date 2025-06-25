import React, { useState, MouseEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Icon Imports
import Image from 'next/image'
import Logo from '../../../../public/images/hubblehox_logo.svg'
import Logo2 from '../../../../public/images/Vibgyor Group of Schools - Logo.png'
import { usePathname } from 'next/navigation'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components

import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import {
  Button,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  styled,
  Typography,
  Tooltip,
  Popover,
  Divider,
  Backdrop,
  Chip
} from '@mui/material'
import UserIcon from '../UserIcon'
import NotificationDropdown, {
  NotificationsType
} from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import ShortcutsDropdown, { ShortcutsType } from 'src/@core/layouts/components/shared-components/ShortcutsDropdown'
import Breadcrumb from '../breadcrumbs/Breadcrumb'
import Logout from 'src/@core/layouts/components/shared-components/Logout'
import KnowledgeBase from 'src/@core/layouts/components/shared-components/KnowledgeBase'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import Link from 'next/link'
import CandidateRegistration from 'src/OwnComponents/Registration/Registration'
import { useRouter } from 'next/router'
import { useHeaderFooterVisibility } from 'src/@core/context/HeaderFooterContextVisibility'
import SearchBox from 'src/@core/CustomComponent/CustomSearchBox/SearchBox'
import NavSearchBar from 'src/OwnComponents/NavSearchBar/NavSearchBar'
import BannerSearchBar from 'src/@core/CustomComponent/BannerSearchBar/BannerSearchBar'
import { getRequest } from 'src/services/apiService'
import { useAppDispatch, useAppSelector } from 'src/store'
import { setJobFilters } from 'src/slice/jobsSlice'
import { setAuth } from 'src/slice/authSlice'

interface Props {
  hidden?: boolean
  href?: string
  passHref?: boolean
  settings?: Settings
  toggleNavVisibility?: () => void
  saveSettings?: (values: Settings) => void
  active?: boolean
}

const LinkItems = styled(Typography)<Props>(({ theme, active }) => ({
  fontWeight: 400,

  // color: 'text.primary',

  // lineHeight: '24px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  textDecoration: active ? 'underline' : 'none',
  textUnderlineOffset: active ? '10px' : '0',
  textDecorationThickness: active ? '1.5px' : 'auto',
  height: '31px',
  color: active ? theme.palette.primary.main : theme.palette.text.primary
}))

const HrefLink = styled(Link)<Props>(({ theme, active }) => ({
  textDecoration: active ? 'underline' : 'none',
  color: active ? theme.palette.primary.main : theme.palette.text.primary
}))

const notifications: NotificationsType[] = [
  {
    meta: 'Today',
    avatarAlt: 'Flora',
    title: 'Congratulation Flora! 🎉',
    avatarImg: '/images/avatars/4.png',
    subtitle: 'Won the monthly best seller badge'
  },
  {
    meta: 'Yesterday',
    avatarColor: 'primary',
    subtitle: '5 hours ago',
    avatarText: 'Robert Austin',
    title: 'New user registered.'
  },
  {
    meta: '11 Aug',
    avatarAlt: 'message',
    title: 'New message received 👋🏻',
    avatarImg: '/images/avatars/5.png',
    subtitle: 'You have 10 unread messages'
  },
  {
    meta: '25 May',
    title: 'Paypal',
    avatarAlt: 'paypal',
    subtitle: 'Received Payment',
    avatarImg: '/images/misc/paypal.png'
  },
  {
    meta: '19 Mar',
    avatarAlt: 'order',
    title: 'Received Order 📦',
    avatarImg: '/images/avatars/3.png',
    subtitle: 'New order received from John'
  },
  {
    meta: '27 Dec',
    avatarAlt: 'chart',
    subtitle: '25 hrs ago',
    avatarImg: '/images/misc/chart.png',
    title: 'Finance report has been generated'
  }
]

const shortcuts: ShortcutsType[] = [
  {
    title: 'Calendar',
    url: '/apps/calendar',
    subtitle: 'Appointments',
    icon: 'mdi:calendar-month-outline'
  },
  {
    title: 'Invoice App',
    url: '/apps/invoice/list',
    subtitle: 'Manage Accounts',
    icon: 'mdi:receipt-text-outline'
  },
  {
    title: 'Users',
    url: '/apps/user/list',
    subtitle: 'Manage Users',
    icon: 'mdi:account-outline'
  },
  {
    url: '/apps/roles',
    title: 'Role Management',
    subtitle: 'Permissions',
    icon: 'mdi:shield-check-outline'
  },
  {
    url: '/',
    title: 'Dashboard',
    icon: 'mdi:chart-pie',
    subtitle: 'User Dashboard'
  },
  {
    title: 'Settings',
    icon: 'mdi:cog-outline',
    subtitle: 'Account Settings',
    url: '/pages/account-settings/account'
  },
  {
    title: 'Help Center',
    subtitle: 'FAQs & Articles',
    icon: 'mdi:help-circle-outline',
    url: '/pages/help-center'
  },
  {
    title: 'Dialogs',
    subtitle: 'Useful Dialogs',
    icon: 'mdi:window-maximize',
    url: '/pages/dialog-examples'
  }
]

// Styled button to handle text truncation
const TruncatedButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '200px' // specify your fixed width
}))

const MenuItemPopover = styled(Popover)(({ theme }) => ({
  top: '32px',
  '& .MuiPaper-root': {
    padding: '24px'
  },
  '& .MuiMenuItem-root': {
    padding: '16px 0 0',
    textWrap: 'auto',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  '& .MuiTypography-h6': { fontSize: '20px !important', fontWeight: '500' }
}))

const MenuBox = styled(Box)(({ theme }) => ({
  width: 'auto',
  minWidth: 'auto',
  maxWidth: '211px'
}))

const SearchBarWrapper = styled(Box)(({ theme }) => ({
  transition: 'opacity 0.3s ease, visibility 0.3s ease',
  opacity: 1,
  visibility: 'visible',
  '&.hidden': {
    opacity: 0,
    visibility: 'hidden'
  }
}))

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  const pathName = usePathname()
  const theme = useTheme()

  //Hanlder and state for dropdown school list
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { isVisible, setVisibility, searchValue, setSearchVisible } = useHeaderFooterVisibility()
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [showRegister, setShowRegister] = useState(false)
  const [backdropOpen, setBackdropOpen] = useState(false)
  const [showNavItems, setShowNavItems] = useState(true)
  const [accordionData, setAccordionData] = useState<any>({})
  const open = Boolean(anchorEl)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const jobFilter = useAppSelector((state: any) => state.jobFilter)
  const { showSearchBar } = useAppSelector((state: any) => state.jobFilter)
  const { isAuthenticated, first_name, last_name } = useAppSelector((state: any) => state.login.auth)
  const { id } = router.query

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setIsExpanded(prev => !prev)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setIsExpanded(false)
  }
  const handleMenuItemClick = (value: string) => {
    console.log('Selected:', value)
    handleClose()
  }
  const handleRegisterClick = () => {
    router.push('/sign-in')
  }
  const handleMouseEnter = (event: { currentTarget: React.SetStateAction<HTMLElement | null> }) => {
    setAnchorEl(event.currentTarget)
    setBackdropOpen(true)
  }

  const handleMouseLeave = () => {
    setAnchorEl(null)
    setBackdropOpen(false)
  }
  const handleSearchFocus = () => {
    setShowNavItems(false)
    dispatch(
      setJobFilters({
        ...jobFilter,
        showSearchBar: true
      })
    )
  }
  const handleCloseSearch = () => {
    setShowNavItems(false)
    setSearchVisible({ location: null, jobTitle: null })
    dispatch(
      setJobFilters({
        ...jobFilter,
        showSearchBar: false
      })
    )
  }

  const handleSearchBlur = () => {
    setShowNavItems(true)
  }

  const pathname = usePathname()

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response: any = await getRequest({
          url: '/srs-master/getFilterPageMaster'
        })
        const { status, data } = response
        if (status === 200) {
          setAccordionData(data)
        }
      } catch (err) {
        console.error('Error fetching filter options', err)
      }
    }

    fetchFilterOptions()
  }, [])

  const handleNavigation = (type: string, id?: number) => {
    const filterConfig: Record<string, { filters: any; queryParam: string }> = {
      'all jobs': {
        filters: { Company: [], Department: [], Location: [] },
        queryParam: 'type=All Jobs'
      },
      location: {
        filters: { Company: [], Department: [], Location: id ? [id] : [] },
        queryParam: `location=${id}`
      },
      company: {
        filters: { Company: id ? [id] : [], Department: [], Location: [] },
        queryParam: `company=${id}`
      },
      department: {
        filters: { Company: [], Department: id ? [id] : [], Location: [] },
        queryParam: `department=${id}`
      }
    }

    const config = filterConfig[type.toLowerCase()]
    if (config) {
      dispatch(setJobFilters(config.filters))
      router.push(`/find-jobs?${config.queryParam}`)
      setSearchVisible({ location: null, jobTitle: null })
    } else {
      console.error('Invalid navigation type')
    }
  }

  const navToHome = () => {
    router.push('/')
    setSearchVisible({ location: null, jobTitle: null })
    dispatch(
      setJobFilters({
        ...jobFilter,
        showSearchBar: false
      })
    )
  }

  const isProfileRoute =
    router.pathname === '/profile' ||
    router.pathname === '/profile/personal-information' ||
    router.pathname === '/profile/education' ||
    router.pathname === '/profile/work-experience' ||
    router.pathname === '/profile/skills'

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {!isProfileRoute && (
          <>
            {pathname != '/all-jobs/' &&
              pathname != '/saved-jobs/' &&
              pathname != '/applied-jobs/' &&
              !pathname?.startsWith('/applied-job-details/') &&
              pathname != '/documents/' &&
              pathname != '/book-interview-slot/' &&
              pathname != '/engagement/' &&
              pathname != '/admin/mrf/mrf-listing/' &&
              pathname != '/applied-jobs/offer-letter/' &&
              pathname != '/admin/mrf/view-mrf-details/' &&
              pathname != '/admin/mrf/mrf-assign-position/' &&
              pathname != '/admin/jobListing/' &&
              pathname != '/admin/jobListing/view-job-listing/' &&
              pathname != '/admin/jobListing/jobStatus/' &&
              pathname != '/admin/master/' &&
              pathname != '/admin/master/jdListing/' &&
              pathname != '/admin/mrf/cancelled/' &&
              pathname != '/admin/master/viewJD/' &&
              pathname != '/admin/master/editJD/' &&
              pathname != '/admin/dashboard/candidate-application-status/' &&
              pathname != '/admin/master/jobRoleConfiguration/' &&
              pathname != `/job-details/${router.query.id}` &&
              pathname != `/admin/candidate/candidateApplicationStatus/` &&
              pathname != `/admin/master/addJD/` &&
              pathname != `/admin/jobRole/recruitmentTestMapping/` &&
              pathname != `/admin/jobRole/questionsMapping/` &&
              pathname != `/admin/jobRole/resumeWeightageMapping/` &&
              pathname != `/admin/jobRole/hotncoldMapping/` &&
              pathname != `/admin/jobRole/feedbackMapping/` &&
              pathname != `/admin/master/salarySlab/` &&
              pathname != `/admin/salarySlab/addSalarySlab/` &&
              pathname != `/admin/salarySlab/editSalarySlab/` &&
              pathname != `/admin/interview/allInterview/` &&
              pathname != `/admin/taTeam/` &&
              pathname != `/admin/taTeam/assignedPositionListing/` &&
              pathname != `/admin/interviewMaster/` &&
              pathname != `/admin/interviewMaster/interviewMapping/` &&
              pathname != `/admin/taTeam/closedPositionListing/` &&
              pathname != `/admin/taTeam/pendingPositionListing/` &&
              pathname != `/admin/candidate/candidateList/` &&
              pathname != `/admin/candidate/candidateList/addCandidate/` &&
              pathname != `/admin/candidate/candidateList/candidateDetails/` &&
              pathname != `/interviewer/assignedListing/` &&
              pathname != `/interviewer/viewFeedback/` &&
              pathname != `/interviewer/bookInterviewSlot/` &&
              !pathname?.startsWith(`/admin/interview/feedbackForm/`) &&
              !pathname?.startsWith(`/admin/interviewMaster/editMappedInterview/`) &&
              !pathname?.startsWith(`/admin/interviewMaster/viewMappedInterview/${router.query.id}`) &&
              !pathname?.startsWith('/admin/salarySlab/editSalarySlab/') &&
              !pathname?.startsWith('/admin/master/viewJD/') &&
              !pathname?.startsWith('/admin/salarySlab/viewSalarySlabList/') &&
              !pathname?.startsWith('/admin/master/editJD/') &&
              !pathname?.startsWith('/admin/mrf/mrf-assign-position/') &&
              (pathname != '/job-details/' || !isAuthenticated) && (
                <>
                  <Box onClick={navToHome} sx={{ cursor: 'pointer' }}>
                    <Image alt='Logo' src={Logo} width={245} height={40} />
                  </Box>
                </>
              )}

            {pathname == '/' || pathname == '/find-jobs/' || !isAuthenticated ? (
              <>
                {showSearchBar && pathname != '/' ? (
                  <Box
                    sx={{
                      background: theme.palette.customColors.primarySuperLight,
                      p: '10px',
                      cursor: 'pointer',
                      borderRadius: '50%',
                      display: 'flex'
                    }}
                    onClick={handleCloseSearch}
                  >
                    <span
                      className='icon-close-circle'
                      style={{ color: theme.palette.primary.dark, fontSize: '20px !important' }}
                    ></span>
                  </Box>
                ) : (
                  <>
                    <Box sx={{ display: 'flex', gap: '44px', alignItems: 'center' }}>
                      {pathname !== '/' && (
                        <NavSearchBar
                          placeHolderTitle='Search Jobs Here'
                          handleFocus={handleSearchFocus}
                          handleBlur={handleSearchBlur}
                          searchText={searchValue?.jobTitle}
                        />
                      )}
                      <HrefLink href='/' passHref>
                        <LinkItems variant='subtitle1' active={router.pathname === '/'}>
                          Home
                        </LinkItems>
                      </HrefLink>
                      <Box onMouseEnter={handleMouseEnter} sx={{ cursor: 'pointer' }}>
                        <Typography variant='subtitle1'>Find Jobs</Typography>
                      </Box>
                      <Button
                        variant='contained'
                        color='secondary'
                        onClick={handleRegisterClick}
                        sx={{ lineHeight: 0 }}
                      >
                        Sign In
                      </Button>
                    </Box>
                  </>
                )}
              </>
            ) : (
              <>
                <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                  {hidden ? (
                    <IconButton
                      disableFocusRipple
                      disableRipple
                      color='inherit'
                      sx={{ ml: -2.75 }}
                      onClick={toggleNavVisibility}
                    >
                      <UserIcon icon='mdi:menu' />
                    </IconButton>
                  ) : null}
                  {/* <Image alt='Logo' src={Logo} width={56} height={56} /> */}

                  {/* <ModeToggler settings={settings} saveSettings={saveSettings} /> */}

                  <Box sx={{ marginLeft: '-8px' }}>
                    <Box display={'flex'} gap={'24px'} alignItems={'center'}>
                      {pathname == '/applied-jobs/offer-letter/' && (
                        <>
                          <Box onClick={navToHome} sx={{ cursor: 'pointer' }}>
                            <Image alt='Logo' src={Logo} width={245} height={40} />
                          </Box>
                          <Divider orientation='vertical' flexItem />
                        </>
                      )}

                      <Box>
                        <Box>
                          <Breadcrumb currentPath={pathName} />
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {pathName === '/my-classes/' && (
                    <>
                      <Box sx={{ marginLeft: '10px', mt: -5 }}>
                        <Tooltip title=' School List Here' placement='bottom'>
                          <Button
                            variant='text'
                            color='inherit'
                            onClick={handleClick}
                            disableFocusRipple
                            disableRipple
                            sx={{
                              '&.MuiButtonBase-root.MuiButton-root:hover': {
                                background: theme.palette.common.white
                              },
                              width: '200px'
                            }}
                            endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          >
                            <Typography
                              variant='subtitle1'
                              sx={{
                                fontWeight: 400,
                                color: 'text.primary',
                                lineHeight: '24px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              School List Here
                            </Typography>
                          </Button>
                        </Tooltip>
                        <Menu
                          id='simple-menu'
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          sx={{
                            '&.MuiModal-root.MuiPopover-root.MuiMenu-root .MuiMenu-paper': { minWidth: '200px' }
                          }}
                        >
                          <MenuItem onClick={() => handleMenuItemClick('School List 1')}>School List 1</MenuItem>
                          <MenuItem onClick={() => handleMenuItemClick('School List 2')}>School List 2</MenuItem>
                          <MenuItem onClick={() => handleMenuItemClick('School List 3')}>School List 3</MenuItem>
                        </Menu>
                      </Box>
                    </>
                  )}
                </Box>

                <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center', pr: '10px' }}>
                  {settings && (
                    <>
                      <NotificationDropdown settings={settings} notifications={notifications} />

                      {/* <Logout settings={settings} shortcuts={shortcuts} /> */}

                      {/* <KnowledgeBase settings={settings} shortcuts={shortcuts} /> */}
                      <UserDropdown settings={settings} />
                    </>
                  )}
                </Box>
              </>
            )}
          </>
        )}

        {isProfileRoute && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: '60%', p: '24px 0', textAlign: 'center' }}>
                <Typography variant='h6' sx={{ lineHeight: '22px' }}>
                  {first_name ? `Welcome ${first_name} ${last_name}` : 'Welcome User'}
                </Typography>
                <Typography
                  variant='body1'
                  sx={{ color: theme.palette.customColors.mainText, mt: '16px', lineHeight: '17.6px' }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco
                </Typography>
              </Box>
              {/* <Box sx={{ width: '10%' }}></Box> */}
            </Box>
          </>
        )}
      </Box>
      <Backdrop
        open={backdropOpen}
        onClick={handleClose}
        sx={{
          zIndex: theme => theme.zIndex.drawer - 1,
          backgroundColor: theme => theme.palette.customColors.semiTransparentBlack
        }}
      />
      <MenuItemPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleMouseLeave}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        disableRestoreFocus
        onMouseLeave={handleMouseLeave}
      >
        <Box sx={{ p: 1, minWidth: 150, display: 'flex', gap: '32px' }}>
          <MenuBox>
            <Typography variant='h6' sx={{ color: theme.palette.grey[900] }}>
              All Jobs
            </Typography>
            <MenuItem onClick={() => handleNavigation('all jobs')}>All Jobs</MenuItem>
          </MenuBox>
          <Divider orientation='vertical' flexItem />
          <MenuBox>
            <Typography variant='h6' sx={{ color: theme.palette.grey[900] }}>
              Jobs By Location
            </Typography>
            {accordionData?.locations?.map((item: any, index: any) => {
              return (
                <MenuItem
                  key={'location_' + index}
                  onClick={() => handleNavigation('location', item?._id)}
                >{`Jobs In ${item?.location}`}</MenuItem>
              )
            })}
          </MenuBox>
          <Divider orientation='vertical' flexItem />
          <MenuBox>
            <Typography variant='h6' sx={{ color: theme.palette.grey[900] }}>
              Jobs By Company
            </Typography>
            {accordionData?.organizations?.map((item: any, index: any) => {
              return (
                <MenuItem key={'company_' + index} onClick={() => handleNavigation('company', item?._id)}>
                  {item?.organization}
                </MenuItem>
              )
            })}
          </MenuBox>
          <Divider orientation='vertical' flexItem />
          <MenuBox>
            <Typography variant='h6' sx={{ color: theme.palette.grey[900] }}>
              Jobs By Department
            </Typography>
            {accordionData?.departments?.map((item: any, index: any) => {
              return (
                <MenuItem key={'department_' + index} onClick={() => handleNavigation('department', item?._id)}>
                  {item?.department}
                </MenuItem>
              )
            })}
          </MenuBox>
        </Box>
      </MenuItemPopover>
    </>
  )
}

export default AppBarContent
