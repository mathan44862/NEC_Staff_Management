import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useSendRequestMutation } from "../../../../apis/Apis";
import useMediaQuery from "@mui/material/useMediaQuery";

const RequestLeave = () => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [reqRes, setReqRes] = useState(false);
  const [responseleave, setResponseLeave] = useState(false);
  const [sendReq] = useSendRequestMutation();
  const [reason, setReason] = React.useState("");
  const [reasonType, setReasonType] = React.useState("");
  const [validation, setValidation] = React.useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const currentDate = new Date();

  const sendRequest = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (date && reason.length > 0 && reasonType.length > 0) {
      const formattedDate = dayjs(date).format("YYYY MM DD");
      const selectedDate = formattedDate.split(" ");
      try {
        const response = await sendReq({
          date: parseInt(selectedDate[2]),
          month: parseInt(selectedDate[1]),
          year: parseInt(selectedDate[0]),
          reason: reason,
          reasonType: reasonType,
          session: session,
        });
        console.log(response);
        if ("data" in response) {
          if ("Noleave" in response.data) {
            setResponseLeave(true);
          }
          if ("message" in response.data) {
            setReqRes(true);
            setReasonType("");
            setReason("");
            setDate(null);
            setValidation(false);
          }
        }
      } catch (error) {
        console.error("Unexpected error during send request:", error);
      }
    } else {
      setValidation(true);
    }
  };

  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value as string);
  };

  const handleReasonTypeChange = (event: SelectChangeEvent<string>) => {
    setReasonType(event.target.value);
  };
  const [session, setsession] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setsession(event.target.value as string);
  };
  return (
    <>
      {!reqRes ? (
        <>
          <Card
            sx={{
              minWidth: 250,
              minHeight: 100,
              maxHeight: 600,
              color: "#3a86ff",
              margin: "auto",
              width: isSmallScreen ? "100%" : "80%",
              marginTop: "15%",
              boxShadow: 4,
            }}
          >
            <CardContent>
              <Stack
                sx={{ alignItems: "center", marginTop: "1rem", color: "black" }}
              >
                <Typography variant="h4" component="h1">
                  Send Leave Request
                </Typography>
                <br />
              </Stack>
              {responseleave ? (
                <Typography>Your {reason} leave limit exit </Typography>
              ) : null}
              {validation ? (
                <Typography sx={{ color: "red" }}>
                  All field required{" "}
                </Typography>
              ) : null}
              <Stack sx={{ width: "100%", margin: "auto" }}>
                <br />
                <FormControl sx={{ width: "100%", marginBottom: "1rem" }}>
                  <InputLabel id="demo-simple-select-label">
                    Leave-Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={reasonType}
                    label="Reason"
                    onChange={handleReasonTypeChange}
                    inputProps={{
                      style: {
                        borderColor: "blue",
                      },
                    }}
                    sx={{ width: "100%" }}
                  >
                    <MenuItem value="higherstudy">
                      Higher Study On-Duty
                    </MenuItem>
                    <MenuItem value="official">Official On-Duty</MenuItem>
                    <MenuItem value="exam">Exam On-Duty</MenuItem>
                    <MenuItem value="casualleave">Casual Leave</MenuItem>
                    <MenuItem value="medical">Medical</MenuItem>
                    <MenuItem value="vacation">Vacation</MenuItem>
                    <MenuItem value="others">Others</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  id="outlined-basic"
                  label="Leave - Reason"
                  variant="outlined"
                  value={reason}
                  onChange={handleReasonChange}
                  sx={{ width: "100%", marginBottom: "1rem" }}
                />
                <div style={{ display: "flex", gap: "16px" }}>
                  {" "}
                  {/* Add gap between the components */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div style={{ flex: 1 }}>
                      {" "}
                      {/* Flex to take available space */}
                      <DatePicker
                        label={"Date"}
                        views={["year", "month", "day"]}
                        minDate={dayjs(currentDate).startOf("month")}
                        value={date}
                        onChange={(newDate) => setDate(newDate)}
                      />
                    </div>
                  </LocalizationProvider>
                  <FormControl style={{ flex: 1 }}>
                    {" "}
                    {/* Flex to take available space */}
                    <InputLabel id="demo-simple-select-label">
                      Session
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="session"
                      value={session}
                      label="session"
                      onChange={handleChange}
                    >
                      <MenuItem value={"FN"}>FN</MenuItem>
                      <MenuItem value={"AN"}>AN</MenuItem>
                      <MenuItem value={"Day"}>FULL DAY</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <br />
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    backgroundColor: "#ffffff",
                    color: "#3a86ff",
                  }}
                  type="submit"
                  onClick={sendRequest}
                >
                  Send Request
                </Button>
              </Stack>
            </CardContent>
          </Card>
          <br />
        </>
      ) : (
        <Stack sx={{ alignItems: "center", marginTop: "1rem" }}>
          <br />
          <Typography variant="h6" component="h1">
            Leave Request Sent
          </Typography>
          <br />
          <Button
            variant="contained"
            sx={{ width: "20ch" }}
            onClick={() => setReqRes(false)}
          >
            Another Request
          </Button>
        </Stack>
      )}
    </>
  );
};

export default RequestLeave;
