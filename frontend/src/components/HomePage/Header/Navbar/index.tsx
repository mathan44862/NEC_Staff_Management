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
import Profile from '../../../Profile';
import { ShowRequestPage } from '../../../ShowRequestPage';
import ShowLeaveDate from '../../../ShowLeaveDate';
import RequestLeave from '../../../RequestLeave';
import { useNavigate } from 'react-router-dom';

interface UserDetails {
  _id: string;
  email: string;
  password: string;
  role: string;
  id: string;
  department: string;
  name: string;
}

export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | null>('Calender');
  const [refreshShowStaff, setRefreshShowStaff] = useState<string>(new Date().toISOString());

  const navigate = useNavigate();
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
    
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    setDrawerOpen(false);
    if (item === 'Calender') {
      handleRefreshShowStaff();
    }
  };

  const handleRefreshShowStaff = () => {
    setRefreshShowStaff(new Date().toISOString());
  };

  const handleLogOut = ()=>{
    const keyToDelete = 'accessToken';
        if (localStorage.getItem(keyToDelete)) {
            localStorage.removeItem(keyToDelete);
            navigate('/');
        }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Tooltip title="Logout" >
            <IconButton onClick={handleLogOut}>
              <LogoutRoundedIcon sx={{color:'white'}} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <TemporaryDrawer/>
    </Box>
  );
}
