// ** Type Imports
import { PaletteMode, ThemeOptions } from '@mui/material'

const Shadows = (mode: PaletteMode): ThemeOptions['shadows'] => {
  if (mode === 'light') {
    return [
      'none',
      '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D',
      '0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026',
      '0px 2px 10px 0px #4C4E6438',
      '0px 4px 8px -4px rgba(76, 78, 100, 0.42)',
      '0px 6px 18px -8px rgba(76, 78, 100, 0.56)',
      '0px 4px 10px 0px #4C4E6426',
      '0px 2px 10px 0px rgba(76, 78, 100, 0.22)',
      '0px 6px 60px 0px #0000001A',
      '0px 2px 6px 0px #4C4E6426',
      '0px 6px 10px 0px #0000001A',
      '0px 0px 15px 6px #0000000F',
      '0px 2px 10px 0px #4C4E6426',
      '4px 10px 13px 0px #F4F0EF',
      '-4px 20px 20px 0px #F4F0EF',
      '4px 0px 20px 0px #C9C9C9',
      '0px 8px 9px -5px rgb(255 255 255 / 20%), 0px 0px 18px 2px rgb(146 146 146 / 20%), 0px 6px 0px -6px rgba(76, 78, 100, 0.12)',
      '-4px 0px 20px 0px #C9C9C9',
      '0px 2px 15px 0px #4C4E6414',
      '0px 9px 11px -5px rgba(76, 78, 100, 0.2), 0px 18px 28px 2px rgba(76, 78, 100, 0.14), 0px 7px 34px 6px rgba(76, 78, 100, 0.12)',
      '0px 9px 12px -6px rgba(76, 78, 100, 0.2), 0px 19px 29px 2px rgba(76, 78, 100, 0.14), 0px 7px 36px 6px rgba(76, 78, 100, 0.12)',
      '0px 10px 13px -6px rgba(76, 78, 100, 0.2), 0px 20px 31px 3px rgba(76, 78, 100, 0.14), 0px 8px 38px 7px rgba(76, 78, 100, 0.12)',
      '0px 10px 13px -6px rgba(76, 78, 100, 0.2), 0px 21px 33px 3px rgba(76, 78, 100, 0.14), 0px 8px 40px 7px rgba(76, 78, 100, 0.12)',
      '0px 10px 14px -6px rgba(76, 78, 100, 0.2), 0px 22px 35px 3px rgba(76, 78, 100, 0.14), 0px 8px 42px 7px rgba(76, 78, 100, 0.12)',
      '0px 11px 14px -7px rgba(76, 78, 100, 0.2), 0px 23px 36px 3px rgba(76, 78, 100, 0.14), 0px 9px 44px 8px rgba(76, 78, 100, 0.12)'
    ]
  } else {
    return [
      'none',
      '0px 2px 1px -1px rgba(20, 21, 33, 0.2), 0px 1px 1px 0px rgba(20, 21, 33, 0.14), 0px 1px 3px 0px rgba(20, 21, 33, 0.12)',
      '0px 3px 1px -2px rgba(20, 21, 33, 0.2), 0px 2px 2px 0px rgba(20, 21, 33, 0.14), 0px 1px 5px 0px rgba(20, 21, 33, 0.12)',
      ' rgba(0, 0, 0, 0.24) 0px 3px 8px',
      '0px 6px 18px -8px rgba(20, 21, 33, 0.56)',
      '0px 3px 5px -1px rgba(20, 21, 33, 0.2), 0px 5px 8px 0px rgba(20, 21, 33, 0.14), 0px 1px 14px 0px rgba(20, 21, 33, 0.12)',
      '0px 4px 10px 0px #4C4E6426',
      '0px 4px 5px -2px rgba(20, 21, 33, 0.2), 0px 7px 10px 1px rgba(20, 21, 33, 0.14), 0px 2px 16px 1px rgba(20, 21, 33, 0.12)',
      '0px 5px 5px -3px rgba(20, 21, 33, 0.2), 0px 8px 10px 1px rgba(20, 21, 33, 0.14), 0px 3px 14px 2px rgba(20, 21, 33, 0.12)',
      '0px 5px 6px -3px rgba(20, 21, 33, 0.2), 0px 9px 12px 1px rgba(20, 21, 33, 0.14), 0px 3px 16px 2px rgba(20, 21, 33, 0.12)',
      '0px 6px 6px -3px rgba(20, 21, 33, 0.2), 0px 10px 14px 1px rgba(20, 21, 33, 0.14), 0px 4px 18px 3px rgba(20, 21, 33, 0.12)',
      '0px 6px 7px -4px rgba(20, 21, 33, 0.2), 0px 11px 15px 1px rgba(20, 21, 33, 0.14), 0px 4px 20px 3px rgba(20, 21, 33, 0.12)',
      '0px 7px 8px -4px rgba(20, 21, 33, 0.2), 0px 12px 17px 2px rgba(20, 21, 33, 0.14), 0px 5px 22px 4px rgba(20, 21, 33, 0.12)',
      '0px 7px 8px -4px rgba(20, 21, 33, 0.2), 0px 13px 19px 2px rgba(20, 21, 33, 0.14), 0px 5px 24px 4px rgba(20, 21, 33, 0.12)',
      '0px 7px 9px -4px rgba(20, 21, 33, 0.2), 0px 14px 21px 2px rgba(20, 21, 33, 0.14), 0px 5px 26px 4px rgba(20, 21, 33, 0.12)',
      '0px 8px 9px -5px rgba(20, 21, 33, 0.2), 0px 15px 22px 2px rgba(20, 21, 33, 0.14), 0px 6px 28px 5px rgba(20, 21, 33, 0.12)',
      '0px 8px 10px -5px rgba(20, 21, 33, 0.2), 0px 16px 24px 2px rgba(20, 21, 33, 0.14), 0px 6px 30px 5px rgba(20, 21, 33, 0.12)',
      '0px 8px 11px -5px rgba(20, 21, 33, 0.2), 0px 17px 26px 2px rgba(20, 21, 33, 0.14), 0px 6px 32px 5px rgba(20, 21, 33, 0.12)',
      '0px 9px 11px -5px rgba(20, 21, 33, 0.2), 0px 18px 28px 2px rgba(20, 21, 33, 0.14), 0px 7px 34px 6px rgba(20, 21, 33, 0.12)',
      '0px 9px 12px -6px rgba(20, 21, 33, 0.2), 0px 19px 29px 2px rgba(20, 21, 33, 0.14), 0px 7px 36px 6px rgba(20, 21, 33, 0.12)',
      '0px 10px 13px -6px rgba(20, 21, 33, 0.2), 0px 20px 31px 3px rgba(20, 21, 33, 0.14), 0px 8px 38px 7px rgba(20, 21, 33, 0.12)',
      '0px 10px 13px -6px rgba(20, 21, 33, 0.2), 0px 21px 33px 3px rgba(20, 21, 33, 0.14), 0px 8px 40px 7px rgba(20, 21, 33, 0.12)',
      '0px 10px 14px -6px rgba(20, 21, 33, 0.2), 0px 22px 35px 3px rgba(20, 21, 33, 0.14), 0px 8px 42px 7px rgba(20, 21, 33, 0.12)',
      '0px 11px 14px -7px rgba(20, 21, 33, 0.2), 0px 23px 36px 3px rgba(20, 21, 33, 0.14), 0px 9px 44px 8px rgba(20, 21, 33, 0.12)',
      '0px 11px 15px -7px rgba(20, 21, 33, 0.2), 0px 24px 38px 3px rgba(20, 21, 33, 0.14), 0px 9px 46px 8px rgba(20, 21, 33, 0.12)'
    ]
  }
}
export default Shadows
