import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';

export default function UpdateUser() {
  return (
    <Stack alignItems={'center'} margin={'6%'}>
        <Typography variant='h4' component={'h1'}>Customizable Fields 👇👇</Typography> <br />
        <br />
        <TextField
          id="outlined-helperText"
          label="Name"
          defaultValue="Default Value"
          sx={{width:'25%'}}
        />
        <br />
          <TextField
          id="outlined-helperText"
          label="Department"
          defaultValue="Default Value"
          sx={{width:'25%'}}
        />
        <br />
        <TextField
          id="outlined-helperText"
          label="Id"
          defaultValue="Default Value"
          sx={{width:'25%'}}
        />
        <br />
        <TextField
          id="outlined-helperText"
          label="Email"
          defaultValue="Default Value"
          sx={{width:'25%'}}
        />
        <br />
        <TextField
          id="outlined-helperText"
          label="Role"
          defaultValue="Default Value"
          sx={{width:'25%'}}
        />
        <br />
        <Button variant="contained">Update</Button>  
    </Stack>

  )
}
