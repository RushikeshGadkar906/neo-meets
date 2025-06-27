import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import InstagramIcon from '@mui/icons-material/Instagram'
import { Theme } from '@mui/material/styles'

type BullProps = {
  count: number
}

const Bull = ({ count }: BullProps) => {
  const theme = useTheme()

  return (
    <Box
      component='span'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '25px',
        height: '25px',
        borderRadius: '50%',
        border: `3px solid ${theme.palette.primary.dark}`,
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '15.4px',
        color: theme.palette.primary.dark,
        marginBottom: '10px'
      }}
    >
      {count}
    </Box>
  )
}

interface CustomCardProps extends React.ComponentProps<typeof Card> {
  remark?: string
}

const CustomCard = styled(({ remark, ...other }: CustomCardProps) => <Card {...other} />)(
  ({ theme, remark }: { theme: Theme; remark?: string }) => ({
    width: '200px',
    height: '220px',
    marginBottom: '20px',
    '&.MuiPaper-outlined': {
      backgroundColor:
        remark === 'average'
          ? theme.palette.customColors.musterdYellowLight
          : remark === 'bad'
          ? theme.palette.customColors.chipWarningContainer
          : remark === 'weak'
          ? theme.palette.customColors.chipPendingContainer
          : theme.palette.customColors.primaryLightest,
      border:
        remark === 'average'
          ? `1px solid ${theme.palette.customColors.musterdYellowDark}`
          : remark === 'bad'
          ? `1px solid ${theme.palette.error.main}`
          : remark === 'weak'
          ? `1px solid ${theme.palette.customColors.chipPendingText}`
          : `1px solid ${theme.palette.primary.dark}`,
      overflow: 'unset'
    },
    '& .MuiCardContent-root:last-child': {
      paddingBottom: 0
    }
  })
)

const events = [
  {
    date: '01/05/2024',
    time: '10:30 AM',
    title: 'Enquiry Received-1',
    subtitle: 'New Admission',
    icon: <span className='icon-Instagram---2'></span>,
    studentRemark: 'good'
  },
  {
    date: '01/05/2024',
    time: '10:30 AM',
    title: 'Enquiry Received-2',
    subtitle: 'New Admission',
    icon: <span className='icon-Instagram---2'></span>,
    studentRemark: 'good'
  },
  {
    date: '01/05/2024',
    time: '10:30 AM',
    title: 'Enquiry Received-3 Enquiry Received-3',
    subtitle: 'New Admission New Admission',
    icon: <span className='icon-Instagram---2'></span>,
    studentRemark: 'average'
  },
  {
    date: '01/05/2024',
    time: '10:30 AM',
    title: 'Enquiry Received-4',
    subtitle: 'New Admission',
    icon: <span className='icon-Instagram---2'></span>,
    studentRemark: 'good'
  },
  {
    date: '01/05/2024',
    time: '10:30 AM',
    title: 'Enquiry Received-5',
    subtitle: 'New Admission',
    icon: <span className='icon-Instagram---2'></span>,
    studentRemark: 'bad'
  },
  {
    date: '01/05/2024',
    time: '10:30 AM',
    title: 'Enquiry Received-5',
    subtitle: 'New Admission',
    icon: <span className='icon-Instagram---2'></span>,
    studentRemark: 'good'
  },
  {
    date: '01/05/2024',
    time: '10:30 AM',
    title: 'Enquiry Received-5',
    subtitle: 'New Admission',
    icon: <span className='icon-Instagram---2'></span>,
    studentRemark: 'weak'
  },
  {
    date: '01/05/2024',
    time: '10:30 AM',
    title: 'Enquiry Received-5',
    subtitle: 'New Admission',
    icon: <span className='icon-Instagram---2'></span>,
    studentRemark: 'good'
  },
  {
    date: '01/05/2024',
    time: '10:30 AM',
    title: 'Enquiry Received-5',
    subtitle: 'New Admission',
    icon: <span className='icon-Instagram---2'></span>,
    studentRemark: 'good'
  },
  {
    date: '01/05/2024',
    time: '10:30 AM',
    title: 'Enquiry Received-5',
    subtitle: 'New Admission',
    icon: <span className='icon-Instagram---2'></span>,
    studentRemark: 'good'
  }
]

export default function CustomTimeline() {
  const [screenWidth, setScreenWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0)
  const eventsWithPosition = events.map((event: any, index: any) => ({
    ...event,
    count: index + 1 // Position starts from 1
  }))

  // Split events into rows of 6 items
  const rows = []
  for (let i = 0; i < eventsWithPosition.length; i += 4) {
    rows.push(eventsWithPosition.slice(i, i + 4))
  }

  //Handler for screen width
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', updateScreenWidth)

    return () => {
      window.removeEventListener('resize', updateScreenWidth)
    }
  }, [])

  return (
    <>
      {rows.map((row, rowIndex) => (
        <Box key={rowIndex}>
          {rowIndex % 2 === 0 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                position: 'relative'
              }}
            >
              {row.map((event, index) => (
                <>
                  <Grid key={index} item xs={3} sx={{ position: 'relative' }}>
                    <CustomCard
                      variant='outlined'
                      remark={event.studentRemark}
                      className={index === row.length - 1 ? 'MuiPaper-outlined last-child' : 'MuiPaper-outlined'}
                      sx={{
                        marginRight: index !== row.length - 1 ? '65px' : '0',
                        '&::before': {
                          content:
                            rowIndex % 2 !== 0 && index === 0
                              ? '""'
                              : rowIndex % 2 === 0 && index === row.length - 1
                              ? '""'
                              : 'none',
                          position: 'absolute',
                          width: '2px',
                          height: '21px',
                          ...(rowIndex != rows.length - 1 && { borderLeft: 'dashed 3px #4B4DD4' }),
                          left: '100px',
                          bottom: '0%',
                          zIndex: 999
                        },
                        '&::after': {
                          content: index !== row.length - 1 ? '""' : 'none',
                          position: 'absolute',
                          width: 'calc(100% - 70px)',
                          height: '0',
                          borderTop: 'dashed 3px #4B4DD4',
                          top: '23.5%',
                          right: '0px',
                          zIndex: 999
                        }
                      }}
                    >
                      <CardContent sx={{ padding: '16px 16px 0 16px' }}>
                        <Typography
                          variant='body2'
                          sx={{ lineHeight: '15.4px', textTransform: 'capitalize' }}
                          color='customColors.mainText'
                          gutterBottom
                        >
                          {event.date}
                        </Typography>
                        {<Bull count={event.count} />}
                        <Typography
                          variant='subtitle2'
                          color='text.primary'
                          sx={{ lineHeight: '15.4px', marginBottom: '0.5rem', textTransform: 'capitalize' }}
                        >
                          {event.title}
                        </Typography>
                        <Typography variant='subtitle2' color='customColors.text1' sx={{ marginBottom: '0.5rem' }}>
                          {index}
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                          {event.icon}
                          <Typography
                            variant='body2'
                            sx={{
                              margin: 0,
                              lineHeight: '15.4px'
                            }}
                            color='customColors.mainText'
                            gutterBottom
                          >
                            {event.subtitle}
                          </Typography>
                        </div>
                        <Typography
                          variant='body2'
                          sx={{
                            lineHeight: '15.4px',
                            textTransform: 'capitalize',
                            position: 'absolute',
                            bottom: 15,
                            left: 10
                          }}
                          color='customColors.mainText'
                          gutterBottom
                        >
                          {event.time}
                        </Typography>
                      </CardContent>
                    </CustomCard>
                  </Grid>
                </>
              ))}
            </Box>
          )}

          {rowIndex % 2 !== 0 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'row-reverse',
                position: 'relative'
              }}
            >
              {row.map((event, index) => (
                <>
                  <Grid item xs={3} sx={{ position: 'relative' }}>
                    <CustomCard
                      key={index}
                      remark={event.studentRemark}
                      variant='outlined'
                      className={index === row.length - 1 ? 'MuiPaper-outlined last-child' : 'MuiPaper-outlined'}
                      sx={{
                        marginRight: index !== row.length - 1 ? '65px' : '65px',
                        '&::before': {
                          content: index === row.length - 1 ? '""' : 'none', // Remove the vertical line before the first card of the second row
                          position: 'absolute',
                          width: '2px',
                          height: '21px',
                          ...(rowIndex != rows.length - 1 && { borderLeft: 'dashed 3px #4B4DD4' }),
                          left: '100px',
                          bottom: '0%',
                          zIndex: 999
                        },
                        '&::after': {
                          content: index !== row.length - 1 ? '""' : 'none',
                          position: 'absolute',
                          width: 'calc(100% - 70px)',
                          height: '0',
                          borderTop: 'dashed 3px #4B4DD4',
                          top: '23.5%',
                          left:
                            screenWidth <= 1024
                              ? '-70%'
                              : screenWidth <= 1280
                              ? '-72%'
                              : screenWidth <= 1512
                              ? '-77%'
                              : screenWidth <= 1440
                              ? '-75%'
                              : screenWidth <= 1600
                              ? '-80%'
                              : screenWidth <= 1920
                              ? '-83%'
                              : '-86%',
                          zIndex: 999
                        }
                      }}
                    >
                      <CardContent sx={{ padding: '16px 16px 0 16px' }}>
                        <Typography
                          variant='body2'
                          sx={{ lineHeight: '15.4px', textTransform: 'capitalize' }}
                          color='customColors.mainText'
                          gutterBottom
                        >
                          {event.date}
                        </Typography>
                        {<Bull count={event.count} />}
                        <Typography
                          variant='subtitle2'
                          color='text.primary'
                          sx={{ lineHeight: '15.4px', marginBottom: '0.5rem', textTransform: 'capitalize' }}
                        >
                          {event.title}
                        </Typography>
                        <Typography variant='subtitle2' color='customColors.text1' sx={{ marginBottom: '0.5rem' }}>
                          {index}
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                          {event.icon}
                          <Typography
                            variant='body2'
                            sx={{
                              margin: 0,
                              lineHeight: '15.4px'
                            }}
                            color='customColors.mainText'
                            gutterBottom
                          >
                            {event.subtitle}
                          </Typography>
                        </div>
                        <Typography
                          variant='body2'
                          sx={{
                            lineHeight: '15.4px',
                            textTransform: 'capitalize',
                            position: 'absolute',
                            bottom: 15,
                            left: 10
                          }}
                          color='customColors.mainText'
                          gutterBottom
                        >
                          {event.time}
                        </Typography>
                      </CardContent>
                    </CustomCard>
                  </Grid>
                </>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </>
  )
}
