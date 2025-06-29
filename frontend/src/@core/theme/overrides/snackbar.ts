// ** Type Imports
import { OwnerStateThemeType } from './'
import { Skin } from 'src/@core/layouts/types'

const Snackbar = (skin: Skin) => {
  return {
    MuiSnackbarContent: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          borderRadius: 8,
          padding: theme.spacing(1.75, 4),
          ...(skin === 'bordered' && { boxShadow: 'none' }),

          // backgroundColor: `rgb(${theme.palette.customColors.main})`,
          backgroundColor: theme.palette.common.white,
          color: theme.palette.customColors.text1,

          // color: theme.palette.common[theme.palette.mode === 'light' ? 'white' : 'black'],
          '& .MuiSnackbarContent-message': {
            lineHeight: 1.429,
            fontSize: '16px'
          }
        })
      }
    }
  }
}

export default Snackbar
