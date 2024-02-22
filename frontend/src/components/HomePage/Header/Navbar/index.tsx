import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { jwtDecode } from 'jwt-decode';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PeopleIcon from '@mui/icons-material/People';

interface UserDetails {
  role: string;
}

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  let hasToken = localStorage.getItem('accessToken');
  let user: UserDetails = hasToken ? jwtDecode(hasToken) : { role: '' };  
  const drawerListStaff = [
    { icon: <CalendarMonthIcon />, text: 'Calendar' },
    { icon: <PostAddIcon />, text: 'Leave Request' },
    { icon: <ReceiptLongIcon />, text: 'Leave Details' },
    { icon: <AssignmentIcon />, text: 'Task' }
  ];
  const drawerListHod = [
    { icon: <CalendarMonthIcon />, text: 'Calendar' },
    { icon: <PostAddIcon />, text: 'Leave Request' },
    { icon: <VisibilityIcon />, text: 'Show Request' },
    { icon: <ReceiptLongIcon />, text: 'Leave Details' },
    { icon: <PlaylistAddIcon />, text: 'Todos' },
    { icon: <AssignmentIcon />, text: 'Todos Status' }
  ];
  const drawerListAdmin = [
    { icon: <PeopleIcon />, text: 'user'},
    { icon: <VisibilityIcon />, text: 'Show Request' },
    { icon: <PersonAddIcon/>, text: 'Add User' }
  ];
  const pages = user.role === "admin" ? [...drawerListAdmin] : user.role === "hod" ? [...drawerListHod] : [...drawerListStaff];
  const settings = ['Profile', 'Logout'];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page: string | { icon: JSX.Element, text: string }) => {
    setAnchorElNav(null);
    if (typeof page === 'string') {
      if (page.toLowerCase() === "calendar") {
        navigate('/');
      } else if (page.toLowerCase() === "user") {
        navigate('/');
      } else {
        navigate('/' + page.toLowerCase());
      }
    } else {
      // Handle navigation for objects
      if (page.text.toLowerCase() === "calendar") {
        navigate('/');
      } else if (page.text.toLowerCase() === "user") {
        navigate('/');
      } else {
        navigate('/' + page.text.toLowerCase());
      }
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfile = (option: string) => {  
    if (option === "Logout") {
      const keyToDelete = 'accessToken';
      if (localStorage.getItem(keyToDelete)) {
        localStorage.removeItem(keyToDelete);
        window.location.reload();
      }
    } else {
      navigate('/' + option.toLowerCase());
    }
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="https://nandhaengg.org/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NEC
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', gap: '15%' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{typeof page === 'string' ? page : page.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <SchoolIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            // href="https://nandhaengg.org/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NEC
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {typeof page === 'string' ? (
                  <Typography variant="button">{page}</Typography>
                ) : (
                  <>
                    {page.icon}
                    <Typography variant="button">{page.text}</Typography>
                  </>
                )}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon sx={{color:'white'}}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <div key={setting}>
                  <MenuItem onClick={()=>{
                      handleProfile(setting);
                      handleCloseUserMenu();
                  }}>
                    <Typography textAlign="center" >{setting}</Typography>
                  </MenuItem>
                  {setting === 'Profile' && <Divider />}
                </div>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
