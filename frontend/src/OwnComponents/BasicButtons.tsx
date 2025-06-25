import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography, useTheme } from '@mui/material';

export default function BasicButtons() {
  const theme = useTheme()

  return (
    <Stack spacing={2} direction="row">
      <Typography variant='caption' sx={{color: theme.palette.grey[100]}}>Rutuja</Typography>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  );
}