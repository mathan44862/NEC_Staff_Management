import React, { useEffect, useState } from 'react';
import { useTodostatusQuery } from '../../apis/userLogin';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses
} from '@mui/material';
import dayjs from 'dayjs';

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
  date: number;
  month: number;
  year: number;
  task: string; // Corrected to use primitive type 'string'
  status: string;
  department: string;
  name: string;
  id: string;
  _id: string;
  taskdescription: string;
  role:string
}

export default function Todostatus() {
  const { data, refetch } = useTodostatusQuery();
  const [userTodo, setUserTodo] = useState<Todostatus[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refetch(); 
        console.log(data);
        if (data && Array.isArray(data)) {
          setUserTodo(data as Todostatus[]);
        }
      } catch (error) {
        console.error('Error fetching leave data:', error);
      }
    };
    fetchData();
  }, [data, refetch]);


  const isDatePastOrToday = (date: number, month: number, year: number): boolean => {
    const currentDate = dayjs();
    const taskDate = dayjs(`${year}-${month}-${date}`);
    return taskDate.isBefore(currentDate, 'day') || taskDate.isSame(currentDate, 'day');
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{ width: '80%', margin: '0 auto', borderRadius: '8px', marginTop: '3%' }}>
        <Table sx={{ minWidth: 300, marginTop: '0%' }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'blueviolet' }}>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Task</StyledTableCell>
              <StyledTableCell align="center">Task Description</StyledTableCell>
              <StyledTableCell align="center">Department</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Role</StyledTableCell>
              <StyledTableCell align="center">Target Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userTodo.length > 0 ? (
              userTodo.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.id}</StyledTableCell>
                  <StyledTableCell align="center">{row.task}</StyledTableCell>
                  <StyledTableCell align="center">{row.taskdescription}</StyledTableCell>
                  <StyledTableCell align="center">{row.department}</StyledTableCell>
                  <StyledTableCell align="center">{row.status}</StyledTableCell>
                  <StyledTableCell align="center">{row.role}</StyledTableCell>
                  <StyledTableCell align="center" style={{ color: isDatePastOrToday(row.date, row.month, row.year) ? 'red' : 'initial' }}>
                    {row.date + '/' + row.month + '/' + row.year}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
