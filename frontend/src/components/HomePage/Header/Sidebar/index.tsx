import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

interface SidebarProps {
  // Add any necessary props here
}

const Sidebar: React.FC<SidebarProps> = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const onselect = (text: string) => {
    console.log(`${text} selected`);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setDrawerOpen(false)}
      onKeyDown={() => setDrawerOpen(false)}
    >
      <List>
        {['Calender', 'ShowRequest', 'LeaveRequest', 'Profile'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => onselect(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default Sidebar;
