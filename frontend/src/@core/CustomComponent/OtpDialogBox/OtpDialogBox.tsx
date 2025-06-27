// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogContent from '@mui/material/DialogContent'
import { Button, DialogActions, DialogTitle, IconButton, Snackbar, styled, TextField, Typography } from '@mui/material'
import { Box } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { postRequest } from 'src/services/apiService'
import { toast } from 'react-hot-toast'
import FallbackSpinner from 'src/@core/components/backdrop-spinner'
import SuccessDialog from '../SuccessDialogBox/SuccessDialog'
import { useSnackbar } from 'notistack'

type customModal = {
  openModal?: boolean
  closeModal?: () => void
  handleSubmitClose?: () => void
  title?: string
  content?: string
  openVerifyDialog: boolean
  handleCloseDialog: () => void
  subTitle: string
  mobileNo: string
  otpValidation: (type: string) => void
}

const InputBox = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    width: '49px',
    height: '46px',
    borderRadius: '6px',
    padding: 0
  },
  '& .MuiInputBase-input': {
    textAlign: 'center',
    fontSize: '20px',
    padding: '8px'
  },
  '& .MuiOutlinedInput-input': {
    padding: 0
  }
}))

function OtpDialogBox({
  openModal,
  closeModal,
  handleSubmitClose,
  handleCloseDialog,
  openVerifyDialog,
  title,
  subTitle,
  content,
  mobileNo,
  otpValidation
}: customModal) {
  // ** Hooks
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'))
  const [maxWidths, setMaxWidths] = useState<any>('lg')
  const [resendCount, setResendCount] = useState(0)
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [showError, setShowError] = useState(false)
  const [otp, setOtp] = useState(Array(6).fill(''))
  const inputRefs = useRef<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showSuccesBox, setSHowSuccessBox] = useState<boolean>(false)
  const { enqueueSnackbar } = useSnackbar()

  // useEffect(() => {
  //   if (openVerifyDialog) {
  //     sendOTP()
  //   }
  // }, [openVerifyDialog])

  // const sendOTP = async () => {
  //   try {
  //     setIsLoading(true)
  //     const response: any = await postRequest({
  //       url: '/otp/sendOtpOnMobile',
  //       data: {
  //         mobile: mobileNo
  //       }
  //     })

  //     if (response?.status === 201 || response?.status === 200) {
  //       enqueueSnackbar('OTP Sent Successfully!', { variant: 'success' })
  //       setIsLoading(false)
  //     } else {
  //       // toast.error(response?.error?.errorMessage ? response?.error?.errorMessage : "Something Went wrong!")
  //       enqueueSnackbar(response?.error?.errorMessage ? response?.error?.errorMessage : 'Something Went wrong!', {
  //         variant: 'error'
  //       })
  //     }
  //     setIsLoading(false)
  //   } catch (err) {}
  // }

  const handleResendOtp = async () => {
    if (resendCount < 2) {
      setOtp(Array(6).fill(''))
      setCanResend(false)
      setIsLoading(true)
      const response = await postRequest({
        url: '/otp/resendOtpOnMobile',
        data: { mobile: mobileNo }
      })

      if (response?.status == 201) {
        toast.success('OTP resent successfully')
        setResendCount(resendCount + 1)
        setTimer(60)
        enqueueSnackbar('OTP Sent Successfully!', { variant: 'success' })
      } else {
        setCanResend(true)
        enqueueSnackbar('Failed to resend OTP!', { variant: 'error' })
      }
      setIsLoading(false)
    } else {
      enqueueSnackbar('Resend limit reached!', { variant: 'error' })
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (openVerifyDialog) {
      setTimer(60)
      setCanResend(false)

      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev > 1) {
            return prev - 1
          } else {
            clearInterval(interval)
            setCanResend(true)

            return 0
          }
        })
      }, 1000)

      return () => clearInterval(interval) // Cleanup on modal close
    }
  }, [openVerifyDialog])

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)

      return () => clearInterval(interval)
    } else {
      setCanResend(true)
    }
  }, [timer])

  const validateOTP = async () => {
    try {
      if (otp.some(digit => digit === '')) {
        return
      }
      setIsLoading(true)
      const response: any = await postRequest({
        url: '/otp/validateMobile',
        data: {
          mobile: mobileNo,
          otp: otp.join('')
        }
      })

      if (response?.status === 201) {
        setIsLoading(false)
        setOtp(Array(6).fill(''))
        otpValidation('mobile')
        setShowError(false)
        setSHowSuccessBox(true)
      } else {
        setShowError(true)
        console.log(response)
        setIsLoading(false)
      }
      setIsLoading(false)
    } catch (err) {}
  }

  const handleClose = () => {
    setOtp(Array(6).fill(''))
    setShowError(false)
    handleCloseDialog()
    setSHowSuccessBox(false)
  }

  const handleOtpChange = (value: any, index: number) => {
    if (isNaN(value) || value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // if (!value && index > 0) {
    //   inputRefs.current[index - 1].focus();
    // }
  }

  const handleKeyDown = (e: any, index: any) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  const isOtpComplete = otp.every(digit => digit !== '')

  return (
    <>
      <FallbackSpinner isLoading={isLoading} />
      <Dialog open={openVerifyDialog} onClose={handleClose} aria-labelledby='customized-dialog-title'>
        <Box sx={{ p: '14px 14px 0' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ textAlign: 'left' }}>
              <DialogTitle sx={{ lineHeight: '22px', p: 0, mb: '4px' }} id='customized-dialog-title'>
                {title}
              </DialogTitle>
              <Typography variant='subtitle2' sx={{ color: theme.palette.customColors.mainText }}>
                {subTitle}
              </Typography>
            </Box>
            <Box
              onClick={handleClose}
              sx={{
                '& span': {
                  fontSize: '12px !important',
                  color: theme.palette.customColors.mainText,
                  cursor: 'pointer'
                }
              }}
            >
              <span className='icon-close'></span>
            </Box>
          </Box>
          <DialogContent sx={{ px: 0 }}>
            <Box sx={{ textAlign: '-webkit-center' }}>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                {otp.map((digit, index) => (
                  <Box key={index}>
                    <input
                      className='inputBox'
                      type='text'
                      value={digit}
                      onChange={e => handleOtpChange(e.target.value, index)}
                      onKeyDown={e => handleKeyDown(e, index)}
                      ref={el => (inputRefs.current[index] = el)}
                      style={{
                        textAlign: 'center',
                        border: `1px solid ${
                          showError ? theme.palette.error.main : theme.palette.customColors.mainText
                        }`
                      }}
                      maxLength={1}
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '8px' }}>
                <Typography variant='subtitle2' sx={{ color: theme.palette.customColors.mainText, fontWeight: '400' }}>
                  {`${otp.filter(d => d).length} / 6`}
                </Typography>
              </Box>
              {showError && (
                <Box>
                  <Typography variant='subtitle2' sx={{ color: 'red', fontWeight: '400' }}>
                    OTP entered is not valid !!!
                  </Typography>
                </Box>
              )}
              {canResend ? (
                <Box>
                  <Button variant='text' sx={{ mb: '24px' }} onClick={handleResendOtp}>
                    Resend OTP
                  </Button>
                </Box>
              ) : (
                <Box sx={{ mt: '24px', mb: '28px' }}>
                  <Typography variant='subtitle2' sx={{ color: theme.palette.customColors.mainText }}>
                    {`Resend OTP after ${formatTime(timer)} seconds`}
                  </Typography>
                </Box>
              )}
              <Box sx={{ textAlign: 'end', mr: '24px' }}>
                <Button variant='contained' onClick={validateOTP} className={isOtpComplete ? 'primary' : 'greyDark'}>
                  Validate OTP
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
      <SuccessDialog
        openDialog={showSuccesBox}
        title={
          <>
            OTP Verified
            <br />
            Successfully!
          </>
        }
        handleClose={handleClose}
      />
    </>
  )
}

export default OtpDialogBox
