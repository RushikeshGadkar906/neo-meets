// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogContent from '@mui/material/DialogContent'
import { Button, DialogActions, DialogTitle, IconButton, styled, Typography } from '@mui/material'
import { Box } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import WhatsappLogo from '../../../../public/images/whatsapp.svg'
import GmailLogo from '../../../../public/images/gmail.svg'
import Divider from 'src/@core/theme/overrides/divider'
import HrLine from '../HrLine/HrLine'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { MailruShareButton, WhatsappShareButton } from 'react-share'

type customModal = {
  open: boolean
  handleCloseDialog?: () => void
  handleSubmitClose?: () => void
  handleOpenDialog?: (data: any) => void
  shareUrl: string
  title: string
  content?: string
  subTitle?: string
}

const SubTitleText = styled(Typography)(({ theme }) => ({
  color: theme.palette.customColors.mainText,
  textTransform: 'capitalize',
  fontWeight: '400'
}))

const ImageBorder = styled(Box)(({ theme }) => ({
  color: 'transparent',
  border: `1px solid ${theme.palette.customColors.text6}`,
  borderRadius: '50%',
  padding: '9px',
  height: '40px',
  width: '40px',
  cursor: 'pointer'
}))

const CloseIcon = styled('span')(({ theme }) => ({
  fontSize: '14px !important',
  cursor: 'pointer',
  color: theme.palette.customColors.mainText
}))

function ShareDialogBox({
  open,
  handleCloseDialog,

  //   closeModal,
  handleSubmitClose,
  shareUrl,
  title,
  content,
  subTitle
}: customModal) {
  // ** Hooks
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'))
  const [maxWidths, setMaxWidths] = useState<any>('lg')
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const closeIcon = <span className='icon-close'></span>

  const copyToClipboard = () => {
    setIsCopied(true)
    navigator.clipboard.writeText(shareUrl)
    toast.success('Copied to clipboard')
    handleSubmitClose
  }

  const handleClose = () => {
    handleCloseDialog?.()
    setIsCopied(false)
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        sx={{ '& .MuiPaper-elevation': { width: '550px' } }}
      >
        <Box sx={{ p: '14px 14px 24px' }}>
          <Box>
            <Box display={'flex'} alignItems={'center'}>
              <Box>
                <DialogTitle
                  sx={{ lineHeight: '16px', p: '10px 0 4px', fontSize: '20px' }}
                  id='customized-dialog-title'
                >
                  {title}
                </DialogTitle>
                <Box>
                  <SubTitleText variant='subtitle2'>{subTitle}</SubTitleText>
                </Box>
              </Box>
              <Box>
                <CloseIcon className='icon-close' onClick={handleClose} />
              </Box>
            </Box>
            <Box sx={{ p: '7px 0' }}>
              <HrLine />
            </Box>
            <Box sx={{ display: 'flex', gap: '16px' }}>
              <ImageBorder sx={{ p: '7px' }}>
                <WhatsappShareButton url={shareUrl} title={title}>
                  <Image src={WhatsappLogo} width={23} height={23} alt='whatsapp' />
                </WhatsappShareButton>
              </ImageBorder>
              <ImageBorder>
                <MailruShareButton url={shareUrl} title={title}>
                  <Image src={GmailLogo} width={20} height={20} alt='gmail' />
                </MailruShareButton>
              </ImageBorder>
            </Box>
            <Box sx={{ p: '7px 0' }}>
              <HrLine />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant='caption' sx={{ color: theme.palette.customColors.text3 }}>
                  Copy Link
                </Typography>
                <Box sx={{ pt: '15.4px' }}>
                  <Link href={shareUrl} style={{ color: theme.palette.customColors.mainText }}>
                    {shareUrl}
                  </Link>
                </Box>
              </Box>
              <DialogActions className='dialog-actions-dense' sx={{ paddingBottom: `0 !important`, alignItems: 'end' }}>
                <Button variant='contained' color='secondary' onClick={copyToClipboard}>
                  {isCopied ? 'Copied' : 'Copy'}
                </Button>
              </DialogActions>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  )
}

export default ShareDialogBox
