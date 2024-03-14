import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from 'react';
import { useTodosendtodosMutation, useTodouserQuery } from '../../apis/Apis';

interface TodosProps {
  selectedItems: UserDetails[];
  handleCheckboxChange: (userData: UserDetails) => void;
  handleAssignTask: () => void;
}

interface UserDetails {
  _id: string;
  email: string;
  password: string;
  role: string;
  id: string;
  department: string;
  name: string;
}

function Todos() {
  const [showTable, setShowTable] = useState(false);
  const [selectedItems, setSelectedItems] = useState<UserDetails[]>([]);
  const [user, setUser] = useState<UserDetails[]>([]);
  const [staffSelected, setStaffSelected] = useState(false);
  const { data, refetch } = useTodouserQuery();
  const tableRef = useRef<HTMLDivElement>(null);
  const [task, setTask] = useState('');
  const [taskdescription, setTaskdescription] = useState('');
  const currentDate = new Date();
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [inputEntered, setInputEntered] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refetch();
        if (data && Array.isArray(data)) {
          setUser(data as UserDetails[]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [data, refetch]);

  useEffect(() => {
    setInputEntered(task !== '' && taskdescription !== '' && date !== null);
  }, [task, taskdescription, date]);

  const handleAssignWork = () => {
    setShowTable(true);
    setStaffSelected(true);
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleCheckboxChange = (userData: UserDetails) => {
    const index = selectedItems.findIndex(item => item._id === userData._id);
    if (index !== -1) {
      setSelectedItems(prevSelectedItems => {
        const updatedItems = [...prevSelectedItems];
        updatedItems.splice(index, 1);
        return updatedItems;
      });
    } else {
      setSelectedItems(prevSelectedItems => [...prevSelectedItems, userData]);
    }
  };

  const [sendTodosMutation] = useTodosendtodosMutation();

  const handleAssignTask = async () => {
    try {
      console.log(selectedItems);
      const formattedDate = dayjs(date).format('YYYY MM DD');
      const selectedDate = formattedDate.split(" ");
      console.log(selectedDate);
      const response = await sendTodosMutation({
        task,
        taskdescription,
        User: selectedItems ,
        date: parseInt(selectedDate[2]),
        month: parseInt(selectedDate[1]),
        year: parseInt(selectedDate[0]),
      });
      if ('data' in response) {
        if ('message' in response.data) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Error sending todos:', error);
    }
  };

  // Filter users based on the search query
  const filteredUsers = user.filter(userData =>
     userData.name && userData.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ maxWidth: '100%', padding: '20px', borderRadius: '8px', backgroundColor: '#FFFFFF', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ marginBottom: '20px', maxWidth: '400px', width: '100%', padding: '0 10px', display: 'flex', flexDirection: 'column' }}>
          
          <TextField
            id="outlined-basic"
            label="Enter Task Name"
            variant="outlined"
            style={{ marginBottom: '10px' }}
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <TextField
            id="outlined-multiline-static"
            label="Enter the Task"
            multiline
            style={{ marginBottom: '10px' }}
            rows={4}
            value={taskdescription}
            onChange={(e) => setTaskdescription(e.target.value)}
          />
          <div style={{ marginBottom: '10px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={'Date'}
                views={['year', 'month', 'day']}
                minDate={dayjs(currentDate).startOf('month')}
                value={date}
                onChange={(newDate) => setDate(newDate)}
              />
            </LocalizationProvider>
          </div>
          <Button variant="contained" onClick={handleAssignWork} disabled={!inputEntered || staffSelected} style={{ marginBottom: '10px' }}>Select Staff</Button>
          {staffSelected && (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="contained" onClick={handleAssignTask} style={{ marginLeft: '10px' }}>Assign Task</Button>
            </div>
          )}
        </div>
        {showTable &&
          <div ref={tableRef} style={{ overflowX: 'auto', padding: '0 10px', marginTop: '20px' }}>
            <CustomTable selectedItems={selectedItems} handleCheckboxChange={handleCheckboxChange} users={filteredUsers} handleAssignTask={function (): void {
              throw new Error('Function not implemented.');
            } } />
          </div>
        }
      </div>
    </div>
  );
}

function CustomTable({ selectedItems, handleCheckboxChange, users }: TodosProps & { users: UserDetails[] }) {
  return (
    <div>
      <div style={{ overflowX: 'auto' }}>
        <TableContainer component={Paper} style={{ width: '100%', padding: '0 0px', marginBottom: '-17px' }}>
          <Table aria-label="customized table" size="small">
            <TableHead>
              <TableRow style={{ backgroundColor: 'black' }}>
                <TableCell align="center" style={{ color: 'white' }}>SELECT</TableCell>
                <TableCell align="center" style={{ color: 'white' }}>ID</TableCell>
                <TableCell align="center" style={{ color: 'white' }}>Name</TableCell>
                <TableCell align="center" style={{ color: 'white' }}>Email</TableCell>
                <TableCell align="center" style={{ color: 'white' }}>Department</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((userData) => (
                <TableRow key={userData._id}>
                  <TableCell align="center">
                    <Checkbox
                      checked={selectedItems.some(item => item._id === userData._id)}
                      onChange={() => handleCheckboxChange(userData)}
                    />
                  </TableCell>
                  <TableCell align="center">{userData.id}</TableCell>
                  <TableCell align="center">{userData.name}</TableCell>
                  <TableCell align="center">{userData.email}</TableCell>
                  <TableCell align="center">{userData.department}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Todos;
