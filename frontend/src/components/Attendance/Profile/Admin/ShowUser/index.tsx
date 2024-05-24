import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import UpdateUser from "../UpdateUser";
import { useMediaQuery } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select'; // Import SelectChangeEvent
import {
  useDeleteuserMutation,
  useUserDetailsQuery,
} from "../../../../../apis/Apis";

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

interface UserDetails {
  _id: string;
  email: String;
  password: String;
  role: String;
  id: String;
  department: String;
  name: String;
}

const rowsPerPage = 10;

const ShowStaff = () => {
  const [updateUser, setUpdateUser] = useState<UserDetails | null>(null);
  const { data, error, isLoading, refetch } = useUserDetailsQuery();
  const [userInfo, setUserInfo] = useState<UserDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedRole, setSelectedRole] = useState("All");
  const isPortrait = useMediaQuery('(orientation: portrait)');
  const [apis] = useDeleteuserMutation();

  useEffect(() => {
    const fetchData = async () => {
      await refetch();
      if (data && Array.isArray(data)) {
        setUserInfo(data);
      }
    };

    fetchData();
  }, [data, refetch]);

  const filteredUserInfo = userInfo
    .filter((user) =>
      selectedDepartment === "All"
        ? true
        : user.department === selectedDepartment
    )
    .filter((user) =>
      selectedRole === "All" ? true : user.role === selectedRole
    )
    .filter(
      (user) =>
        user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const [page, setPage] = useState(0);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleDepartmentChange = (event: SelectChangeEvent<string>) => { // Fix: Import SelectChangeEvent
    setSelectedDepartment(event.target.value);
    setPage(0);
  };

  const handleRoleChange = (event: SelectChangeEvent<string>) => { // Fix: Import SelectChangeEvent
    setSelectedRole(event.target.value);
    setPage(0);
  };

  const handleUpdate = (user: UserDetails) => {
    setUpdateUser(user);
  };

  const handleDelete = async (_id: any) => {
    try {
      const response = await apis({ _id });
      if ("data" in response) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Unexpected error during sign-in:", error);
    }
  };

  return (
    <>
      {updateUser ? (
        <UpdateUser id={updateUser._id}></UpdateUser>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop={"10%"}
        >
          <div style={{ marginLeft: "5%", gap: "5%", display: "flex" }}>
            <TextField
              id="outlined-basic"
              label="Search Staff"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <FormControl>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedDepartment}
                label="Age"
                onChange={handleDepartmentChange}
                displayEmpty
                renderValue={(value) =>
                  value === "All" ? "All Departments" : value
                }
                inputProps={{ "aria-label": "Select department" }}
              >
                {/* Department options */}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                value={selectedRole}
                onChange={handleRoleChange}
                displayEmpty
                renderValue={(value) => (value === "All" ? "All Roles" : value)}
                inputProps={{ "aria-label": "Select role" }}
              >
                {/* Role options */}
              </Select>
            </FormControl>
          </div>
          <TableContainer
            component={Paper}
            sx={{ overflowX: isPortrait ? "auto" : "hidden" }}
          >
            <Table sx={{ minWidth: 500 }} aria-label="customized table">
              <TableBody>
                <br />
                {filteredUserInfo
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell scope="row" align="center">
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell scope="row" align="center">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.email}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.department}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.role}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        onClick={() => handleUpdate(row)}
                      >
                        <Typography sx={{ color: "blue", cursor: "pointer" }}>
                          Update
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography
                          sx={{ color: "red", cursor: "pointer" }}
                          onClick={() => handleDelete(row._id)}
                        >
                          Delete
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={filteredUserInfo.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </Box>
      )}
    </>
  );
};

export default ShowStaff
