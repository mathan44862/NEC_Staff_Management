import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import UpdateUser from "./Admin/UpdateUser";

interface UserDetails {
  _id: string;
  email: String;
  password: String;
  role: String;
  id: String;
  department: String;
  name: String;
}

// Move the function outside of the Profile component
const deleteDataFromLocalStorage = () => {
  const keyToDelete = "accessToken";

  if (localStorage.getItem(keyToDelete)) {
    localStorage.removeItem(keyToDelete);
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }
};

const Profile = () => {
  let hasToken = localStorage.getItem("accessToken");
  let user: UserDetails = hasToken
    ? jwtDecode(hasToken)
    : {
        _id: "",
        email: "",
        password: "",
        role: "",
        id: "norollno",
        department: "nodepartmentfound",
        name: "nouserfound",
      };
  console.log(user._id);

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      direction={isSmallScreen ? "column" : "row"}
      gap={isSmallScreen ? "5%" : "10%"}
      marginTop={"3%"}
    >
      <Stack alignItems={"center"}>
        <br />
        <AccountCircleIcon sx={{ height: "20%", width: "20%" }} />
        <Typography variant="h6" component="h1">
          {user.name}
        </Typography>
        <Typography variant="h6" component="h6">
          {user.department}
        </Typography>
        <Typography variant="h6" component="h6">
          {user.id}
        </Typography>
        <UpdateUser id={user._id}></UpdateUser>
      </Stack>
    </Stack>
  );
};

export default Profile;
export { deleteDataFromLocalStorage };
