import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import UpdateUser from '../Admin/UpdateUser';

interface UserDetails {
    _id: string;
    email: String;
    password: String;
    role: String;
    id: String;
    department: String;
    name: String;
}

const Profile = () => {
    const navigate = useNavigate();
    const deleteDataFromLocalStorage = () => {
        const keyToDelete = 'accessToken';

        if (localStorage.getItem(keyToDelete)) {
            localStorage.removeItem(keyToDelete);
            navigate('/');
        }
    };

    let hasToken = localStorage.getItem('accessToken');
    let user: UserDetails = hasToken ? jwtDecode(hasToken) : {
        _id: '',
        email: '',
        password: '',
        role: '',
        id: 'norollno',
        department: 'nodepartmentfound',
        name: 'nouserfound'
    };

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            direction={isSmallScreen ? 'column' : 'row'}
            gap={isSmallScreen ? '5%' : '10%'}
        >
            <Stack alignItems={"center"}>
                <br />
                <AccountCircleIcon sx={{ height: '20%', width: '15%' }} />
                <Typography variant="h6" component="h1">{user.name}</Typography>
                <Typography variant="h6" component="h6">{user.department}</Typography>
                <Typography variant="h6" component="h6">{user.id}</Typography>
                <Button variant="contained" sx={{ width: '20ch', backgroundColor: "#3a86ff" }} onClick={deleteDataFromLocalStorage}>Log out</Button>
            </Stack>
            <Stack>
                <Stack marginTop={'17%'}>
                <UpdateUser user={user} ></UpdateUser>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default Profile;