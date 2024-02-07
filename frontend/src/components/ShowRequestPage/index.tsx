import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Key, ReactNode, useEffect, useState } from 'react';
import { useApprovalLeaveRequestMutation, useDeclineLeaveRequestMutation} from '../../apis/userLogin';
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
  // Add this line if id is optional
}



export const ShowRequestPage = () => {
  const { data, error, isLoading } = useShowLeaveRequestQuery();
  const [userLeaveInfo, setUserLeaveInfo] = useState<ShowLeaveRequest[]>([]);
  const [sendReq] = useApprovalLeaveRequestMutation();
  const [decReq] = useDeclineLeaveRequestMutation();

  useEffect(() => {
    if (data) {
      setUserLeaveInfo(data);
    }
  }, [data]);

  const approvalRequest = async (id: any) => {
    try {
      const response = await sendReq({
        _id: id,
      });
      if ('data' in response) {
        if ('message' in response.data) {
          window.location.reload();
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
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Unexpected error during send request:', error);
    }
  };

  console.log(data);

  return (
    <TableContainer component={Paper} sx={{ width: '80%', margin: '0 auto', borderRadius: '8px', marginTop:'3%' }}>
      {/* Adjust the 'width' and 'margin' properties above according to your requirements */}
      <Table sx={{ minWidth: 300 , marginTop:'0%'}} aria-label="customized table">
        <TableHead>
          <TableRow sx={{backgroundColor:'blueviolet'}}>
            <StyledTableCell align="center">Staff Id</StyledTableCell>
            <StyledTableCell align="center">Staff Name</StyledTableCell>
            <StyledTableCell align="center">Reason</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Month</StyledTableCell>
            <StyledTableCell align="center">Year</StyledTableCell>
            <StyledTableCell align="center">Approval Request</StyledTableCell>
            <StyledTableCell align="center">Decline Request</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
        { userLeaveInfo.length>0 ? userLeaveInfo.map((row) => (
  <StyledTableRow key={row.id}>
    <StyledTableCell scope="row" align="center">
      {row.id}
    </StyledTableCell>
    <StyledTableCell scope="row" align="center">
      {row.name}
    </StyledTableCell>
    <StyledTableCell scope="row" align="center">
      {row.reason}
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
)) : <h1 style={{textAlign:'center'}}>No Leave Request</h1>}
        </TableBody>
      </Table>
    </TableContainer>
      
  );
};