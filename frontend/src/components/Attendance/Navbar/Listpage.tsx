import * as React from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

interface ListPageProps {
  selectedListItem: string;
  handleListItemClick: (itemName: string) => void;
  handleSubListItemClick: (itemName: string) => void;
}


const ListPage: React.FC<ListPageProps> = ({ selectedListItem, handleListItemClick, handleSubListItemClick }) => {
  let hasToken = localStorage.getItem('accessToken');
  let user: { role: String } = hasToken ? jwtDecode(hasToken) : { role: '' };
  return (
    <List>
      {
        user.role === "admin" ?  <><ListItemButton onClick={() => handleListItemClick('User')}>
          <ListItemIcon>
            {/* <InboxIcon /> */}
          </ListItemIcon>
          <ListItemText primary="User" />
          {selectedListItem === 'User' ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton><Collapse in={selectedListItem === 'User'} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleSubListItemClick('User')}>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText primary="User List" />
                </ListItemButton> 
            </List>
          </Collapse></> : null
      }
      <ListItemButton onClick={() => handleListItemClick('Tasks')}>
        <ListItemIcon>
          {/* <InboxIcon /> */}
        </ListItemIcon>
        <ListItemText primary="Tasks" />
        {selectedListItem === 'Tasks' ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={selectedListItem === 'Tasks'} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            user.role === "hod" || user.role === "staff" ?
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleSubListItemClick('Tasks')}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Tasks" />
              </ListItemButton> : null
          }
          {
            user.role === "hod" || user.role === "principal" ?
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleSubListItemClick('Assign Task')}>
                <ListItemIcon>
                  <PlaylistAddIcon />
                </ListItemIcon>
                <ListItemText primary="Assign Task" />
              </ListItemButton> : null
          }
          {
            user.role === "hod" || user.role === "principal" ?
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleSubListItemClick('Tasks Status')}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Tasks Status" />
              </ListItemButton> : null
          }
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
          {
            user.role === "hod" || user.role === "principal" ?
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleSubListItemClick('Leave')}>
                <ListItemIcon>
                  <PostAddIcon />
                </ListItemIcon>
                <ListItemText primary="Leave Request" />
              </ListItemButton> : null
          }
          {
            user.role === "hod" || user.role === "principal" ?
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleSubListItemClick('Leaverequest')}>
                <ListItemIcon>
                  <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary="Leave Approval" />
              </ListItemButton> : null
          }
          {
            user.role === "hod" || user.role === "staff" ?
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleSubListItemClick('Leave Details')}>
                <ListItemIcon>
                  <ReceiptLongIcon />
                </ListItemIcon>
                <ListItemText primary="Leave Details" />
              </ListItemButton> : null
          }
          {
            user.role === "hod" || user.role === "principal" ?
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleSubListItemClick('Today Leave')}>
                <ListItemIcon>
                  <ReceiptLongIcon />
                </ListItemIcon>
                <ListItemText primary="Today Leave" />
              </ListItemButton> : null
          }
          
        </List>
      </Collapse>
    </List>
  );
};

export default ListPage;
