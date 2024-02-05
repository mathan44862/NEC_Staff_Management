import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

interface TemporaryDrawerProps {
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectItem: (item: string) => void;
}

const Sidebar: React.FC<TemporaryDrawerProps> = ({ drawerOpen, setDrawerOpen, onSelectItem }) => {
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setDrawerOpen(false)}
      onKeyDown={() => setDrawerOpen(false)}
    >
      <List>
        {['Calender','SendRequest','Profile'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => onSelectItem(text)}>
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
