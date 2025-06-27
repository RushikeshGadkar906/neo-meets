// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import { styled, useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import DeleteIcon from '@mui/icons-material/Delete'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import UserIcon from 'src/layouts/components/UserIcon'

interface FileProp {
  name: string
  type: string
  size: number
}

interface FileInputProps {
  title: string
  titlePart: string
  subTitle: string
  accept: any
  maxFile: number
  maxFileSize: number
  setFiles: any
  files: any[]
}

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

const FileUploaderMultiple = ({
  title,
  titlePart,
  subTitle,
  accept,
  maxFile,
  maxFileSize,
  setFiles,
  files
}: FileInputProps) => {
  // ** State
  // const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string>('')
  const theme = useTheme()
  const maxSize = maxFileSize // 10 MB in bytes

  // ** Hooks
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: accept,
    maxSize,
    maxFiles: maxFile,
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  // const renderFilePreview = (file: FileProp) => {
  //   if (file.type.startsWith('image')) {
  //     return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
  //   } else {
  //     return <Icon icon='mdi:file-document-outline' />
  //   }
  // }

  const fileRejectionItems = fileRejections.map(({ file, errors }) => errors[0].code)
  console.log(fileRejectionItems[0])

  //useEffect
  useEffect(() => {
    if (fileRejectionItems[0] === 'too-many-files') {
      setError('You are trying to upload more than 3 files')
    } else if (fileRejectionItems[0] === 'file-too-large') {
      setError('You are trying to upload more than 10 mb file')
    } else {
      setError('')
    }
  }, [fileRejectionItems])

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    setFiles([...filtered])
  }

  const fileList = files.map((file: FileProp) => (
    <ListItem
      key={file.name}
      sx={{
        background: theme.palette.customColors.lightBg,
        padding: '16px',
        height: '63px',
        borderRadius: '10px',
        mb: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <div className='file-details'>
        {/* <div className='file-preview'>{renderFilePreview(file)}</div> */}
        <div>
          <Typography variant='body2' sx={{ letterSpacing: '0.25px', color: 'text.primary' }} className='file-name'>
            {file.name}
          </Typography>
          <Typography
            className='file-size'
            variant='caption'
            color={'customColors.text3'}
            sx={{ lineHeight: '18px', letterSpacing: '0.4px' }}
          >
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <span className='icon-trash'></span>
      </IconButton>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  return (
    <Fragment>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {files.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: ['column', 'column', 'row'],
              alignItems: 'center',
              border: '1px dotted #929090',
              borderRadius: '10px',
              padding: '64px 64px',
              justifyContent: 'center',
              width: { sm: '100%', md: '100%' },
              textAlign: 'center'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: ['center', 'center', 'inherit']
              }}
            >
              <HeadingTypography
                variant='body2'
                color={'customColors.mainText'}
                sx={{
                  '& a': { color: 'primary.main', textDecoration: 'none' },
                  letterSpacing: '0.25px',
                  textAlign: 'center',
                  lineHeight: '0px !important'
                }}
              >
                {title} {''}
                <Link href='/' onClick={e => e.preventDefault()}>
                  {titlePart}
                </Link>{' '}
              </HeadingTypography>
              <Typography
                variant='caption'
                color={'customColors.text3'}
                sx={{
                  lineHeight: '16px',
                  letterSpacing: '0.4px'
                }}
              >
                {subTitle}
              </Typography>
            </Box>
          </Box>
        )}
      </div>
      <div className='errorText'>
        {error && (
          <Typography variant='caption' sx={{ color: 'error.main' }}>
            {error}
          </Typography>
        )}
      </div>
      {files.length ? (
        <Fragment>
          <List>{fileList}</List>
          {/* <div className='buttons'>
            <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
              Remove All
            </Button>
            <Button variant='contained'>Upload Files</Button>
          </div> */}
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default FileUploaderMultiple
