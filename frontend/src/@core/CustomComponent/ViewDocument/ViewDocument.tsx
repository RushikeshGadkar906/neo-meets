import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { Box, Divider, styled, Typography } from '@mui/material'

interface ViewDocumentProps {
  open: boolean
  onClose: () => void
  documentUrl: string
}

const CloseIcon = styled(Box)(({ theme }) => ({
  '& .icon-close': {
    fontSize: '12px !important',
    color: theme.palette.customColors.mainText,
    cursor: 'pointer'
  }
}))

const ViewDocument: React.FC<ViewDocumentProps> = ({ open, onClose, documentUrl }) => {
  const theme = useTheme()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={'md'}
      fullWidth
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '10px',
          padding: '24px'
        }
      }}
    >
      <Box display='flex' justifyContent='space-between' mb='14px'>
        <Typography variant='subtitle1' sx={{ lineHeight: '100%' }}>
          Document Preview
        </Typography>
        <CloseIcon onClick={onClose}>
          <span className='icon-close'></span>
        </CloseIcon>
      </Box>
      <Divider />

      <DialogContent sx={{ minHeight: '400px' }}>
        {documentUrl ? (
          <>
            {documentUrl.endsWith('.pdf') ? (
              <iframe
                src={documentUrl}
                width='100%'
                height='600px'
                title='Document Viewer'
                style={{ border: 'none' }}
              />
            ) : (
              <Box
                component='img'
                src={documentUrl}
                alt='Uploaded Document'
                sx={{ width: '100%', maxHeight: '600px', objectFit: 'contain' }}
              />
            )}
          </>
        ) : (
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Typography>No documents</Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ViewDocument
