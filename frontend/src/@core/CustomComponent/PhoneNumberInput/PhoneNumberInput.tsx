import React, { useEffect, useState } from 'react'
import {
  TextField,
  MenuItem,
  InputAdornment,
  Box,
  Typography,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel
} from '@mui/material'
import { borderBottom, color, display, fontSize, lineHeight, minWidth, styled } from '@mui/system'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { postRequest } from 'src/services/apiService'
import FlagIcon from '../../../../public/images/IndiaFlag.svg'

// Sample country codes and flags
const countryCodes = [
  { code: '+91', flag: 'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg', label: 'India' },
  { code: '+1', flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg', label: 'USA' },
  { code: '+44', flag: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg', label: 'UK' }
]

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    padding: '8px 12px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.customColors.text3
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.dark
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.customColors.mainText
    },
    '&::before': {
      borderBottom: '0px',
      borderRight: `1px solid ${theme.palette.customColors.text3}`,
      bottom: '13px',
      right: '-3px'
    },
    '&:hover::before': {
      borderBottom: '0px',
      borderRight: `1px solid ${theme.palette.customColors.text3}`,
      bottom: '13px',
      right: '-3px'
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: '0px'
    },
    '&.Mui-focused::after': {
      borderBottom: '0px'
    },
    '&.Mui-disabled': {
      '& .MuiSelect-select.MuiSelect-standard.MuiInputBase-input': {
        color: theme.palette.customColors.text3
      },
      '& .MuiSvgIcon-root': {
        color: theme.palette.customColors.text3
      }
    },
    '& .MuiSelect-select.MuiSelect-standard.MuiInputBase-input': {
      minWidth: '0px !important',
      paddingRight: '13px',
      display: 'flex',
      alignItems: 'center',
      '& img': {
        width: 24,
        height: 24,
        marginRight: 8
      }
    }
  },
  '& .MuiFormHelperText-root': {
    lineHeight: '18px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
}))

type PhoneNumber = {
  label?: any
  helperText?: boolean
  required?: boolean
  rowData?: any
  disabled?: boolean
  onMobileNumberChange?: (mobileNumber: string) => void
  name?: string
  disableCountryCode?: boolean
}

const PhoneNumberInput = ({
  label,
  helperText,
  required,
  rowData,
  disabled,
  onMobileNumberChange,
  name,
  disableCountryCode = false
}: PhoneNumber) => {
  const [countryCode, setCountryCode] = useState('+91')
  const [phoneNumber, setPhoneNumber] = useState(rowData)
  const [error, setError] = useState('')

  const handleCountryChange = (event: SelectChangeEvent) => {
    setCountryCode(event.target.value as string)
  }

  useEffect(() => {
    setPhoneNumber(rowData)
  }, [rowData])

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhoneNumber(value)
      if (value.length === 10) {
        setError('')
      } else {
        setError('Please enter a 10-digit phone number.')
      }

      if (onMobileNumberChange) {
        onMobileNumberChange(value)
      }
    }
  }

  return (
    <Box>
      <CustomTextField
        name={name}
        variant='outlined'
        value={phoneNumber}
        label={label}
        onChange={handlePhoneNumberChange}
        placeholder='Phone Number'
        required={required}
        disabled={disabled}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Select
                value={countryCode}
                onChange={handleCountryChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Country code' }}
                sx={{ display: 'flex', alignItems: 'center', marginRight: 1 }}
                IconComponent={ArrowDropDownIcon}
                variant='standard'
                disabled={disableCountryCode}
              >
                {countryCodes.map(country => (
                  <MenuItem key={country.code} value={country.code} sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={country.flag}
                      alt={country.label}
                      style={{ width: '24px', height: '24px', marginRight: 8 }}
                    />
                    {country.code}
                  </MenuItem>
                ))}
              </Select>
            </InputAdornment>
          )
        }}
        fullWidth
        error={!!error}
        helperText={helperText ? error || `${phoneNumber.length}/10` : null}
      />
    </Box>
  )
}

export default PhoneNumberInput
