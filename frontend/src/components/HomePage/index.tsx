import { Box, Button, Stack } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import ShowStaff from "../Admin/ShowUser";
import Profile from "./Layout/Profile";
import RequestLeave from "./Layout/RequestLeave";
import ShowLeaveDate from "./Layout/ShowLeaveDate";
import Navbar from "../Admin/navbar";

interface User {
  role: String;
}

const HomePage = () => {
  const commonStyles2 = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '80%',
    height: '90%',
    borderRadius: 1,
  };
  const navigate = useNavigate();
  let hasToken = localStorage.getItem('accessToken');
  let user: User = hasToken ? jwtDecode(hasToken) : { role: 'staff' };

  // Check user role and conditionally render content
  if (user.role === "admin") {
    return <Navbar />;
  } else if (user.role === "principal") {
    return (
      <>
        <Button
          variant="contained"
          sx={{ width: '20ch', marginLeft: '10%', marginTop: "5%" }}
          type="submit"
          onClick={() => { navigate('/showrequest'); }}
        >
          Show Request
        </Button>
        <Stack direction={"column"} gap={'2%'} alignItems={"center"}>
          <Box sx={commonStyles2}>
            <Profile />
          </Box>
          <Box sx={commonStyles2}>
            <ShowStaff />
          </Box>
        </Stack>
      </>
    );
  } else {
    // Handle other roles (hod, staff, etc.)
    return (
      <Stack direction={"column"} gap={'2%'} id="homepage">
        <Stack direction={"column"}>
          {user.role === "hod" && (
            <>
              <Button
                variant="contained"
                sx={{ width: '20ch', marginLeft: '3%', marginTop: "5%" }}
                type="submit"
                onClick={() => { navigate('/showrequest'); }}
              >
                Show Request
              </Button>
              <br /><br />
            </>
          )}
          <Profile />
          <RequestLeave />
          <ShowLeaveDate />
        </Stack>
      </Stack>
    );
  }
};

export default HomePage;
