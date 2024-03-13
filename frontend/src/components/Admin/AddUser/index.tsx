import { IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import { useAdduserMutation } from '../../../apis/Apis';

// Assuming UserDetails type includes _id and password properties
type UserDetails = {
  _id: string;
  name: string;
  department: string;
  id: string;
  email: string;
  role: string;
  password: string;
};

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  department: yup.string().required('Department is required'),
  id: yup.string().required('ID is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
  role: yup.string().required('Role is required'),
});

const AddUser: React.FC = () => {
  const [accountAdded, setAccountAdded] = useState(false);
  const [accountAlready, setAccountAlready] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signIn] = useAdduserMutation();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const formik = useFormik<UserDetails>({
    initialValues: {
      _id: '',
      name: '',
      department: '',
      id: '',
      email: '',
      role: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await signIn(values);
        if ('data' in response) {
          if ('message' in response.data) {
            setAccountAdded(true);
            setAccountAlready(false);
            resetForm();
          }
          if ('error' in response.data) {
            setAccountAlready(true);
          }
        }
      } catch (error) {
        console.error('Unexpected error during sign-in:', error);
      }
    },
  });

  return (
    <>
      {accountAdded ? (
        <Stack sx={{ alignItems: 'center', marginTop: '1rem' }}>
          <Typography variant="h6" component="h1">Account Added</Typography><br />
          <Button variant="contained" sx={{ width: '20ch' }} onClick={() => setAccountAdded(false)}>Add Another Account</Button>
        </Stack>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Stack alignItems={'center'} margin={'5%'}>
            <Typography variant='h5' component={'h1'}>
              Enter Staff Details
            </Typography>{' '}
            {accountAlready && <span style={{ color: 'red' }}><br />Already Account is there</span>}
            <br /> <br />
            <TextField
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              sx={{ width: '35ch' }}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <br />
            <TextField
              id="department"
              name="department"
              label="Department"
              variant="outlined"
              sx={{ width: '35ch' }}
              value={formik.values.department}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.department && Boolean(formik.errors.department)}
              helperText={formik.touched.department && formik.errors.department}
            />
            <br />
            <TextField
              id="id"
              name="id"
              label="Id"
              variant="outlined"
              sx={{ width: '35ch' }}
              value={formik.values.id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.id && Boolean(formik.errors.id)}
              helperText={formik.touched.id && formik.errors.id}
            />
            <br />
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              sx={{ width: '35ch' }}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <br />
            <TextField
              id="password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              sx={{ width: '35ch' }}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <br />
            <TextField
              id="role"
              name="role"
              label="Role"
              variant="outlined"
              sx={{ width: '35ch' }}
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
            />
            <br />
            <Button type="submit" variant="contained" disabled={!(formik.isValid && formik.dirty)}>
              Add User
            </Button>
          </Stack>
        </form>
      )}
    </>
  );
};

export default AddUser;