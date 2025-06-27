// import React from 'react'
// import { Box, Typography } from '@mui/material'
// import { styled } from '@mui/system'

// interface StepProps {
//   active: boolean
//   label: string
//   stepNumber: number
// }

// const StepContainer = styled(Box)<{ active: boolean }>(({ theme, active }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: '8px 34px',
//   backgroundColor: active ? '#3F41D1' : '#f3f0f0',
//   clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%)',
//   border: active ? '0px' : '0px',
//   transition: 'background-color 0.3s, color 0.3s'
// }))

// const Step: React.FC<StepProps> = ({ active, label, stepNumber }) => {
//   return (
//     <StepContainer active={active}>
//       <Typography
//         variant='subtitle2'
//         sx={{ lineHeight: '21px' }}
//         color={active ? 'common.white' : 'customColors.extraTextColor'}
//       >
//         {stepNumber}. {label}
//       </Typography>
//     </StepContainer>
//   )
// }

// export default Step

// import React from 'react'
// import { Box, Typography, Tooltip } from '@mui/material'
// import { styled } from '@mui/system'

// interface StepProps {
//   active: boolean
//   label: string
//   stepNumber: number
// }

// const StepContainer = styled(Box)<{ active: boolean }>(({ theme, active }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: '8px 34px',
//   backgroundColor: active ? '#3F41D1' : '#f5f5f7',
//   clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%)',
//   border: active ? '0px' : '0px',
//   transition: 'background-color 0.3s, color 0.3s',
//   width: '170px', // Fixed width
//   overflow: 'hidden', // Ensure the text does not overflow
//   whiteSpace: 'nowrap', // Prevent text from wrapping
//   textOverflow: 'ellipsis' // Add ellipsis
// }))

// const Step: React.FC<StepProps> = ({ active, label, stepNumber }) => {
//   return (
//     <Tooltip title={label}>
//       <StepContainer active={active}>
//         <Typography
//           variant='subtitle2'
//           sx={{ lineHeight: '21px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
//           color={active ? 'common.white' : 'customColors.extraTextColor'}
//         >
//           {stepNumber}. {label}
//         </Typography>
//       </StepContainer>
//     </Tooltip>
//   )
// }

// export default Step

import React from 'react'
import { Box, Typography, Tooltip, TooltipProps } from '@mui/material'
import { styled } from '@mui/system'

interface StepProps {
  active?: any
  error?: any
  success?: any
  label: string
  stepNumber: number
  handleDialog?: () => void
  subSteps?: string[] // Optional subSteps prop
}

const StepContainer = styled(Box)<{ active: boolean; error: boolean; success: boolean }>(
  ({ theme, active, error, success }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    marginTop: '15px',
    padding: '8px 34px',
    backgroundColor: active
      ? theme.palette.primary.dark
      : error
      ? theme.palette.customColors.chipWarningContainer
      : success
      ? theme.palette.success.light
      : theme.palette.customColors.stepDefault,
    clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%)',
    border: active ? '0px' : '0px',
    transition: 'background-color 0.3s, color 0.3s',
    width: '170px', // Fixed width
    overflow: 'hidden', // Ensure the text does not overflow
    whiteSpace: 'nowrap', // Prevent text from wrapping
    textOverflow: 'ellipsis' // Add ellipsis
  })
)

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: theme.palette.customColors.primaryLightest,
    color: theme.palette.customColors.mainText
  }
}))

const Step: React.FC<StepProps> = ({ handleDialog, active, error, success, label, stepNumber, subSteps }) => {
  const tooltipTitle = subSteps ? (
    <div>
      <Typography variant='subtitle2'>{label}</Typography>
      <ul style={{ paddingLeft: '16px', margin: '8px 0 0 0' }}>
        {subSteps.map((subStep, index) => (
          <li key={index}>
            <Typography variant='body2'>{subStep}</Typography>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    label
  )

  const TooltipComponent = subSteps ? CustomTooltip : Tooltip

  return (
    <TooltipComponent title={tooltipTitle}>
      <StepContainer active={active} error={error} success={success} style={{ marginRight: '-10px' }}>
        <Typography
          variant='subtitle2'
          onClick={error ? handleDialog : undefined}
          sx={{ lineHeight: '21px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          color={
            active ? 'common.white' : error ? 'error.main' : success ? 'success.main' : 'customColors.extraTextColor'
          }
        >
          {stepNumber}. {label}
        </Typography>
      </StepContainer>
    </TooltipComponent>
  )
}

export default Step
