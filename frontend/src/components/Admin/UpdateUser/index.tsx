import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useUpdateuserMutation } from '../../../apis/userLogin';

interface UserDetails {
  _id: string;
  email: String;
  password: String;
  role: String;
  id: String;
  department: String;
  name: String;
}

interface UpdateUserProps {
  user: UserDetails;
}

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  id: yup.string().required('Id is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  department: yup.string().required('Department is required'),
  role: yup.string().required('Role is required'),
});

export default function UpdateUser({ user }: UpdateUserProps) {
  const [selectedDepartment, setSelectedDepartment] = useState(String(user.department));
  const [selectedRole, setSelectedRole] = useState(String(user.role));
  const [apis] = useUpdateuserMutation();

  const handleDepartmentChange = (event: SelectChangeEvent<string>) => {
    setSelectedDepartment(event.target.value);
  };

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setSelectedRole(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      name: user.name,
      id: user.id,
      email: user.email,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {

    },
  });
  const handleSubmit = async ()=>{
    try {
      const response = await apis({
        email: formik.values.email,
        _id: user._id,
        name: formik.values.name,
        password: 'Mathan@22',
        role: selectedRole,
        id: formik.values.id,
        department: selectedDepartment
      }
      );
      if ('data' in response) {
        if ('message' in response.data) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Unexpected error during sign-in:', error);
    }
  }
  return (
    <><Stack alignItems={"center"} margin={'6%'}>
        <br />
        <br />
        <TextField
          id="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          sx={{width:'35ch'}}
           />
        <br />
        
        <TextField
          id="id"
          label="Id"
          value={formik.values.id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.id && Boolean(formik.errors.id)}
          sx={{width:'35ch'}} />
        <br />
        <TextField
          id="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}

          sx={{width:'35ch'}} />
        <br />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Department</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedDepartment}
            label={user.department}
            onChange={handleDepartmentChange}
            renderValue={(value) => (value === 'All' ? 'All Departments' : value)}
            inputProps={{ 'aria-label': 'Select department' }}
            sx={{ width: '310px' }}
          >
            <MenuItem value="IT ">IT Department</MenuItem>
            <MenuItem value="CSE">CSE Department</MenuItem>
            <MenuItem value="AGRI">AGRI Department</MenuItem>
            <MenuItem value="AI & DS ">AI & DS  Department</MenuItem>
            <MenuItem value="BME ">BME  Department</MenuItem>
            <MenuItem value="CHEMICAL "> CHEMICAL  Department</MenuItem>
            <MenuItem value="CIVIL "> CIVIL  Department</MenuItem>
            <MenuItem value="IOT ">  IOT Department</MenuItem>
            <MenuItem value="ECE "> ECE Department</MenuItem>
            <MenuItem value="MBA "> MBA  Department</MenuItem>
            <MenuItem value="MECH ">MECH  Department</MenuItem>
            <MenuItem value="EEE "> ECE Department</MenuItem>
            <MenuItem value="S & H - ENGLISH "> S & H - ENGLISH Department</MenuItem>
            <MenuItem value="S & H - MATHEMATICS "> S & H - MATHEMATICS Department</MenuItem>
            <MenuItem value="S & H - PHYSICS "> S & H - PHYSICS Department</MenuItem>
            <MenuItem value="S & H -CHEMISTRY"> S & H -CHEMISTRY Department</MenuItem>
            <MenuItem value="S& H - LIBRARY">S& H - LIBRARY Department</MenuItem>
            <MenuItem value="S&H PHY.ED ">S&H PHY.ED  Department</MenuItem>
          </Select>
        </FormControl>
        <br />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            value={selectedRole}
            onChange={handleRoleChange}
            renderValue={(value) => (value === 'All' ? 'All Roles' : value)}
            inputProps={{ 'aria-label': 'Select role' }}
            sx={{ width: '310px' }}
          >
            <MenuItem value="hod">HOD</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
          </Select>
        </FormControl>
        <br />
        <Button variant="contained" onClick={handleSubmit}>Update</Button>
      </Stack></>
    
  );
}
