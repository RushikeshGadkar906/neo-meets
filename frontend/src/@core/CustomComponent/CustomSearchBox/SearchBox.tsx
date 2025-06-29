import React, { useState } from 'react'
import { Box, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

type SearchBoxType = {
  placeHolderTitle: string
  searchText?: string
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleClearSearch?: () => void
}

const SearchBox = ({ placeHolderTitle, searchText, handleClearSearch, handleInputChange }: SearchBoxType) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title={placeHolderTitle} disableFocusListener disableTouchListener>
        <TextField
          fullWidth
          variant='outlined'
          value={searchText}
          onChange={handleInputChange}
          placeholder={placeHolderTitle}
          autoComplete='off'
          className='custom-search'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <span className='icon-search-normal-1'></span>
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
        />
      </Tooltip>
    </Box>
  )
}

export default SearchBox
