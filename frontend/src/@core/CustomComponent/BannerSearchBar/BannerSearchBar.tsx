import React, { useState } from 'react'
import { Box, Button, IconButton, InputAdornment, TextField, Tooltip, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { useHeaderFooterVisibility } from 'src/@core/context/HeaderFooterContextVisibility'

type SearchBoxType = {
  placeHolderTitle?: string
  searchText?: string
  locationText?: string
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleClearSearch?: () => void
  type?: string
  handleNavigation?: (jobTitle: string | null, location: string | null) => void
}

const BannerSearchBar = ({
  placeHolderTitle,
  searchText,
  handleClearSearch,
  handleInputChange,
  locationText,
  type,
  handleNavigation
}: SearchBoxType) => {
  const theme = useTheme()
  const { searchValue, setSearchVisible } = useHeaderFooterVisibility()
  const [jobTitle, setJobTitle] = useState<string | null>(searchValue?.jobTitle)
  const [location, setLocation] = useState<string | null>(searchValue?.location)
  const [errors, setErrors] = useState<{ jobTitle: boolean; location: boolean }>({
    jobTitle: false,
    location: false
  })

  const handleSearch = () => {
    const isBothFieldsEmpty = !jobTitle?.trim() && !location?.trim()

    if (isBothFieldsEmpty) {
      setErrors({ jobTitle: true, location: true })

      return
    }

    setErrors({ jobTitle: false, location: false })
    handleNavigation?.(jobTitle, location)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },

          // flexDirection: 'column',
          borderRadius: '50px',

          // margin: { lg: '0 126px', md: '0 50px', xs: '0 16px' },
          margin: type === 'outerBanner' ? '0 auto' : { lg: '0 126px', md: '0 50px', xs: '0 16px' },
          backgroundColor: '#fff',
          alignItems: 'center',
          height: { xs: 'auto', sm: '72px' },
          padding: { xs: '16px', sm: '0 32px' },
          gap: { xs: '16px', sm: '0' },
          boxShadow: theme.shadows[3]
        }}
      >
        <TextField
          fullWidth
          variant='outlined'
          value={jobTitle || ''}
          onChange={e => setJobTitle(e?.target?.value)}
          placeholder='Job title, keyword, skill, Role, Company'
          className='banner-search'
          autoComplete='off'
          error={errors.jobTitle}
          helperText={errors.jobTitle ? 'Job title is required' : ''}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <span className='icon-search-normal-1' style={{ color: '#3F41D1' }}></span>
              </InputAdornment>
            ),
            endAdornment: searchText ? (
              <InputAdornment position='end'>
                <IconButton disableFocusRipple disableRipple disableTouchRipple onClick={handleClearSearch}>
                  <span className='icon-close-circle'></span>
                </IconButton>
              </InputAdornment>
            ) : null
          }}
          inputProps={{
            style: {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }
          }}
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              borderRight: { xs: 'none', sm: '1px solid #ccc' },
              borderRadius: '50px',
              height: { xs: '48px', sm: '30px' }
            },
            '& .MuiInputBase-root': {
              borderRadius: 0
            }
          }}
          onInput={(e: any) => {
            const value = e.target.value.replace(/[^a-zA-Z ]/g, '')
            e.target.value = value
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
        />

        <TextField
          fullWidth
          variant='outlined'
          value={location || ''}
          className='banner-search'
          onChange={e => setLocation(e?.target?.value)}
          placeholder='City, Location'
          autoComplete='off'
          error={errors.location}
          helperText={errors.location ? 'Location is required' : ''}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <span className='icon-location' style={{ color: '#3F41D1' }}></span>
              </InputAdornment>
            ),
            endAdornment: locationText ? (
              <InputAdornment position='end'>
                <IconButton disableFocusRipple disableRipple disableTouchRipple>
                  <span className='icon-close-circle'></span>
                </IconButton>
              </InputAdornment>
            ) : null
          }}
          inputProps={{
            style: {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }
          }}
          sx={{
            flex: 1,
            '&.MuiFormControl-root': {
              padding: { xs: '12px', sm: '16.5px 49px' }
            },
            '& .MuiOutlinedInput-root': {
              height: { xs: '48px', sm: '30px' }
            }
          }}
          onInput={(e: any) => {
            const value = e.target.value.replace(/[^a-zA-Z ]/g, '')
            e.target.value = value
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
        />

        <Button
          variant='contained'
          color='primary'
          sx={{
            width: { xs: '100%', sm: 'auto' },
            height: { xs: '48px', sm: 'auto' },
            fontSize: { lg: '14px', sm: '16px' }
          }}
          onClick={handleSearch}
        >
          Search Job
        </Button>
      </Box>
    </>
  )
}

export default BannerSearchBar
