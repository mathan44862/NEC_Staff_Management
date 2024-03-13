import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useGetUserByIDQuery, useUpdateuserMutation } from '../../../apis/Apis';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  id: yup.string().required('Id is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  department: yup.string().required('Department is required'),
  role: yup.string().required('Role is required'),
});

export default function UpdateUser({id}:{id:String}) {
  const { data: user } = useGetUserByIDQuery({ id: id || 'null', payload: {} });
  const users = user && user.length > 0 ? user[0] : null;
  console.log(users);
  const [selectedDepartment, setSelectedDepartment] = useState(String(users?.department));
  const [selectedRole, setSelectedRole] = useState(String(users?.role));
  const [apis] = useUpdateuserMutation();

  const handleDepartmentChange = (event: SelectChangeEvent<string>) => {
    setSelectedDepartment(event.target.value);
  };

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setSelectedRole(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      name: users?.name || '',
      id: users?.id || '',
      email: users?.email || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("hi");
      handleSubmit();
    },
  });
  useEffect(() => {
    if (users) {
      formik.setValues({
        name: users?.name || '',
        id: users?.id || '',
        email: users?.email || '',
      });
      setSelectedDepartment(users?.department);
      setSelectedRole(users?.role);
    }
  }, [users]);
  const handleSubmit = async () => {
    try {
      console.log(user?._id);
      const response = await apis({
        _id:users?._id,
        email: formik.values.email ,
        name: formik.values.name,
        password: 'Mathan@22',
        role: selectedRole,
        id: formik.values.id,
        department: selectedDepartment
      });
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
          sx={{width:'35ch'}}
        />
        <br />
        <TextField
          id="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          sx={{width:'35ch'}}
        />
        <br />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Department</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedDepartment}
            label="Department"
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
            label="Role"
            value={selectedRole}
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
        <Button variant="contained" onClick={handleSubmit}>Update</Button>
      </Stack></>
    
  );
}
