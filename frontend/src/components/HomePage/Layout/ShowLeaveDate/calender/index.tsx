import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useUserLeaveMutation } from "../../../../../apis/userLogin";
import { MonthDays, Weak } from "../template";

interface CalendarProps {
  year: number;
  month: number;
}

interface LeaveInfo {
  date: number;
  month: number;
  year: number;
  reason: string;
  _id: string;
}

const Calendar: React.FC<CalendarProps> = ({ year, month }) => {
  const [userLeaveMutation, { data, error, isLoading }] =
    useUserLeaveMutation();
  const [userLeave, setUserLeave] = useState<LeaveInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await userLeaveMutation({ year, month });
        
        if (result && 'data' in result && 'data' in result.data) {
          setUserLeave(Array.isArray(result.data.data) ? result.data.data : [result.data.data]);
        }
        else {
          setUserLeave([]);
        }
      } catch (error) {
        console.error("Error fetching user leave details:", error);
      }
    };
    fetchData();
  }, [userLeaveMutation, year, month]);

  const getUserLeaveType = (day: number): number => {
    const leaveInfo = userLeave.find((leave) => leave.date === day);

    if (leaveInfo) {
      switch (leaveInfo.reason) {
        case "monthly":
          return -1;
        case "vacation":
          return -2;
        case "emergency":
          return -3;
        case "casualleave":
          return -4;
        case "official":
          return -5;
        case "exam":
          return -6;
        case "higherstudy":
          return -7;
        default:
          return day;
      }
    }

    return day;
  };

  const dateString = `${year}-${month}-01`;
  const dateObject = new Date(dateString);
  const dayOfWeek = dateObject.toLocaleDateString('en-US', { weekday: 'long' });
  const nildays = Weak(dayOfWeek) || 0;
  const daysInMonth = MonthDays(month, year) || 0;
  const calendarDays = [];

  for (let i = 0; i < nildays; i++) {
    calendarDays.push(0);
  }

  if (userLeave.length === 0) {
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i);
    }
  } else {
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(getUserLeaveType(i));
    }
  }

  const rows: number[][] = [];
  let currentRow: number[] = [];

  for (let i = 0; i < calendarDays.length; i++) {
    currentRow.push(calendarDays[i]);
    if (currentRow.length === 7 || i === calendarDays.length - 1) {
      rows.push([...currentRow]);
      currentRow = [];
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{color:'red'}}>Sunday</TableCell>
            <TableCell align="center">Monday</TableCell>
            <TableCell align="center">Tuesday</TableCell>
            <TableCell align="center">Wednesday</TableCell>
            <TableCell align="center">Thursday</TableCell>
            <TableCell align="center">Friday</TableCell>
            <TableCell align="center">Saturday</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((day, dayIndex) => (
                <TableCell key={dayIndex} align="center" style={{ color: day < 0 || dayIndex%7==0 ? 'red' : 'black' }}>
                  {
                    day !== 0 ? (
                    day === -1 ? 'M' :
                    day === -2 ? 'V' :
                    day === -3 ? 'E' :
                    day === -4 ? 'CL' :
                    day === -5 ? 'OF' :
                    day === -6 ? 'EX' :
                    day === -7 ? 'HS' :
                    day
                    ) : ' '
                  }
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Calendar;
