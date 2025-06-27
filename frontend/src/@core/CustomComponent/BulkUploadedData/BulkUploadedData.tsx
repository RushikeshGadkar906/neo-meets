import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FileUploaderMultiple from 'src/@core/CustomComponent/UploadDialogBox/FileUploaderMultiple'
import { Box, Grid, LinearProgress, styled, Typography, useTheme } from '@mui/material'
import themeConfig from 'src/configs/themeConfig'

// import BulkUploadImportDialog from './BulkUploadImport'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { getRequest, postRequest } from 'src/services/apiService'
import FallbackSpinner from 'src/@core/components/backdrop-spinner'
import { useAppDispatch, useAppSelector } from 'src/store'
import { setBulkUplaod } from 'src/slice/bulkUploadSlice'
import { useGlobalContext } from 'src/@core/global/GlobalContext'
import SuccessDialog from '../SuccessDialogBox/SuccessDialog'

type BulkUploadProps = {}

const ProgressBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '8px',
  '& .icon-greenTickIcon': {
    fontSize: '40px !important'
  }
}))

const LinearProgressBars = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 3,
  '&.MuiLinearProgress-root': {
    backgroundColor: theme.palette.grey[300]
  },
  '& .MuiLinearProgress-bar': {
    backgroundColor: theme.palette.success.main
  }
}))

const BulkUploadDialogData: React.FC<BulkUploadProps> = () => {
  const theme = useTheme()
  const [openImportDialog, setOpenImportDialog] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [file, setFile] = useState<any>()
  const [errorData, setErrorData] = useState<any>()
  const percentage = 100
  const value = 17
  const total = 30
  const { is_error, total_entries, inserted, updated, unsuccessful, errorFileUrl, records, showBulkUploadDialog } =
    useAppSelector((state: any) => state.bulkUplaod)
  const BulkUploadDialogData = useAppSelector((state: any) => state.bulkUplaod)
  const dispatch = useAppDispatch()
  const { openMrfBulkUploadImport, setOpenMrfBulkUploadImport } = useGlobalContext()
  const [showSuccesBox, setSHowSuccessBox] = useState<boolean>(false)

  const handleCloseImportDialog = () => {
    // setOpenImportDialog(false)
    dispatch(
      setBulkUplaod({
        ...BulkUploadDialogData,
        showBulkUploadDialog: false
      })
    )
  }

  const handleClose = () => {
    setSHowSuccessBox(false)
    handleCloseImportDialog()
    setFile(null)
  }

  const downloadSampleFile = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/mrf-upload/downloadMrfFile`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${Cookies.get('access_token')}`
        }
      })
      const blob = await response.blob()
      const extension = blob?.type?.split('/')[1]

      const url = window.URL.createObjectURL(new Blob([blob]))
      const link = document.createElement('a')

      const filename = 'mrf-list.xlsx'
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }

  // const uploadCV = async (file: File) => {
  //     setFile(file)
  // }

  const downloadErrorFile = async () => {
    try {
      if (errorFileUrl) {
        setIsLoading(true)
        const response: any = await getRequest({
          url: '/uploads/viewFile?fileName=' + errorFileUrl + '&is_download=true'
        })
        if (response?.status === 201) {
          window.open(response?.data?.url, '_blank')
          toast.success('Downloaded!')
        }
        setIsLoading(false)
      }
    } catch (err) {}
  }

  const handleOpenImportDialog = async () => {
    if (is_error) {
      // setOpenMrfBulkUploadImport(true)
      setSHowSuccessBox(false)
      handleCloseImportDialog()
      setFile(null)
    } else {
      setSHowSuccessBox(true)
    }
  }

  return (
    <>
      <FallbackSpinner isLoading={isLoading} />
      <Dialog
        open={showBulkUploadDialog}
        onClose={handleCloseImportDialog}
        maxWidth={'sm'}
        fullWidth
        sx={{ '& .MuiPaper-root': { borderRadius: '10px' } }}
      >
        <Box sx={{ p: '14px 6px' }}>
          <DialogTitle sx={{ p: 0, lineHeight: '17.6px', fontSize: '16px !important' }}>Bulk Upload Data</DialogTitle>
          <Typography variant='caption' sx={{ color: theme.palette.customColors.text3 }}>
            {' '}
            Upload Your Data Through Csv Or Xls. File{' '}
          </Typography>
        </Box>
        <DialogContent sx={{ p: '13px 8px' }}>
          <Box>
            <Grid container>
              <Grid item xs={5}>
                <Typography variant='body2'>Smart-Recruitment-System.xlsx</Typography>
                <Typography variant='caption' sx={{ color: theme.palette.customColors.text3 }}>
                  {' '}
                  {'2 MB'}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <ProgressBox>
                  <span className='icon-greenTickIcon'>
                    <span className='path1'></span>
                    <span className='path2'></span>
                  </span>

                  <Box width={'100%'}>
                    <Typography variant='body1' mb={'4px'}>
                      {`${percentage}%`}
                      <span style={{ fontSize: '10px', marginLeft: '8px', color: theme.palette.customColors.mainText }}>
                        Completed
                      </span>
                    </Typography>
                    <LinearProgressBars variant='determinate' value={percentage} />
                  </Box>
                </ProgressBox>
              </Grid>

              <Grid item xs={1}>
                <Box display={'flex'} justifyContent={'end'} alignItems={'center'}>
                  <span
                    onClick={() => setFile(null)}
                    className='icon-trash'
                    style={{ cursor: 'pointer', color: theme.palette.customColors.text3 }}
                  ></span>
                </Box>
              </Grid>
            </Grid>
            <Box display={'flex'} gap={'10px'} justifyContent={'end'} p={'10px 0'}>
              <Box alignSelf={'center'}>
                <Typography variant='body2' sx={{ color: theme.palette.success.main }}>
                  {`Successful- ${inserted}`}
                </Typography>
              </Box>
              <Box alignSelf={'center'} pl={'10px'}>
                <Typography variant='body2' sx={{ color: theme.palette.error.main }}>
                  {`Unsuccessful- ${unsuccessful}`}
                </Typography>
              </Box>
              <Box>
                <Button variant='text' color='primary' sx={{ pl: '10px' }} onClick={downloadErrorFile}>
                  <span className='icon-import-1' style={{ marginRight: '10px' }}></span> Download Error Log
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', pb: '14px' }}>
          <Button variant='text' color='primary' sx={{ p: 0 }} onClick={downloadSampleFile}>
            <span className='icon-import-1' style={{ marginRight: '10px' }}></span>Download Template
          </Button>
          <Box display={'flex'} gap={'24px'}>
            <Button
              onClick={() => {
                setFile(null)
                handleCloseImportDialog()
              }}
              variant='outlined'
              className='greyBorder'
            >
              Cancel
            </Button>
            <Button variant='contained' color='primary' onClick={handleOpenImportDialog}>
              Submit
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      <SuccessDialog
        openDialog={showSuccesBox}
        title={
          <>
            Bulk Upload
            <br />
            Completed Successfully!
          </>
        }
        handleClose={handleClose}
      />

      {/* <BulkUploadImportDialog data={errorData} open={openImportDialog} onClose={handleCloseImportDialog} /> */}
    </>
  )
}

export default BulkUploadDialogData
