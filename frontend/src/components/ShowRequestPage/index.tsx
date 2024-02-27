import { Button, Select, MenuItem, Stack, InputLabel } from '@mui/material'; // Import InputLabel
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { SelectChangeEvent } from '@mui/material/Select';
import { Chip } from '@mui/material'; // Import Chip
import { useEffect, useState } from 'react';
import { useApprovalLeaveRequestMutation, useDeclineLeaveRequestMutation } from '../../apis/userLogin';
import { useShowLeaveRequestQuery } from '../../apis/userLogin';

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

interface ShowLeaveRequest {
  name: string;
  date: number;
  month: number;
  year: number;
  reason: string;
  _id: string;
  id: string;
  reasonType: any; // Change 'String' to 'string'
  role: string;
  department: string;
}

export const ShowRequestPage = () => {
  const { data, error, isLoading, refetch } = useShowLeaveRequestQuery();
  const [userLeaveInfo, setUserLeaveInfo] = useState<ShowLeaveRequest[]>([]);
  const [page, setPage] = useState<number>(0);
  const [sendReq] = useApprovalLeaveRequestMutation();
  const [decReq] = useDeclineLeaveRequestMutation();
  const [selectedRole, setSelectedRole] = useState('All');

  useEffect(() => {
    if (data) {
      setUserLeaveInfo(data);
    }
  }, [data]);

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setSelectedRole(event.target.value);
    setPage(0);
  };

  const approvalRequest = async (id: any) => {
    try {
      const response = await sendReq({
        _id: id,
      });
      if ('data' in response) {
        if ('message' in response.data) {
          refetch();
        }
      }
    } catch (error) {
      console.error('Unexpected error during send request:', error);
    }
  };

  const declineRequest = async (id: any) => {
    try {
      const response = await decReq({
        _id: id,
      });
      if ('data' in response) {
        if ('message' in response.data) {
          refetch();
        }
      }
    } catch (error) {
      console.error('Unexpected error during send request:', error);
    }
  };

  const filteredLeaveInfo = userLeaveInfo.filter(
    (row) => selectedRole === 'All' || row.role === selectedRole
  );

  return (
    <div> 
      <Select
        sx={{ margin: '20px auto', marginLeft: '10%' }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Role"
        value={selectedRole}
        onChange={handleRoleChange}
        displayEmpty
        renderValue={(value) => (value === 'All' ? 'Role' : value)}
        inputProps={{ 'aria-label': 'Select role' }}
        style={{ marginBottom: '20px', width: '100px' }}
      >
        <MenuItem value="All">All Roles</MenuItem>
        <MenuItem value="hod">HOD</MenuItem>
        <MenuItem value="staff">Staff</MenuItem>
      </Select>
      <Stack sx={{ margin: '20px auto', alignItems: 'center' }}>
        <TableContainer component={Paper} sx={{ width: '80%' }}>
          <Table sx={{ minWidth: 300 }} aria-label="customized table">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'blueviolet' }}>
                <StyledTableCell align="center">Staff Id</StyledTableCell>
                <StyledTableCell align="center">Staff Name</StyledTableCell>
                <StyledTableCell align="center">Department</StyledTableCell>
                <StyledTableCell align="center">Role</StyledTableCell>
                <StyledTableCell align="center">Reason</StyledTableCell>
                <StyledTableCell align="center">Reason Type</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Month</StyledTableCell>
                <StyledTableCell align="center">Year</StyledTableCell>
                <StyledTableCell align="center">Approval Request</StyledTableCell>
                <StyledTableCell align="center">Decline Request</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLeaveInfo.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell scope="row" align="center">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell scope="row" align="center">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell scope="row" align="center">
                    {row.department}
                  </StyledTableCell>
                  <StyledTableCell scope="row" align="center">
                    {row.role}
                  </StyledTableCell>
                  <StyledTableCell scope="row" align="center">
                    {row.reason}
                  </StyledTableCell>
                  <StyledTableCell scope="row" align="center">
                    {row.reasonType}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.date}</StyledTableCell>
                  <StyledTableCell align="center">{row.month}</StyledTableCell>
                  <StyledTableCell align="center">{row.year}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button onClick={() => approvalRequest(row._id)}>Approval</Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button onClick={() => declineRequest(row._id)} sx={{ color: 'red' }}>
                      Decline
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </div>
  );
  
};
