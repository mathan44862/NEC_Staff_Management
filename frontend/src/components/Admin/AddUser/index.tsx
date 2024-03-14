import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
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

  const handleDepartmentChange = (event: SelectChangeEvent<string>) => {
    formik.setFieldValue('department', event.target.value);
  };
  
  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    formik.setFieldValue('role', event.target.value);
  };
  
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
            <FormControl>
          <InputLabel id="demo-simple-select-label">Department</InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.department}
              onChange={handleDepartmentChange}
              renderValue={(value) => (value === 'All' ? 'All Departments' : value)}
              inputProps={{ 'aria-label': 'Select department' }}
              sx={{ width: '310px' }}
            >
           <MenuItem value="IT">IT Department</MenuItem>
            <MenuItem value="CSE">CSE Department</MenuItem>
            <MenuItem value="AGRI">AGRI Department</MenuItem>
            <MenuItem value="AI & DS">AI & DS  Department</MenuItem>
            <MenuItem value="BME">BME  Department</MenuItem>
            <MenuItem value="CHEMICAL"> CHEMICAL  Department</MenuItem>
            <MenuItem value="CIVIL"> CIVIL  Department</MenuItem>
            <MenuItem value="IOT">  IOT Department</MenuItem>
            <MenuItem value="ECE"> ECE Department</MenuItem>
            <MenuItem value="MBA"> MBA  Department</MenuItem>
            <MenuItem value="MECH">MECH  Department</MenuItem>
            <MenuItem value="EEE"> ECE Department</MenuItem>
            <MenuItem value="S & H - ENGLISH"> S & H - ENGLISH Department</MenuItem>
            <MenuItem value="S & H - MATHEMATICS"> S & H - MATHEMATICS Department</MenuItem>
            <MenuItem value="S & H - PHYSICS"> S & H - PHYSICS Department</MenuItem>
            <MenuItem value="S & H -CHEMISTRY"> S & H -CHEMISTRY Department</MenuItem>
            <MenuItem value="S& H - LIBRARY">S& H - LIBRARY Department</MenuItem>
            <MenuItem value="S&H PHY.ED">S&H PHY.ED  Department</MenuItem>
            <MenuItem value="NEC">NEC</MenuItem>
          </Select>
        </FormControl>
        <br />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.role}
            onChange={handleRoleChange}
            renderValue={(value) => (value === 'All' ? 'All Roles' : value)}
            inputProps={{ 'aria-label': 'Select role' }}
            sx={{ width: '310px' }}
          >
            <MenuItem value="hod">HOD</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
            <MenuItem value="principal">Principal</MenuItem>
          </Select>
        </FormControl>
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