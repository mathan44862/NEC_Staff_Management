import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import TemporaryDrawer from '../HODSidebar/index';

import { jwtDecode } from 'jwt-decode';
import Profile from '../../../Profile';
import { ShowRequestPage } from '../../../ShowRequestPage';
import ShowLeaveDate from '../../../ShowLeaveDate';




interface UserDetails {
  _id: string;
  email: String;
  password: String;
  role: String;
  id: String;
  department: String;
  name: String;
}


export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | null>('Calender');
  const [refreshShowStaff, setRefreshShowStaff] = useState<string>(new Date().toISOString());


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
        </Toolbar>
      </AppBar>
      <TemporaryDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        onSelectItem={handleSelectItem}
      />
      <div key={refreshShowStaff}>
        {selectedItem === 'Calender' && <ShowLeaveDate></ShowLeaveDate> }
        {selectedItem === 'ShowRequest' && <ShowRequestPage></ShowRequestPage> }
        {selectedItem === 'Profile' && <Profile></Profile> }
      </div>
    </Box>
  );
}
