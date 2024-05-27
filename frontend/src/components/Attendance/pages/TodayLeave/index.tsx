import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useTodayleaveQuery } from '../../../../apis/Apis';
import { useMediaQuery, useTheme } from "@mui/material";

interface ShowLeaves {
  date: number;
  month: number;
  year: number;
  reason: string;
  session:string;
  reasonType:string;
  role:string,
  name:string,
  department:string,
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


const TodayLeave: React.FC = () => {
  const { data, error, isLoading, refetch } = useTodayleaveQuery();
  const [userLeaveInfo, setUserLeaveInfo] = useState<ShowLeaves[]>([]);
  const theme = useTheme();
  const isSmaller = useMediaQuery(theme.breakpoints.down("sm"));


  useEffect(() => {
    const fetchData = async () => {
      try {
        await refetch(); // Correctly call refetch as a function
        console.log(data);
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
    <TableContainer component={Paper} sx={{ width: isSmaller ? "100%" : '80%', margin: '0 auto', borderRadius: '8px', marginTop: '15%' }}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'blueviolet' }}>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Department</StyledTableCell>
            <StyledTableCell align="center">Role</StyledTableCell>
            <StyledTableCell align="center">ReasonType</StyledTableCell>
            <StyledTableCell align="center">Reason</StyledTableCell>
            <StyledTableCell align="center">Session</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Month</StyledTableCell>
            <StyledTableCell align="center">Year</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userLeaveInfo.length > 0 ? (
            userLeaveInfo.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.department}</StyledTableCell>
                <StyledTableCell align="center">{row.role}</StyledTableCell>
                <StyledTableCell align="center">{row.reasonType}</StyledTableCell>
                <StyledTableCell align="center">{row.reason}</StyledTableCell>
                <StyledTableCell align="center">{row.session}</StyledTableCell>
                <StyledTableCell align="center">{row.date}</StyledTableCell>
                <StyledTableCell align="center">{row.month}</StyledTableCell>
                <StyledTableCell align="center">{row.year}</StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={9} align="center">
                No Leave
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodayLeave;

