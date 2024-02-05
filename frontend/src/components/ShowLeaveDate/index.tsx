import { Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Showleave from '../ShowLeave';
import Calendar from './calender';
import Month from './template';

interface User {
  joiningdate: string;
}

const ShowLeaveDate = () => {
  const previousButton = '<';
  const nextButton = '>';
  const [currentYear, setCurrentYear] = useState<number>(0);
  const [currentMonth, setCurrentMonth] = useState<number>(0);
  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    if (currentYear === 0 && currentMonth === 0) {
      setCurrentYear(year);
      setCurrentMonth(month);
    }
  }, []);
  const actionPreviousYear = () => {
      setCurrentYear(currentYear-1);
  };
  const actionNextYear = () => {
      setCurrentYear(currentYear+1);
  };
  const actionNextMonth = () => {
    if(currentMonth === 12){
      setCurrentYear(currentYear+1);
      setCurrentMonth(1);
    }
    else{
      setCurrentMonth(currentMonth+1);
    }
  };
  const actionPreviousMonth = () => {
    if(currentMonth === 1){
      setCurrentYear(currentYear-1);
      setCurrentMonth(12);
    }
    else{
      setCurrentMonth(currentMonth-1);
    }
  };
  
  return (
    <Stack>
      <Stack alignItems={'center'}>
        <br />
        <Typography variant="h4" component="h1">
          Leave Calendar
        </Typography>
        <br />
        <Stack direction={'row'} alignItems={"center"} gap={"5%"}>
          <Button variant="contained" onClick={actionPreviousYear} sx={{ borderRadius: '50%' }}>{previousButton}</Button>
          <Typography variant="h6" component="h1" sx={{ width: "30%" }}>
            {currentYear}
          </Typography>
          <Button variant="contained" onClick={actionNextYear} sx={{ borderRadius: '50%' }}>{nextButton}</Button>
        </Stack>
      <br />
        <Stack direction={'row'} gap={'5%'} >
          <Button variant="contained" onClick={actionPreviousMonth} sx={{ borderRadius: '50%' }}>{previousButton}</Button>
          <Typography variant="h6" component="h1" sx={{ width: "40%" }}>
            {Month(currentMonth)}
          </Typography>
          <Button variant="contained" onClick={actionNextMonth} sx={{ borderRadius: '50%' }}>{nextButton}</Button>
        </Stack>
      </Stack>
      {
        currentYear !== 0  &&  currentMonth !== 0 ?  <Calendar year={currentYear} month={currentMonth}></Calendar> : null
      }
      {
        currentYear !== 0  &&  currentMonth !== 0  ?  <Showleave year={currentYear} month={currentMonth}></Showleave> : null
      }
    </Stack>
  );
};

export default ShowLeaveDate;
