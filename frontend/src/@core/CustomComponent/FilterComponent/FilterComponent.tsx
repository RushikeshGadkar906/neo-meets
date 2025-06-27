import React, { useEffect, useState } from 'react'
import { Box, borderRadius, fontWeight, minWidth } from '@mui/system'
import { Button, Tabs, Typography, Stack, Chip, TextField, InputAdornment, Divider, Drawer } from '@mui/material'
import Tab, { TabProps } from '@mui/material/Tab'
import { styled } from '@mui/system'
import UserIcon from 'src/layouts/components/UserIcon'
import Badge, { BadgeProps } from '@mui/material/Badge'
import { getRequest } from 'src/services/apiService'
import { useAppDispatch, useAppSelector } from 'src/store'
import { setJobFilters } from 'src/slice/jobsSlice'

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  minWidth: '200px',
  '& .MuiTab-root': {
    minWidth: '200px'
  },
  '& .MuiTabs-vertical': {
    minWidth: '200px'
  },
  '& .MuiTabs-scroller': {
    marginRight: 10
  }
}))
const StyledTab = styled((props: TabProps) => <Tab {...props} />)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '20px',
  color: '#484646',
  backgroundColor: '#fff',
  borderRadius: '8px',
  minHeight: '40px',
  marginBottom: theme.spacing(1),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: theme.spacing(3),
  padding: '10px 12px',
  '& .MuiTab-iconWrapper': {
    marginBottom: 0,
    color: theme.palette.text.primary
  },
  '& .MuiTypography-root': {
    fontWeight: `500 !important`,
    fontSize: '14px !important',
    lineHeight: '21px !important',
    color: theme.palette.customColors.mainText
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.customColors.primaryLightest,
    color: theme.palette.customColors.mainText
  },
  '&:hover': {
    boxShadow: 'none'
  }
}))

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  }
}

const StyledChipProps = styled(Chip)(({ theme }) => ({
  '&.MuiChip-colorPrimary': {
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: '8px',
    padding: '9px 24px',
    background: '#4849DA14 !important',
    color: '#4849DA !important'
  },
  '&.MuiChip-colorDefault': {
    border: `1px solid ${theme.palette.grey[300]} !important`,
    borderRadius: '8px',
    padding: '9px 20px',
    background: `${theme.palette.customColors.text6} !important`,
    color: `${theme.palette.customColors.mainText} `
  }
}))

interface FilterProps {
  filterOpen?: null
  setFilterOpen?: any
  setFilter?: any
  setFilterOption?: any
  filterOption?: any
  isDrawerOpen: boolean
  toggleDrawer: any
}

export default function FilterComponent(props: FilterProps) {
  const { filterOpen, setFilterOpen, setFilter, setFilterOption, filterOption, isDrawerOpen, toggleDrawer } = props
  const [accordionData, setAccordionData] = useState<any[]>([])
  const { Location, Department, Company } = useAppSelector((state: any) => state.jobFilter)
  const jobFilter = useAppSelector((state: any) => state.jobFilter)
  const [selectedLocation, setSelectedLocation] = useState<any[]>(Location)
  const [selectedCompany, setSelectedCompany] = useState<any[]>(Company)
  const [selectedDepartment, setSelectedDepartment] = useState<any[]>(Department)
  const [value, setValue] = React.useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const [searhRole, setSearchRole] = useState<string>('')

  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response: any = await getRequest({
          url: '/srs-master/getFilterPageMaster'
        })
        const { status, data } = response
        if (status === 200) {
          setAccordionData([
            {
              title: 'Location',
              options: data?.locations?.map((option: { location: string; _id: string }) => ({
                label: option.location,
                value: option._id
              })),
              showSearchBox: false
            },
            {
              title: 'Company',
              options: data?.organizations?.map((option: { organization: string; _id: string }) => ({
                label: option.organization,
                value: option._id
              })),
              showSearchBox: true,
              searchPlaceholder: 'Search Company'
            },
            {
              title: 'Department',
              options: data?.departments?.map((option: { department: string; _id: string }) => ({
                label: option.department,
                value: option._id
              })),
              showSearchBox: true,
              searchPlaceholder: 'Search Department'
            }
          ])
        }
      } catch (err) {
        console.error('Error fetching filter options', err)
      }
    }

    fetchFilterOptions()
  }, [])

  const open = Boolean(filterOpen)
  const id = open ? 'simple-popover' : undefined

  const handleToggle = (category: string, value: any) => {
    let updatedSelection
    switch (category) {
      case 'Location':
        updatedSelection = selectedLocation.includes(value)
          ? selectedLocation.filter((item: any) => item !== value)
          : [...selectedLocation, value]
        setSelectedLocation(updatedSelection)
        break
      case 'Company':
        updatedSelection = selectedCompany.includes(value)
          ? selectedCompany.filter((item: any) => item !== value)
          : [...selectedCompany, value]
        setSelectedCompany(updatedSelection)
        break
      case 'Department':
        updatedSelection = selectedDepartment.includes(value)
          ? selectedDepartment.filter((item: any) => item !== value)
          : [...selectedDepartment, value]
        setSelectedDepartment(updatedSelection)
        break
      default:
        break
    }
  }

  const handleClearAll = () => {
    setSelectedLocation([])
    setSelectedCompany([])
    setSelectedDepartment([])
    dispatch(
      setJobFilters({
        Location: [],
        Company: [],
        Department: []
      })
    )
  }

  const applyJobFilter = () => {
    dispatch(
      setJobFilters({
        Location: selectedLocation,
        Company: selectedCompany,
        Department: selectedDepartment
      })
    )
    toggleDrawer(false)({ type: 'click' })
  }

  return (
    <>
      <Drawer
        anchor='right'
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ '.MuiDrawer-paper': { maxWidth: '750px' } }}
        disablePortal
      >
        <Box sx={{ p: '16px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
            <Typography
              color={'customColors.mainText'}
              style={{ lineHeight: '30px', fontWeight: 500 }}
              sx={{ p: 2 }}
              variant='h6'
            >
              Filters
            </Typography>
            <Button style={{ color: '#666' }} onClick={handleClearAll}>
              Clear Filter
            </Button>
          </Stack>
          <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
            <StyledTabs
              orientation='vertical'
              variant='scrollable'
              value={value}
              onChange={handleChange}
              aria-label='Vertical tabs example'
            >
              <StyledTab
                icon={<span className='icon-filter-search'></span>}
                label={
                  <Stack direction='row' justifyContent='space-between' alignItems='center' flex='1'>
                    <Typography>Location</Typography>
                    <Badge badgeContent={selectedLocation.length} color='secondary' sx={{ marginRight: '10px' }} />
                  </Stack>
                }
                {...a11yProps(0)}
              />
              <StyledTab
                icon={<span className='icon-slider-horizontal'></span>}
                label={
                  <Stack direction='row' justifyContent='space-between' alignItems='center' flex='1'>
                    <Typography>Company</Typography>
                    <Badge badgeContent={selectedCompany?.length} color='secondary' sx={{ marginRight: '10px' }} />
                  </Stack>
                }
                {...a11yProps(1)}
              />
              <StyledTab
                icon={<span className='icon-sticker'></span>}
                label={
                  <Stack direction='row' justifyContent='space-between' alignItems='center' flex='1'>
                    <Typography>Department</Typography>
                    <Badge badgeContent={selectedDepartment?.length} color='secondary' sx={{ marginRight: '10px' }} />
                  </Stack>
                }
                {...a11yProps(2)}
              />
            </StyledTabs>
            <Divider sx={{ ml: 3, mr: 3 }} orientation='vertical' flexItem />

            <TabPanel value={value} index={0}>
              <Box sx={{ maxHeight: 'calc(100vh - 150px)', overflow: 'auto' }}>
                <Stack direction='column' spacing={2}>
                  <TextField
                    value={searhRole}
                    placeholder='Search here...'
                    onChange={e => setSearchRole(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <UserIcon icon='mdi:magnify' />
                        </InputAdornment>
                      )
                    }}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '50px',
                        height: '40px'
                      }
                    }}
                  />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {accordionData[0]?.options
                      ?.filter((option: any) => option.label.toLowerCase().includes(searhRole.toLowerCase()))
                      .map((option: any, index: any) => (
                        <StyledChipProps
                          key={index}
                          label={option.label}
                          clickable
                          onClick={() => handleToggle('Location', option.value)}
                          color={selectedLocation.includes(option.value) ? 'primary' : 'default'}
                          variant='filled'
                        />
                      ))}
                  </div>
                </Stack>
              </Box>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <Box sx={{ maxHeight: 'calc(100vh - 150px)', overflow: 'auto' }}>
                <Stack direction='column' spacing={2}>
                  <TextField
                    value={searhRole}
                    placeholder='Search here...'
                    onChange={e => setSearchRole(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <UserIcon icon='mdi:magnify' />
                        </InputAdornment>
                      )
                    }}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '50px',
                        height: '40px'
                      }
                    }}
                  />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {accordionData[1]?.options
                      ?.filter((option: any) => option.label.toLowerCase().includes(searhRole.toLowerCase()))
                      .map((option: any, index: any) => (
                        <StyledChipProps
                          key={index}
                          label={option.label}
                          clickable
                          onClick={() => handleToggle('Company', option.value)}
                          color={selectedCompany.includes(option.value) ? 'primary' : 'default'}
                          variant='filled'
                        />
                      ))}
                  </div>
                </Stack>
              </Box>
            </TabPanel>

            <TabPanel value={value} index={2}>
              <Box sx={{ maxHeight: 'calc(100vh - 150px)', overflow: 'auto' }}>
                <Stack direction='column' spacing={2}>
                  <TextField
                    value={searhRole}
                    placeholder='Search here...'
                    onChange={e => setSearchRole(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <UserIcon icon='mdi:magnify' />
                        </InputAdornment>
                      )
                    }}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '50px',
                        height: '40px'
                      }
                    }}
                  />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {accordionData[2]?.options
                      ?.filter((option: any) => option.label.toLowerCase().includes(searhRole.toLowerCase()))
                      .map((option: any, index: any) => (
                        <StyledChipProps
                          key={index}
                          label={option.label}
                          clickable
                          onClick={() => handleToggle('Department', option.value)}
                          color={selectedDepartment.includes(option.value) ? 'primary' : 'default'}
                          variant='filled'
                        />
                      ))}
                  </div>
                </Stack>
              </Box>
            </TabPanel>
          </Box>
          <Stack direction='row' justifyContent='end' spacing={2} mt={2} sx={{ alignSelf: 'flex-end' }}>
            <Button variant='outlined' color='inherit' onClick={toggleDrawer(false)}>
              Cancel
            </Button>
            <Button variant='contained' onClick={applyJobFilter}>
              Apply
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  )
}
