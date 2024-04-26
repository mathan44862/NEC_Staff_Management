import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MyRoutes from '../../routes/MyRoutes';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedListItem, setSelectedListItem] = React.useState('');
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (itemName: string) => {
    if (itemName === selectedListItem) {
      setSelectedListItem('');
    } else {
      setSelectedListItem(itemName);
    }
  };

  const handleSubListItemClick = (itemName: string) => {
    setSelectedListItem(itemName);
    navigate(`/${itemName}`);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItemButton onClick={() => handleListItemClick('Tasks')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
          {selectedListItem === 'Tasks' ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={selectedListItem === 'Tasks'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => handleSubListItemClick('TaskList')}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Task List" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={() => handleListItemClick('Attendance')}>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Attendance" />
          {selectedListItem === 'Attendance' ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={selectedListItem === 'Attendance'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => handleSubListItemClick('Leave Request')}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Leave Request" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => handleSubListItemClick('LeaveApproval')}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Leave Approval" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar >
          <MyRoutes/>
        </Toolbar>
      </Box>
    </Box>
  );
}
