import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import TemporaryDrawer from '../Sidebar';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import IosShareIcon from '@mui/icons-material/IosShare';
import Person2Icon from '@mui/icons-material/Person2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PreviewIcon from '@mui/icons-material/Preview';



interface UserDetails {
  role: string;
}

export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  let hasToken = localStorage.getItem('accessToken');
  let user: UserDetails = hasToken ? jwtDecode(hasToken) : {
    role: ''
  };  
    
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleLogOut = () => {
    const keyToDelete = 'accessToken';
    if (localStorage.getItem(keyToDelete)) {
      localStorage.removeItem(keyToDelete);
      navigate('/');
    }
  }

  const drawerListStaff = [['Calendar', <CalendarMonthIcon />], ['LeaveRequest', <IosShareIcon />],['LeaveDetails',<PreviewIcon/>], ['Profile', <PersonPinIcon />]];
  const drawerListHod = [['Calendar', <CalendarMonthIcon />], ['ShowRequest', <VisibilityIcon />],['LeaveDetails',<PreviewIcon/>], ['LeaveRequest', <IosShareIcon />], ['Profile', <PersonPinIcon />]];
  const drawerListAdmin = [['User', <PersonOutlineIcon />], ['AddUser', <PersonAddIcon />], ['Profile', <PersonPinIcon />]];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0.5 }} // Reduced marginRight
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard 
          </Typography>
          <Tooltip title="Logout">
            <IconButton onClick={handleLogOut} sx={{ ml: 0.5 }}> {/* Added marginLeft */}
              <LogoutRoundedIcon sx={{ color: 'white' }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      {user.role === "staff" ? 
        <TemporaryDrawer
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          drawerList={drawerListStaff} // Pass the array list as a prop
        /> :
        user.role === "hod" ? 
        <TemporaryDrawer
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          drawerList={drawerListHod} // Pass the array list as a prop
        /> :
        <TemporaryDrawer
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          drawerList={drawerListAdmin} // Pass the array list as a prop
        />
      }
    </Box>
  );
}
