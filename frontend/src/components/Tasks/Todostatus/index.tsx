import {
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
  Container,
  Grid,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTodostatusQuery } from "../../../apis/Apis";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Todostatus {
  date: number;
  month: number;
  year: number;
  task: string;
  status: string;
  department: string;
  name: string;
  id: string;
  _id: string;
  taskdescription: string;
  role: string;
  taskby: string;
}

const Todostatus = () => {
  const { data, refetch } = useTodostatusQuery();
  const [userTodo, setUserTodo] = useState<Todostatus[]>([]);
  const [selectedRole, setSelectedRole] = useState("All");
  const [filteredTodo, setFilteredTodo] = useState<Todostatus[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refetch();
        if (data && Array.isArray(data)) {
          setUserTodo(data as Todostatus[]);
        }
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };
    fetchData();
  }, [data, refetch]);

  useEffect(() => {
    const filteredData = userTodo.filter(
      (todo) => selectedRole === "All" || todo.role === selectedRole
    );
    setFilteredTodo(filteredData);
  }, [selectedRole, userTodo]);

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setSelectedRole(event.target.value);
  };

  const isDatePastOrToday = (
    date: number,
    month: number,
    year: number
  ): boolean => {
    const currentDate = dayjs();
    const taskDate = dayjs(`${year}-${month}-${date}`);
    return (
      taskDate.isBefore(currentDate, "day") ||
      taskDate.isSame(currentDate, "day")
    );
  };

  return (
    <Container>
      <Grid container spacing={2} sx={{ marginTop: "10%" }}>
        <Grid item xs={12} md={6}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Role"
            value={selectedRole}
            onChange={handleRoleChange}
            displayEmpty
            renderValue={(value) => (value === "All" ? "Role" : value)}
            inputProps={{ "aria-label": "Select role" }}
            style={{ marginBottom: "20px", width: "50%" }}
          >
            <MenuItem value="All">All Roles</MenuItem>
            <MenuItem value="hod">HOD</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          margin: "0 auto",
          borderRadius: "8px",
          marginTop: "3%",
          overflowX: "auto",
        }}
      >
        <Table
          sx={{ minWidth: 300 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "blueviolet" }}>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Task</StyledTableCell>
              <StyledTableCell align="center">Task Description</StyledTableCell>
              <StyledTableCell align="center">Department</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Role</StyledTableCell>
              <StyledTableCell align="center">Assigned By</StyledTableCell>
              <StyledTableCell align="center">Target Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTodo.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.id}</StyledTableCell>
                <StyledTableCell align="center">{row.task}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.taskdescription}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.department}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ color: row.status === "finished" ? "green" : "red" }}
                >
                  {row.status}
                </StyledTableCell>
                <StyledTableCell align="center">{row.role}</StyledTableCell>
                <StyledTableCell align="center">{row.taskby}</StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{
                    color: isDatePastOrToday(row.date, row.month, row.year)
                      ? "red"
                      : "initial",
                  }}
                >
                  {row.date + "/" + row.month + "/" + row.year}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Todostatus;
