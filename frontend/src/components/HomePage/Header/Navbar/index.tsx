import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Tooltip from '@mui/material/Tooltip';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import IosShareIcon from '@mui/icons-material/IosShare';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PreviewIcon from '@mui/icons-material/Preview';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface UserDetails {
  role: string;
}

export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [pageTitle, setPageTitle] = useState<string>('Dashboard'); // State to hold page title
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

  const drawerListStaff = [['Calendar', <CalendarMonthIcon />], ['LeaveRequest', <IosShareIcon />],['LeaveDetails',<PreviewIcon/>],['Todos', <PlaylistAddIcon />],['Todosforstaff',<PlaylistAddIcon/>]];
  const drawerListHod = [['Calendar', <CalendarMonthIcon />], ['ShowRequest', <VisibilityIcon />],['LeaveDetails',<PreviewIcon/>], ['LeaveRequest', <IosShareIcon />],['Todos', <PlaylistAddIcon/>],['Todos Status',<PlaylistAddIcon />]];
  const drawerListAdmin = [['User', <PersonOutlineIcon />], ['ShowRequest', <VisibilityIcon />], ['AddUser', <PersonAddIcon />]];

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
            {pageTitle}
          </Typography>
          <Tooltip title="Logout">
            <IconButton onClick={handleLogOut} sx={{ ml: 0.5 }}> {/* Added marginLeft */}
              <LogoutRoundedIcon sx={{ color: 'white' }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
       <List>
  {(user.role === "staff" ? drawerListStaff :
    user.role === "hod" ? drawerListHod :
    drawerListAdmin).map((item, index) => (
    <ListItem button key={index} onClick={() => handleItemClick(item[0])}> {/* Change item[1] to item[0] */}
      <ListItemIcon>{item[1]}</ListItemIcon>
      <ListItemText primary={item[0]} />
    </ListItem>
  ))}
</List>

      </Drawer>
    </Box>
  );
}
