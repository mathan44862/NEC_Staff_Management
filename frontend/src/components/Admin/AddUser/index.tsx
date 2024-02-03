import { Stack, Typography } from '@mui/material'
import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AddUser() {
  return (
    <Stack alignItems={'center'} margin={'5%'}>
      <Typography variant='h5' component={'h1'}>Enter Staff Details  👇👇</Typography> <br />
      <TextField id="outlined-basic" label="Name" variant="outlined" sx={{width:'25%'}} /> <br />
      <TextField id="outlined-basic" label="Department" variant="outlined" sx={{width:'25%'}} /> <br />
      <TextField id="outlined-basic" label="Id" variant="outlined" sx={{width:'25%'}} /> <br />
      <TextField id="outlined-basic" label="Email" variant="outlined" sx={{width:'25%'}} /> <br />
      <TextField id="outlined-basic" label="Role" variant="outlined" sx={{width:'25%'}} /> <br />

      <Button variant="contained">Add User </Button>
    </Stack>
  )
}
