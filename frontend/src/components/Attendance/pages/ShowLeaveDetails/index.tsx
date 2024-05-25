import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useUserLeavesQuery } from '../../../../apis/Apis';

interface ShowLeaves {
  date: number;
  month: number;
  year: number;
  reason: string;
  reasonType:string;
  session : string
}


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


const ShowLeaveDetails: React.FC = () => {
  const { data, error, isLoading, refetch } = useUserLeavesQuery();
  const [userLeaveInfo, setUserLeaveInfo] = useState<ShowLeaves[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refetch(); 
        if (data && Array.isArray(data)) {
          setUserLeaveInfo(data);
        }
      } catch (error) {
        console.error('Error fetching leave data:', error);
      }
    };
    fetchData();
  }, [data, refetch]); // Include refetch in the dependency array

  return (
    <TableContainer component={Paper} sx={{ width: '100%', margin: '0 auto', borderRadius: '8px', marginTop: '10%' }}>
      <Table sx={{ minWidth: 300, marginTop: '0%' }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'blueviolet' }}>
          <StyledTableCell align="center">ReasonType</StyledTableCell>
            <StyledTableCell align="center">Reason</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Month</StyledTableCell>
            <StyledTableCell align="center">Year</StyledTableCell>
            <StyledTableCell align='center'>Sesson</StyledTableCell>
           </TableRow>
        </TableHead>
        <TableBody>
          {userLeaveInfo.length > 0 ? (
            userLeaveInfo.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{row.reasonType}</StyledTableCell>
                <StyledTableCell align="center">{row.reason}</StyledTableCell>
                <StyledTableCell align="center">{row.date}</StyledTableCell>
                <StyledTableCell align="center">{row.month}</StyledTableCell>
                <StyledTableCell align="center">{row.year}</StyledTableCell>
                <StyledTableCell align="center">{row.session}</StyledTableCell> 
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={6} align="center">
                No Leave
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShowLeaveDetails;

