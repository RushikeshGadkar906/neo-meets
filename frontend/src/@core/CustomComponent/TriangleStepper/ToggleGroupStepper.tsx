import React, { useState } from 'react'
import { ToggleButtonGroup, ToggleButton, Tooltip, Typography, TooltipProps } from '@mui/material'
import { styled } from '@mui/system'

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: theme.palette.customColors.primaryLightest,
    color: theme.palette.customColors.mainText
  }
}))

const ToggleGroupStepper = () => {
  const [view, setView] = useState('tab1')

  const handleToggleChange = (event: React.MouseEvent<HTMLElement>, newValue: string) => {
    setView(newValue)
  }

  const toggleButtonContent = [
    {
      value: 'tab1',
      label: 'My Calendar My Calendar My Calendar',
      subSteps: ['Personal events', 'Appointments', 'Meetings']
    },
    {
      value: 'tab2',
      label: 'School Calendar'
    },
    {
      value: 'tab3',
      label: 'Another Calendar with a long name'
    },
    {
      value: 'tab4',
      label: 'My Calendar My Calendar My Calendar',
      subSteps: ['Personal events', 'Appointments', 'Meetings']
    },
    {
      value: 'tab5',
      label: 'My Calendar My Calendar My Calendar',
      subSteps: ['Personal events', 'Appointments', 'Meetings']
    }
  ]

  const truncateText = (text: string, limit: number) => {
    const words = text.split(' ')
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...'
    }

    return text
  }

  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={handleToggleChange}
      sx={{
        width: '100%',
        justifyContent: 'space-between'
      }}
    >
      {toggleButtonContent.map(button => (
        <ToggleButton
          key={button.value}
          value={button.value}
          aria-label={button.label}
          sx={{
            flex: 1,
            padding: '0px 16px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {button.subSteps ? (
            <CustomTooltip
              title={
                <>
                  <Typography variant='subtitle1'>{button.label}</Typography>
                  <ul>
                    {button.subSteps?.map((subStep, index) => (
                      <li key={index}>
                        <Typography variant='body2'>{subStep}</Typography>
                      </li>
                    ))}
                  </ul>
                </>
              }
            >
              <span>{truncateText(button.label, 3)}</span>
            </CustomTooltip>
          ) : (
            <Tooltip
              title={
                <Typography color={'common.white'} variant='subtitle1'>
                  {button.label}
                </Typography>
              }
            >
              <span>{truncateText(button.label, 3)}</span>
            </Tooltip>
          )}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}

export default ToggleGroupStepper
