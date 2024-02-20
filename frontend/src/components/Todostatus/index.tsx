import React, { useEffect, useState } from 'react'
import { useTodostatusQuery } from '../../apis/userLogin'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material';

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
interface Todostatus {
    task:String,
    status:String,
    department:String,
    name:String,
    id:String
}

export default function Todostatus() {
    const {data,refetch} = useTodostatusQuery();
    const [userTodo, setUserTodo] = useState<Todostatus[]>([]);
    useEffect(() => {
    const fetchData = async () => {
      try {
        await refetch(); 
        console.log(data);
        if (data && Array.isArray(data)) {
          setUserTodo(data);
        }
      } catch (error) {
        console.error('Error fetching leave data:', error);
      }
    };
    fetchData();
  }, [data, refetch]);
  return (
    <div>
        <TableContainer component={Paper} sx={{ width: '80%', margin: '0 auto', borderRadius: '8px', marginTop:'3%' }}>
        <Table sx={{ minWidth: 300 , marginTop:'0%'}} aria-label="customized table">
            <TableHead>
            <TableRow sx={{backgroundColor:'blueviolet'}}>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">Task</StyledTableCell>
                <StyledTableCell align="center">Department</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {
                userTodo.length > 0 ? (
                    userTodo.map((row, index) => (
                <StyledTableRow key={index}>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">{row.id}</StyledTableCell>
                    <StyledTableCell align="center">{row.task}</StyledTableCell>
                    <StyledTableCell align="center">{row.department}</StyledTableCell>
                    <StyledTableCell align="center">{row.status}</StyledTableCell>
                </StyledTableRow>
                ))
                ):null
            }    
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}
