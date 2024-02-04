import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import AddUser from '../AddUser';
import ShowUser from '../ShowUser';
import TemporaryDrawer from '../sidebar/index';

export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | null>('User');
  const [refreshShowStaff, setRefreshShowStaff] = useState<string>(new Date().toISOString());

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    setDrawerOpen(false);
    if (item === 'User') {
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
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <TemporaryDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        onSelectItem={handleSelectItem}
      />
      <div key={refreshShowStaff}>
        {selectedItem === 'User' && <ShowUser key={refreshShowStaff} />}
        {selectedItem === 'AddUser' && <AddUser />}
      </div>
    </Box>
  );
}
