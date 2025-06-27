import * as React from 'react'
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Card,
  styled,
  Paper,
  Radio,
  FormControlLabel
} from '@mui/material'
import { useTheme } from '@mui/material'
import FileUploaderMultiple from '../UploadDialogBox/FileUploaderMultiple'

const StickyButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  background: theme.palette.common.white,
  position: 'sticky',
  bottom: 0,
  gap: '24px',
  padding: '21px',
  justifyContent: 'end'
}))

type StepperComponentProps = {
  steps?: string[]
  activeStep?: number
  handleNext?: () => void
  handleBack?: () => void
  handleSkip?: () => void
  handleReset?: () => void
  isStepOptional?: (step: number) => boolean
  renderStepContent?: (step: number) => React.ReactNode
}

const StepperComponent: React.FC<StepperComponentProps> = ({
  steps = [],
  activeStep = 0,
  handleNext,
  handleBack,
  handleSkip,
  handleReset,
  renderStepContent = () => <div />,
  isStepOptional
}) => {
  const theme = useTheme()

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={activeStep}
        sx={{ background: theme.palette.common.white, mt: '20px', p: '34px 24px', borderRadius: '10px' }}
      >
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: { optional?: React.ReactNode } = {}

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      <React.Fragment>
        <Box sx={{ mt: '20px', borderRadius: '10px 10px 0 0' }}>{renderStepContent(activeStep)}</Box>
        {/* <StickyButtons>
          <Button color='inherit' variant='outlined' onClick={handleBack}>
            Back
          </Button>
          <Button color='inherit' variant='contained'>
            Save As Draft
          </Button>
          <Button color='secondary' variant='contained' onClick={handleNext}>
            Next
          </Button>
        </StickyButtons> */}
      </React.Fragment>
    </Box>
  )
}

export default StepperComponent
