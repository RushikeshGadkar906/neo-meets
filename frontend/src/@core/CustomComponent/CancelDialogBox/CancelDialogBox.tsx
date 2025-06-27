import { Fragment, useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogContent from '@mui/material/DialogContent'
import {
  Button,
  DialogActions,
  Typography,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField
} from '@mui/material'
import { Box } from '@mui/material'

// Icons
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

// React Hook Form & Yup
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const CloseIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '32px',
  top: '24px',
  cursor: 'pointer',
  '& .icon-close': {
    fontSize: '14px !important'
  }
}))

type FormValues = {
  reason: string
  remark: string
}

type CustomModalProps = {
  openModal: boolean
  closeModal?: () => void
  handleSubmitClose?: (data: FormValues) => void
  title: string
  content: string
  cancelMrf?: (data: FormValues) => void
}

const schema = yup.object({
  reason: yup.string().required('Reason is required'),
  remark: yup.string().required('Remark is required')
})

function CancelDialog({ openModal, closeModal, handleSubmitClose, title, content, cancelMrf }: CustomModalProps) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'))

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      reason: '',
      remark: ''
    }
  })

  const DownArrow = () => <span style={{ color: '#666666' }} className='icon-arrow-down-1'></span>

  const onSubmit = async (data: FormValues) => {
    cancelMrf?.(data)
    reset()
  }

  return (
    <Dialog
      open={openModal}
      onClose={closeModal}
      aria-labelledby='customized-dialog-title'
      fullScreen={fullScreen}
      sx={{
        p: '24px',
        '& .MuiPaper-root': {
          padding: '24px',
          width: '500px'
        }
      }}
    >
      {/* <CloseIcon onClick={closeModal}>
        <span className='icon-close'></span>
      </CloseIcon> */}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h5' id='customized-dialog-title'>
          {title}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent sx={{ p: '8px 0' }}>
          <Typography variant='subtitle1' sx={{ color: theme.palette.customColors.mainText, lineHeight: '100%' }}>
            {content}
          </Typography>
          <FormControl fullWidth sx={{ mt: '24px' }} error={!!errors.reason}>
            <InputLabel id='reason-label' shrink>
              Reason <span style={{ color: 'red' }}>*</span>
            </InputLabel>
            <Controller
              name='reason'
              control={control}
              render={({ field }) => (
                <Select {...field} labelId='reason-label' label='Reason' displayEmpty IconComponent={DownArrow}>
                  <MenuItem value=''>Select Reason</MenuItem>
                  <MenuItem value='Not Required'>Not Required</MenuItem>
                  <MenuItem value='Partially Complete'>Partially Complete</MenuItem>
                  <MenuItem value='Other'>Other</MenuItem>
                </Select>
              )}
            />
            {errors.reason && (
              <Typography variant='caption' color='error'>
                {errors.reason.message}
              </Typography>
            )}
          </FormControl>

          <Controller
            name='remark'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ mt: '24px' }}
                fullWidth
                multiline
                InputLabelProps={{ shrink: true }}
                placeholder='Enter Remark'
                label={
                  <Typography component='span' sx={{ color: theme.palette.customColors.mainText }}>
                    Remark <span style={{ color: 'red' }}>*</span>
                  </Typography>
                }
                error={!!errors.remark}
                helperText={errors.remark?.message}
              />
            )}
          />
        </DialogContent>

        <DialogActions
          className='dialog-actions-dense'
          sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', p: '0 !important' }}
        >
          <Button variant='outlined' color='inherit' onClick={closeModal}>
            No
          </Button>
          <Button variant='contained' color='primary' type='submit'>
            Yes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CancelDialog
