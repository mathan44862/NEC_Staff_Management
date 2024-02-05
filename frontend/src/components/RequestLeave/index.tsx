import { Button, Card, CardContent, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from "dayjs";
import React, { useState } from "react";
import { useSendRequestMutation } from "../../apis/userLogin";

// ... (previous imports)

const RequestLeave = () => {
    const [date, setDate] = useState(null);
    const [reason, setReason] = useState("");
    const [reqRes, setReqRes] = useState(false);
    const [sendReq] = useSendRequestMutation();
    const [onDuty, setOnDuty] = React.useState('');
    const [radioValue, setRadioValue] = React.useState('');

    const sendRequest = async (event: any) => {
        event.preventDefault();
        if (date && reason.length >= 0) {
            const formattedDate = dayjs(date).format('YYYY MM DD');
            const selectedDate = formattedDate.split(" ");
            
            try {
                const response = await sendReq({
                    date: parseInt(selectedDate[2]),
                    month: parseInt(selectedDate[1]),
                    year: parseInt(selectedDate[0]),
                    reason: reason
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue(event.target.value);
        setOnDuty(''); // Reset Select component value when choosing a radio button
        setReason(event.target.value);
    };

    const handleOnDutyChange = (event: SelectChangeEvent) => {
        setOnDuty(event.target.value as string);
        setRadioValue(''); // Reset radio button value when selecting from Select component
        setReason(event.target.value as string);
    };

    return (
        <>
            {!reqRes ?
                <>
                    
                    <Card sx={{ minWidth: 275 , minHeight:100,maxHeight:500 ,backgroundColor:'#ffffff',color:'#3a86ff'}}>
                        <CardContent>
                        <Stack sx={{ alignItems: "center", marginTop: '1rem' }}>
                        <Typography variant="h6" component="h1">Send Leave Request</Typography><br />
                    </Stack>
                    <Stack sx={{ marginLeft: '13%' }}>
                        <Typography variant="h6" component="h1">Reason of Leave</Typography><br />
                        <form onSubmit={sendRequest}>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    row
                                    value={radioValue}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
                                    <FormControlLabel value="emergency" control={<Radio />} label="Emergency" />
                                    <FormControlLabel value="vacation" control={<Radio />} label="Vacation" />
                                    <FormControlLabel value="casualleave" control={<Radio />} label="Casual Leave" />
                                </RadioGroup>
                                <br />
                                <FormControl sx={{ width: '80%' }}>
                                    <InputLabel id="demo-simple-select-label">On-Duty</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={onDuty}
                                        label="On-Duty"
                                        onChange={handleOnDutyChange}
                                        inputProps={{
                                            style: {
                                                borderColor: 'blue',
                                            },
                                        }}
                                    >
                                        <MenuItem value="higherstudy">Higher Study</MenuItem>
                                        <MenuItem value="official">Official</MenuItem>
                                        <MenuItem value="exam">Exam</MenuItem>
                                    </Select>
                                </FormControl>
                            </FormControl>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Pick your date"
                                        value={date}
                                        onChange={(newValue) => (setDate(newValue))}
                                        
                                    />
                                </DemoContainer>
                            </LocalizationProvider><br />
                            <Button variant="contained" sx={{ width: '20ch',backgroundColor:'#ffffff',color:'#3a86ff' }} type="submit">Send Request</Button>
                        </form>
                        <br />
                        <br />
                    </Stack>
                        </CardContent>
                    </Card>
                </>
                :
                <Stack sx={{ alignItems: "center", marginTop: '1rem' }}>
                    <Typography variant="h6" component="h1">Leave Request Sended</Typography><br />
                    <Button variant="contained" sx={{ width: '20ch' }} onClick={() => setReqRes(false)}>Another Request</Button>
                </Stack>
            }
        </>
    );
};

export default RequestLeave;

