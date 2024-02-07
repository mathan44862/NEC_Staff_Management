import React, { useState } from "react";
import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import TextField from '@mui/material/TextField';
import { useSendRequestMutation } from "../../apis/userLogin";

const RequestLeave = () => {
    const [date, setDate] = useState(null);
    const [reqRes, setReqRes] = useState(false);
    const [responseleave, setResponseLeave] = useState(false);
    const [sendReq] = useSendRequestMutation();
    const [reason, setReason] = React.useState('');
    const [others, setOthers] = React.useState('');

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
                    reason: reason === 'Others' ? others : reason
                });
                if ('data' in response) {
                    console.log(response);
                    if ('Noleave' in response.data) {
                        setResponseLeave(true);
                    }
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

    const handleReasonChange = (event: SelectChangeEvent) => {
        setReason(event.target.value as string);
    };
    
    const handleOthersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOthers(event.target.value);
    };

    return (
        <>
            {!reqRes ? (
                <>
                    <Card sx={{ minWidth: 250, minHeight: 100, maxHeight: 600, color: '#3a86ff', margin: 'auto', width: '80%', marginTop: '10%', boxShadow: 4 }}>
                        <CardContent>
                            <Stack sx={{ alignItems: 'center', marginTop: '1rem', color: 'black' }}>
                                <Typography variant='h4' component='h1'>Send Leave Request</Typography><br />
                            </Stack>
                            {responseleave ? <Typography>Your {reason} leave limit exit </Typography> : null}
                            <Stack sx={{ width: '100%', margin: 'auto' }}>
                            <Stack sx={{ width: '100%', margin: 'auto' }}>
                                <br />
                                <FormControl sx={{ width: '100%', marginBottom: '1rem' }}>
                                    <InputLabel id='demo-simple-select-label'>Reason</InputLabel>
                                    <Select
                                        labelId='demo-simple-select-label'
                                        id='demo-simple-select'
                                        value={reason}
                                        label='Reason'
                                        onChange={handleReasonChange}
                                        inputProps={{
                                            style: {
                                                borderColor: 'blue',
                                            },
                                        }}
                                        sx={{width:'100%'}}
                                    >
                                        <MenuItem value='higherstudy'>Higher Study On-Duty</MenuItem>
                                        <MenuItem value='official'>Official On-Duty</MenuItem>
                                        <MenuItem value='exam'>Exam On-Duty</MenuItem>
                                        <MenuItem value='casualleave'>Casual Leave</MenuItem>
                                        <MenuItem value='medical'>Medical</MenuItem>
                                        <MenuItem value='vacation'>Vacation</MenuItem>
                                        <MenuItem value='Others'>Others</MenuItem>
                                    </Select>
                                </FormControl>
                                {reason === 'Others' && (
                                    <TextField
                                        id='outlined-basic'
                                        label='Others'
                                        variant='outlined'
                                        value={others}
                                        onChange={handleOthersChange}
                                        sx={{ width: '100%', marginBottom: '1rem' }}
                                    />
                                )}
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
