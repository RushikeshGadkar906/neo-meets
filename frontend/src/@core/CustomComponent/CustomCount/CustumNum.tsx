import React, { useState } from 'react'
import { Stack, Button, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

interface CustomProps {
  fieldMode: 'light' | 'dark'
}

const CustomStack = styled(Stack)<CustomProps>(({ theme, fieldMode }) => ({
  backgroundColor:
    fieldMode === 'dark' ? theme.palette.customColors.primaryLightest : theme.palette.primary.contrastText,
  alignItems: 'center',
  width: 'fit-content',
  borderRadius: '10px'
}))

const CustomButton = styled(Button)<CustomProps>(({ theme, fieldMode }) => ({
  '&:hover': {
    backgroundColor: 'transparent'
  },
  fontSize: '24px',
  color: fieldMode === 'dark' ? theme.palette.primary.dark : theme.palette.customColors.text2
}))

const CustomTextField = styled(TextField)<CustomProps>(({ theme, fieldMode }) => ({
  width: '100px',
  padding: '6px 15px',
  borderRadius: '10px',
  textAlign: 'center',
  marginLeft: 0,
  borderColor: fieldMode === 'dark' ? theme.palette.primary.dark : theme.palette.customColors.mainText,
  backgroundColor:
    fieldMode === 'dark' ? theme.palette.customColors.primaryLightest : theme.palette.primary.contrastText,
  color: fieldMode === 'dark' ? theme.palette.primary.dark : theme.palette.customColors.text2
}))

type countNumMode = {
  mode: 'light' | 'dark'
}

const CountNum = ({ mode }: countNumMode) => {
  //const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)

  return (
    <CustomStack direction='row' spacing={2} fieldMode={mode} sx={{ maxWidth: '200px' }}>
      <CustomButton variant='text' onClick={decrement} fieldMode={mode} sx={{ p: '0', minWidth: '40px' }}>
        -
      </CustomButton>
      <CustomTextField
        hiddenLabel
        id='outlined-basic'
        variant='outlined'
        value={count}
        fieldMode={mode}
        sx={{
          '& .MuiInputBase-root.MuiOutlinedInput-root': {
            height: '32px',
            borderRadius: '10px',

            '& .MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputHiddenLabel': {
              color: mode === 'dark' ? 'primary.dark' : 'customColors.mainText'
            },
            '& .MuiOutlinedInput-notchedOutline.MuiOutlinedInput-notchedOutline': {
              borderColor: mode === 'dark' ? 'primary.dark' : 'customColors.text3'
            }
          }
        }}
      />
      <CustomButton variant='text' onClick={increment} fieldMode={mode} sx={{ p: '0', minWidth: '40px' }}>
        +
      </CustomButton>
    </CustomStack>
  )
}

export default CountNum
