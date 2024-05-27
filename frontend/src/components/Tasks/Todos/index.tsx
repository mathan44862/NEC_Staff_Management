import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Checkbox,
  TextField,
  Container,
  Grid,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useTodosendtodosMutation, useTodouserQuery } from "../../../apis/Apis";

interface TodosProps {
  selectedItems: UserDetails[];
  handleCheckboxChange: (userData: UserDetails) => void;
  handleAssignTask: () => void;
}

interface UserDetails {
  _id: string;
  email: string;
  password: string;
  role: string;
  id: string;
  department: string;
  name: string;
}

function Todos() {
  const [showTable, setShowTable] = useState(false);
  const [selectedItems, setSelectedItems] = useState<UserDetails[]>([]);
  const [user, setUser] = useState<UserDetails[]>([]);
  const [staffSelected, setStaffSelected] = useState(false);
  const { data, refetch } = useTodouserQuery();
  const tableRef = useRef<HTMLDivElement>(null);
  const [task, setTask] = useState("");
  const [taskdescription, setTaskdescription] = useState("");
  const currentDate = new Date();
  const [date, setDate] = useState<Dayjs | null>(null);
  const [inputEntered, setInputEntered] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refetch();
        if (data && Array.isArray(data)) {
          console.log(data)
          setUser(data as UserDetails[]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [data, refetch]);

  useEffect(() => {
    setInputEntered(task !== "" && taskdescription !== "" && date !== null);
  }, [task, taskdescription, date]);

  const handleAssignWork = () => {
    setShowTable(true);
    setStaffSelected(true);
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleCheckboxChange = (userData: UserDetails) => {
    const index = selectedItems.findIndex((item) => item._id === userData._id);
    if (index !== -1) {
      setSelectedItems((prevSelectedItems) => {
        const updatedItems = [...prevSelectedItems];
        updatedItems.splice(index, 1);
        return updatedItems;
      });
    } else {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, userData]);
    }
  };

  const [sendTodosMutation] = useTodosendtodosMutation();

  const handleAssignTask = async () => {
    try {
      const formattedDate = dayjs(date).format("YYYY MM DD");
      const selectedDate = formattedDate.split(" ");
      console.log(selectedDate);
      const response = await sendTodosMutation({
        task,
        taskdescription,
        User: selectedItems,
        date: parseInt(selectedDate[2]),
        month: parseInt(selectedDate[1]),
        year: parseInt(selectedDate[0]),
      });
      if ("data" in response) {
        if ("message" in response.data) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error sending todos:", error);
    }
  };

  const filteredUsers = user.filter(
    (userData) =>
      userData.name &&
      userData.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container
      sx={{
        mt: 10, 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          width: "120%",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
          padding: 2,
        }}
      >
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Enter Task Name"
            variant="outlined"
            fullWidth
            style={{ marginBottom: "10px" }}
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <TextField
            id="outlined-multiline-static"
            label="Enter the Task"
            multiline
            fullWidth
            style={{ marginBottom: "10px" }}
            rows={4}
            value={taskdescription}
            onChange={(e) => setTaskdescription(e.target.value)}
          />
          <div style={{ marginBottom: "10px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={"Date"}
                views={["year", "month", "day"]}
                minDate={dayjs(currentDate).startOf("month")}
                value={date}
                onChange={(newDate) => setDate(newDate)}
              />
            </LocalizationProvider>
          </div>
          <Button
            variant="contained"
            onClick={handleAssignWork}
            disabled={!inputEntered || staffSelected}
            fullWidth
            style={{ marginBottom: "10px" }}
          >
            Select Staff
          </Button>
          {staffSelected && (
            <Grid
              container
              spacing={1}
              alignItems="center"
              style={{ marginBottom: "10px" }}
            >
              <Grid item xs={9}>
                <TextField
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  fullWidth
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  onClick={handleAssignTask}
                  fullWidth
                  disabled={user.length == 0 ? true : false}
                >
                  Assign Task
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
        {showTable && (
          <Grid item xs={12} ref={tableRef}>
            <CustomTable
              selectedItems={selectedItems}
              handleCheckboxChange={handleCheckboxChange}
              users={filteredUsers}
              handleAssignTask={handleAssignTask}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

function CustomTable({
  selectedItems,
  handleCheckboxChange,
  users,
  handleAssignTask,
}: TodosProps & { users: UserDetails[] }) {
  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
      <Table aria-label="customized table" size="small">
        <TableHead>
          <TableRow style={{ backgroundColor: "black" }}>
            <TableCell align="center" style={{ color: "white" }}>
              SELECT
            </TableCell>
            <TableCell align="center" style={{ color: "white" }}>
              ID
            </TableCell>
            <TableCell align="center" style={{ color: "white" }}>
              Name
            </TableCell>
            <TableCell align="center" style={{ color: "white" }}>
              Email
            </TableCell>
            <TableCell align="center" style={{ color: "white" }}>
              Department
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((userData) => (
            <TableRow key={userData._id}>
              <TableCell align="center">
                <Checkbox
                  checked={selectedItems.some(
                    (item) => item._id === userData._id
                  )}
                  onChange={() => {
                    handleCheckboxChange(userData);
                  }}
                />
              </TableCell>
              <TableCell align="center">{userData.id}</TableCell>
              <TableCell align="center">{userData.name}</TableCell>
              <TableCell align="center">{userData.email}</TableCell>
              <TableCell align="center">{userData.department}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Todos;
