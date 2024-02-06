// Sidebar.tsx
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { Stack } from '@mui/material';

interface TemporaryDrawerProps {
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  drawerList: (string | ReactNode)[][];
}

const Sidebar: React.FC<TemporaryDrawerProps> = ({ drawerOpen, setDrawerOpen, drawerList }) => {
  const navigate = useNavigate();
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setDrawerOpen(false)}
      onKeyDown={() => setDrawerOpen(false)}
    >
      <List>
        {drawerList.map(([text, icon], index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => {
              (index === 0) ? navigate('/') : navigate('/' + text);
            }}>
              
            <Stack direction={"row"} gap={'10%'}>{icon}
              <ListItemText primary={text} /></Stack>
            
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
