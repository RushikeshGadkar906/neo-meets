// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { IconButton, useTheme } from '@mui/material'
import { useRouter, usePathname } from 'next/navigation'
import Logo from '../../../../../../public/images/hubblehox_logo.svg'
import Image from 'next/image'
import { fontWeight } from '@mui/system'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.dark,
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
  letterSpacing: '0.15px'
}))

const Container = styled(Box)(({ theme }) => ({
  background: theme.palette.customColors.darkBlue,
  padding: '49.5px 48px',
  '& .MuiTypography-root': {
    color: theme.palette.common.white
  },
  '& .MuiBox-root a': {
    color: theme.palette.common.white,
    textDecoration: 'none',
    fontWeight: '400'
  }
}))

const FooterLinks = styled(Box)(({ theme }) => ({
  paddingTop: '16px'
}))

const FooterContent = () => {
  // ** Var
  const theme = useTheme()
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const router = useRouter()
  const handleRedirect = (url: string) => {
    router.push(url)
  }
  const pathname = usePathname()

  return (
    <>
      {pathname == '/' || pathname == '/find-jobs/' ? (
        <Container>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '32px',
              flexWrap: 'wrap'
            }}
          >
            <Box
              sx={{
                flex: {
                  xs: '1 1 100%',
                  sm: '1 1 48%',
                  md: '1 1 30%',
                  lg: '1 1 33%'
                },
                mb: { xs: '24px', sm: '0' },
                mr: { lg: '7%', md: 0 }
              }}
            >
              <Link href='/' passHref>
                <Image src={Logo} width={235} height={35} alt='Logo' />
              </Link>
              <Typography variant='subtitle1' sx={{ p: '24px 0' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's
                standard dummy text ever since the.
              </Typography>
              <Box sx={{ display: 'flex', gap: '24px' }}>
                <span className='icon-white-instagram'></span>
                <span className='icon-white-linkedIn'></span>
                <span className='icon-white-facebook'></span>
              </Box>
            </Box>

            {[
              { title: 'Who We Are', links: ['About Us', 'Contact Us', 'Vision & Mission', 'Our Team'] },
              { title: 'Essentials', links: ['Terms of Use', 'Privacy Policy', 'Disclaimer', 'Help & Support'] },
              { title: 'For Job Seekers', links: ['Search Job', 'Register', 'Job Alerts'] },
              { title: 'Quick Links', links: ['FAQ’s'] }
            ].map((section, idx) => (
              <Box
                key={idx}
                sx={{
                  flex: {
                    xs: '1 1 100%',
                    sm: '1 1 48%',
                    md: '1 1 12%',
                    lg: '1 1 10%'
                  },
                  mb: { xs: '24px', sm: '0' }
                }}
              >
                <Typography variant='h6' sx={{ whiteSpace: 'nowrap' }}>
                  {section.title}
                </Typography>
                <Box>
                  {section.links.map((link, linkIdx) => (
                    <FooterLinks key={linkIdx}>
                      <Link href='#'>{link}</Link>
                    </FooterLinks>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      ) : (
        <Box sx={{ p: '16px 24px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Typography color={'customColors.text3'} variant='subtitle1' sx={{ mr: 2, lineHeight: '24px' }}>
                {`© ${new Date().getFullYear()}, Powered `}

                {` by `}
                <LinkStyled target='_blank' href='https://hubblehox.com/'>
                  HubbleHox
                </LinkStyled>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              {/* <LinkStyled
                sx={{ mr: 3 }}
                target="_blank"
                href="https://hubblehox.com/"
              >
                License
              </LinkStyled>
              <LinkStyled
                sx={{ mr: 3 }}
                target="_blank"
                href="https://hubblehox.com/"
              >
                More Themes
              </LinkStyled>
              <LinkStyled
                sx={{ mr: 3 }}
                target="_blank"
                href="https://hubblehox.com/"
              >
                Documentation
              </LinkStyled>
              <LinkStyled target="_blank" href="https://hubblehox.com/">
                Support
              </LinkStyled> */}
              <IconButton>
                <span style={{ color: '#212121', fontSize: '25px !important' }} className='icon-Facebook'></span>
              </IconButton>
              <IconButton>
                <span style={{ color: '#212121', fontSize: '25px !important' }} className='icon-Instagram---2'></span>
              </IconButton>
              <IconButton>
                <span style={{ color: '#212121' }} className='icon-Linkedin'></span>
              </IconButton>
              <IconButton>
                <span style={{ color: '#212121', fontSize: '25px !important' }} className='icon-Youtube-1'></span>
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}

export default FooterContent
