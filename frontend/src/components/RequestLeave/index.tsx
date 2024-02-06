import React, { useState } from "react";
import {Button,Card,CardContent,FormControl,InputLabel,MenuItem,Select,SelectChangeEvent,Stack,Typography,Radio,RadioGroup,FormControlLabel,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import TextField from '@mui/material/TextField';
import { useSendRequestMutation } from "../../apis/userLogin";

const RequestLeave = () => {
    const [date, setDate] = useState(null);
    const [reqRes, setReqRes] = useState(false);
    const [sendReq] = useSendRequestMutation();
    const [onDuty, setOnDuty] = React.useState('');
    const [radioValue, setRadioValue] = React.useState('');

    const sendRequest = async (event: any) => {
        event.preventDefault();
        if (date) {
            const formattedDate = dayjs(date).format('YYYY MM DD');
            const selectedDate = formattedDate.split(" ");

            try {
                const response = await sendReq({
                    date: parseInt(selectedDate[2]),
                    month: parseInt(selectedDate[1]),
                    year: parseInt(selectedDate[0]),
                    reason: '' // Remove the reason since it's not needed
                });
                if ('data' in response) {
                    if ('message' in response.data) {
                        setReqRes(true);
                    }
                }
            } catch (error) {
                console.error('Unexpected error during send request:', error);
            }
        } else {
            console.log("Error");
        }
    };

    const handleOnDutyChange = (event: SelectChangeEvent) => {
        setOnDuty(event.target.value as string);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue(event.target.value);
    };

    return (
        <>
            {!reqRes ? (
                <>
                    <Card sx={{ minWidth: 250, minHeight: 100, maxHeight: 600, backgroundColor: 'black', color: '#3a86ff', margin: 'auto', width: '80%' }}>
                        <CardContent>
                            <Stack sx={{ alignItems: 'center', marginTop: '1rem', color: 'black' }}>
                                <Typography variant='h4' component='h1'>Send Leave Request</Typography><br />
                            </Stack>
                            <Stack sx={{ width: '100%', margin: 'auto' }}>
                            <Stack sx={{ width: '100%', margin: 'auto' }}>
                            <Stack sx={{ alignItems: 'center', marginTop: '1rem' }}>
                                    <form onSubmit={sendRequest}>
                                        <FormControl sx={{ marginLeft: '15%' }}>
                                            <RadioGroup
                                                aria-labelledby='demo-radio-buttons-group-label'
                                                name='radio-buttons-group'
                                                row
                                                value={radioValue}
                                    
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel value='monthly' control={<Radio />} label='Monthly' />
                                                <FormControlLabel value='emergency' control={<Radio />} label='Medical Leave' />
                                                <FormControlLabel value='vacation' control={<Radio />} label='Vacation' />
                                                <FormControlLabel value='casualleave' control={<Radio />} label='Casual Leave' />
                                            </RadioGroup>
                                            <br />
                                        </FormControl>
                                    </form>
                                </Stack>
                                <FormControl sx={{ width: '100%', marginBottom: '1rem' }}>
                                    <InputLabel id='demo-simple-select-label'>On-Duty</InputLabel>
                                    <Select
                                        labelId='demo-simple-select-label'
                                        id='demo-simple-select'
                                        value={onDuty}
                                        label='On-Duty'
                                        onChange={handleOnDutyChange}
                                        inputProps={{
                                            style: {
                                                borderColor: 'blue',
                                            },
                                        }}
                                        sx={{width:'100%'}}
                                    >
                                        <MenuItem value='higherstudy'>Higher Study</MenuItem>
                                        <MenuItem value='official'>Official</MenuItem>
                                        <MenuItem value='exam'>Exam</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField id='outlined-basic' label='Others' variant='outlined' sx={{ width: '100%', marginBottom: '1rem' }} />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label='Pick your date'
                                        value={date}
                                        onChange={(newValue) => (setDate(newValue))}
                                    />
                                </LocalizationProvider>
                                <br />
                                <Button variant='contained' sx={{ width: '30%', backgroundColor: '#ffffff', color: '#3a86ff' }} type='submit' onClick={sendRequest}>Send Request</Button>
                            </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                    <br />
                </>
            ) : (
                <Stack sx={{ alignItems: 'center', marginTop: '1rem' }}>
                    <br />
                    <Typography variant='h6' component='h1'>Leave Request Sent</Typography><br />
                    <Button variant='contained' sx={{ width: '20ch' }} onClick={() => setReqRes(false)}>Another Request</Button>
                </Stack>
            )}
        </>
    );
    
    
};

export default RequestLeave;
