import React, { useState, useRef } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { Tooltip, Typography } from '@mui/material'

import { styled } from '@mui/material/styles'

type FileUploadProps = {
  label: string
  required: boolean
  accept: string
  documentType: string
  setFiles: any
  multiple: boolean
  file: any[]
}

const TruncatedTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    whiteSpace: 'nowrap',
    width: '100%',
    cursor: 'pointer',
    pointerEvents: 'auto'
  },
  '& .MuiInputLabel-root.MuiInputLabel-shrink+.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline legend .MuiTypography-root ':
    {
      fontSize: '12px'
    }
}))

const FileUploadTextField = ({ label, required, accept, documentType, setFiles, multiple, file }: FileUploadProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.files, 'Files')
    const newFiles = event.target.files ? Array.from(event.target.files) : []
    setFiles(newFiles)
  }

  const handleTextFieldClick = (event: any) => {
    event.preventDefault() // Prevent default behavior to avoid double triggering
    event.stopPropagation() // Stop the event from bubbling up
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleDeleteFile = () => {
    setFiles([])
    if (fileInputRef.current) {
      fileInputRef.current.value = '' // Clear the file input
    }
  }

  const truncatedFileName = file.map(file => (file.name.length > 30 ? file.name.substring(0, 20) + '...' : file.name))

  const truncatedLabel = multiple ? truncatedFileName.join(' , ') : truncatedFileName[0] || ''

  return (
    <>
      <Box sx={{ width: '100%', position: 'relative' }}>
        <Tooltip title={file.map(file => file.name).join(', ')} placement='bottom-start' enterTouchDelay={0}>
          <TruncatedTextField
            required={required}
            id='outlined-required'
            label={label}
            value={loading ? '...Uploading' : truncatedLabel}
            variant='outlined'
            onClick={handleTextFieldClick}
            fullWidth
            title={file.map(file => file.name).join(', ')}
            disabled={loading}
            InputLabelProps={{
              title: label
            }}
          />
        </Tooltip>
        {documentType === 'pdf' && !file && (
          <IconButton
            aria-label='delete-file'
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          >
            <span className='icon-document-1'></span>
          </IconButton>
        )}
        {file.length > 0 && (
          <IconButton
            aria-label='delete-file'
            onClick={handleDeleteFile}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)'
            }}
            disabled={loading}
          >
            <span className='icon-close-circle'></span>
          </IconButton>
        )}
        <input
          type='file'
          multiple={multiple}
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept={accept}
        />
      </Box>
      {documentType === 'image' && (
        <Typography variant='body2' color='textSecondary' mt={1}>
          .JPG, .JPEG, .PNG
        </Typography>
      )}
      {documentType === 'video' && (
        <Typography variant='body2' color='textSecondary' mt={1}>
          .MP4
        </Typography>
      )}
      {documentType === 'document' && (
        <Typography variant='body2' color='textSecondary' mt={1}>
          .DOC, .PDF
        </Typography>
      )}
    </>
  )
}

export default FileUploadTextField
