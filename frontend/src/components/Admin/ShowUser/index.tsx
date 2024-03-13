import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useDeleteuserMutation, useUserDetailsQuery } from '../../../apis/Apis';
import UpdateUser from '../UpdateUser';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface UserDetails {
  _id: string;
  email: String;
  password: String;
  role: String;
  id: String;
  department: String;
  name: String;
}

const rowsPerPage = 10;

const ShowStaff = () => {
  const [updateUser, setUpdateUser] = useState<UserDetails | null>(null);
  const { data, error, isLoading, refetch } = useUserDetailsQuery();
  const [userInfo, setUserInfo] = useState<UserDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');
  const [apis] = useDeleteuserMutation();

  useEffect(() => {
    const fetchData = async () => {
      await refetch(); // Assuming refetch is available in useUserDetailsQuery
      if (data && Array.isArray(data)) {
        setUserInfo(data);
      }
    };

    fetchData();
  }, [data, refetch]);
  const filteredUserInfo = userInfo
    .filter((user) => (selectedDepartment === 'All' ? true : user.department === selectedDepartment))
    .filter((user) => (selectedRole === 'All' ? true : user.role === selectedRole));

  const [page, setPage] = useState(0);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleDepartmentChange = (event: SelectChangeEvent<string>) => {
    setSelectedDepartment(event.target.value);
    setPage(0);
  };

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setSelectedRole(event.target.value);
    setPage(0);
  };
  
  const handleUpdate = (user: UserDetails) => {
    setUpdateUser(user);
  }

  const handleDelete = async (_id: any) => {
    try {
      const response = await apis({ _id });
      if ('data' in response) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Unexpected error during sign-in:', error);
    }
  }
  return (
    <>
    {
      updateUser ?  <UpdateUser id={updateUser._id}></UpdateUser> :
      <>
      <br />
      <div style={{ marginLeft: '5%', gap: '5%', display: 'flex' }}>
            <TextField id="outlined-basic" label="Search Staff" variant="outlined" value={searchQuery}
              onChange={handleSearchChange} />
            <FormControl>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedDepartment}
                label="Age"
                onChange={handleDepartmentChange}
                displayEmpty
                renderValue={(value) => (value === 'All' ? 'All Departments' : value)}
                inputProps={{ 'aria-label': 'Select department' }}
              >
                <MenuItem value="All">All Departments</MenuItem>
                <MenuItem value="IT">IT Department</MenuItem>
                <MenuItem value="CSE">CSE Department</MenuItem>
                <MenuItem value="AGRI">AGRI Department</MenuItem>
                <MenuItem value="AI & DS ">AI & DS  Department</MenuItem>
                <MenuItem value="BME ">BME  Department</MenuItem>
                <MenuItem value="CHEMICAL "> CHEMICAL  Department</MenuItem>
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

              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                value={selectedRole}
                onChange={handleRoleChange}
                displayEmpty
                renderValue={(value) => (value === 'All' ? 'All Roles' : value)}
                inputProps={{ 'aria-label': 'Select role' }}
              >
                <MenuItem value="All">All Roles</MenuItem>
                <MenuItem value="hod">HOD</MenuItem>
                <MenuItem value="staff">Staff</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableBody>
                  <br />
                  {(filteredUserInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)).map(
                    (row) => (
                      <StyledTableRow key={row._id}>
                        <StyledTableCell scope="row" align="center">
                          {row.id}
                        </StyledTableCell>
                        <StyledTableCell scope="row" align="center">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.email}</StyledTableCell>
                        <StyledTableCell align="center">{row.department}</StyledTableCell>
                        <StyledTableCell align="center">{row.role}</StyledTableCell>
                        <StyledTableCell align="center" onClick={() => handleUpdate(row)}>
                          <Typography sx={{ color: 'blue', cursor: 'pointer' }}>Update</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center" >
                          <Typography sx={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(row._id)}>Delete</Typography>
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer><TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={filteredUserInfo.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage} /></>
    }
    </>
  );
};

export default ShowStaff;
