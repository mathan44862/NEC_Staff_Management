import { Box, Button, Stack } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import ShowStaff from "../Admin/ShowUser";
import Profile from "./Layout/Profile";
import RequestLeave from "./Layout/RequestLeave";
import ShowLeaveDate from "./Layout/ShowLeaveDate";


interface User{
    role:String
}
const HomePage = () => {
    const commonStyles = {
        bgcolor: 'background.paper',
        borderColor: 'text.primary',
        width: '100%',
        height: 'auto',
        borderRadius: 1 
    };
    const commonStyles1 = {
        bgcolor: 'background.paper',
        borderColor: 'text.primary',
        m: 1,
        border: 1,
        width: '80%',
        height: '100%',
        borderRadius: 1 
    };
    const commonStyles2 = {
        bgcolor: 'background.paper',
        borderColor: 'text.primary',
        m: 1,
        border: 1,
        width: '80%',
        height: '90%',
        borderRadius: 1 
    };
    const navigate = useNavigate();
    let hasToken = localStorage.getItem('accessToken');
    let user:User = hasToken ? (jwtDecode(hasToken)) : {role:'staff'};
    return (
        user.role === "principal" ? 
        <><Button variant="contained" sx={{ width: '20ch', marginLeft: '10%', marginTop: "5%" }} type="submit" onClick={() => { navigate('/showrequest'); } }>Show Request</Button><br /><br />
        <Stack direction={"column"} gap={'2%'} alignItems={"center"}>

                <Box sx={commonStyles2}>
                    <Profile></Profile>
                </Box>
                <Box sx={commonStyles2}>
                    <ShowStaff></ShowStaff>
                </Box>
            </Stack></> :
        <Stack direction={"column"} gap={'2%'} id="homepage">
        <Stack direction={"column"} >
            {
                user.role === "hod" ? <><Button variant="contained" sx={{ width: '20ch', marginLeft: '3%', marginTop: "5%" }} type="submit" onClick={() => { navigate('/showrequest'); } }>Show Request</Button><br /><br /></> : null
            }
            <Profile></Profile>
            <RequestLeave />
            <ShowLeaveDate></ShowLeaveDate>
        </Stack>
        
        </Stack>
        
    )
}
export default HomePage;