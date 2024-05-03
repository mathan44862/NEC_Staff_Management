import { Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Showleave from '../ShowLeave';
import Calendar from './calender';
import Month from './template';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


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
      <Stack alignItems={'center'} marginBottom={'2%'}>
          <br />
          <br />
        <Stack direction={'row'} alignItems={"center"} gap={"7%"}>
          <div onClick={actionPreviousYear} style={{cursor:'pointer'}}><NavigateBeforeIcon></NavigateBeforeIcon></div>
          <Typography variant="h6" component="h1" sx={{  marginRight:'5%'}}>
            {currentYear}
          </Typography>
          <div onClick={actionNextYear} style={{cursor:'pointer'}}><NavigateNextIcon></NavigateNextIcon></div>
        </Stack>
      <br />
        <Stack direction={'row'} gap={'7%'} >
          <div onClick={actionPreviousMonth} style={{cursor:'pointer'}}><NavigateBeforeIcon></NavigateBeforeIcon></div>
          <Typography variant="h6" component="h1" sx={{  marginRight:'1%'}}>
            {Month(currentMonth)}
          </Typography>
          <div onClick={actionNextMonth} style={{cursor:'pointer'}}><NavigateNextIcon></NavigateNextIcon></div>
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
