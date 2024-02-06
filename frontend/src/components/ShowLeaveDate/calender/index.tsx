import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from "@mui/material";
import { MonthDays, Weak } from "../template";
import { useUserLeaveMutation } from "../../../apis/userLogin";

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
        console.log(result);
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
        case "medical":
          return -1;
        case "vacation":
          return -2;
        case "casualleave":
          return -3;
        case "official":
          return -4;
        case "exam":
          return -5;
        case "higherstudy":
          return -6;
        default:
          return -7;
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

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <TableContainer component={Paper} sx={{ maxWidth: isSmallScreen ? '80%' : '80%', margin: 'auto', border: '1px solid black' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ color: 'red' }}>Sun</TableCell>
            <TableCell align="center">Mon</TableCell>
            <TableCell align="center">Tue</TableCell>
            <TableCell align="center">Wed</TableCell>
            <TableCell align="center">Thu</TableCell>
            <TableCell align="center">Fri</TableCell>
            <TableCell align="center">Sat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((day, dayIndex) => (
                <TableCell key={dayIndex} align="center" sx={{ color: day < 0 || dayIndex % 7 === 0 ? 'red' : 'black' }}>
                  {
                    day !== 0 ? (
                      day === -1 ? 'M' :
                        day === -2 ? 'V' :
                            day === -3 ? 'CL' :
                              day === -4 ? 'OF' :
                                day === -5 ? 'EX' :
                                  day === -6 ? 'HS' :
                                  day === -7 ? 'O' :
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
