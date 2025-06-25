import { borderRadius, color, fontSize, fontWeight, height, letterSpacing, lineHeight } from '@mui/system'
import { OwnerStateThemeType } from './'

const Button = () => {
  return {
    MuiFab: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          boxShadow: theme.shadows[0],

          width: '56px',
          height: '56px',
          borderRadius: '16px',
          backgroundColor: theme.palette.customColors.surfaeLighterTwo,
          color: theme.palette.customColors.mainText,
          '&:hover': {
            boxShadow: theme.shadows[1],
            backgroundColor: theme.palette.customColors.surfaeLighterTwo,
            color: theme.palette.customColors.mainText
          },
          '&.MuiFab-primary': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            '&:hover': {
              boxShadow: theme.shadows[1],
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white
            }
          },
          '&.MuiFab-secondary': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.dark,
            '&:hover': {
              boxShadow: theme.shadows[1],
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.dark
            }
          },
          '&.Mui-info': {
            backgroundColor: theme.palette.info.main,
            color: theme.palette.info.dark,
            '&:hover': {
              boxShadow: theme.shadows[1],
              backgroundColor: theme.palette.info.main,
              color: theme.palette.info.dark
            }
          },
          '&.Mui-error': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.dark,
            '&:hover': {
              boxShadow: theme.shadows[1],
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.dark
            }
          },
          '&.MuiFab-sizeSmall': {
            borderRadius: '12px',
            width: '40px',
            height: '40px'
          },
          '&.MuiFab-sizeLarge.': {
            borderRadius: '28px',
            width: '96px',
            height: '96px'
          },
          '&.MuiFab-extended.MuiFab-sizeLarge.MuiFab-default': {
            fontSize: '14px',
            fontWeight: '500',
            letterSpacing: '0.1px',
            lineHeight: '20px',
            borderRadius: '16px',
            width: '100%',
            height: '56px',
            boxShadow: theme.shadows[2],
            backgroundColor: theme.palette.customColors.text5,
            color: theme.palette.customColors.text3,
            '&.Mui-disabled': {
              backgroundColor: theme.palette.customColors.text5,
              color: theme.palette.customColors.text3
            }
          },

          '&.MuiFab-extended.MuiFab-sizeLarge.MuiFab-secondary': {
            fontSize: '14px',
            fontWeight: '500',
            letterSpacing: '0.1px',
            lineHeight: '20px',
            borderRadius: '16px',
            width: '100%',
            height: '56px',
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.dark,
            boxShadow: theme.shadows[2],
            '&.Mui-disabled': {
              backgroundColor: theme.palette.customColors.text5,
              color: theme.palette.customColors.text3
            }
          },
          '&.MuiFab-extended.MuiFab-sizeLarge.MuiFab-primary': {
            fontSize: '14px',
            fontWeight: '500',
            letterSpacing: '0.1px',
            lineHeight: '20px',
            borderRadius: '16px',
            width: '100%',
            height: '56px',
            boxShadow: theme.shadows[2],
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.common.white,
            '&.Mui-disabled': {
              backgroundColor: theme.palette.customColors.text5,
              color: theme.palette.customColors.text3
            }
          }
        })
      }
    }
  }
}

export default Button
