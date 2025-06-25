// ** Type Import
import { OwnerStateThemeType } from './'

const Divider = () => {
  return {
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          borderColor: theme.palette.customColors.text6,
          borderWidth: '1px',
          '.MuiStack-root &:not(.MuiDivider-vertical)': {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2)
          }
        }),
        middle: ({ theme }: OwnerStateThemeType) => ({
          '&:not(.MuiDivider-vertical)': {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5)
          },
          '&.MuiDivider-vertical': {
            // marginTop: theme.spacing(2),
            // marginBottom: theme.spacing(2)
          }
        })
      }
    }
  }
}

export default Divider
