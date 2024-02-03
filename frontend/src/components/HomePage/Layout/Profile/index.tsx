import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Stack, Typography } from "@mui/material";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface User{
    name:String,
    department:String,
    id:String
}

const Profile = ()=>{
    const navigate = useNavigate();
    const deleteDataFromLocalStorage = () => {
 
        const keyToDelete = 'accessToken';
    

        if (localStorage.getItem(keyToDelete)) {
          localStorage.removeItem(keyToDelete);
          navigate('/');
        } 
      };
    let hasToken = localStorage.getItem('accessToken');
    let user:User = hasToken ? (jwtDecode(hasToken)) : {name:'nouserfound',department:'nodepaertmentfound',id:'norollno'};
    
    return(
        <Stack  alignItems={"center"}>
            <br />
            <AccountCircleIcon sx={{height:'20%',width:'15%' }}/>
            <Typography variant="h6" component="h1" >{user.name}</Typography>
            <Typography variant="h6" component="h6">{user.department}</Typography>
            <Typography variant="h6" component="h6">{user.id}</Typography>
            <Button variant="contained" sx={{width:'20ch',backgroundColor:"#3a86ff"}} onClick={deleteDataFromLocalStorage}>Log out</Button>    <br />
        </Stack>
    );
}
export default Profile;