import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, TableHead } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useTodouserQuery, useUserDetailsQuery } from '../../apis/userLogin';
import Todostatus from '../Todostatus';

interface TodosProps {
  selectedItems: string[];
  handleCheckboxChange: (id: string) => void;
}

interface UserDetails{
  _id:string;
  email:String,
  password:String,
  role:String,
  id:String,
  department:String,
  name:String
}

function Todos() {
  const [showTable, setShowTable] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  

  const handleAssignWork = () => {
    setShowTable(true);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(id)) {
        return prevSelectedItems.filter((item) => item !== id);
      } else {
        return [...prevSelectedItems, id];
      }
    });
  };

  
    

  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5%' }}>
      <div style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '10px', padding: '20px', maxWidth: '400px', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField id="outlined-basic" label="Enter Task Name" variant="outlined" style={{ marginBottom: '20px', width: '100%' }} />
          <TextField id="filled-basic" label="Enter the Task" variant="filled" style={{ marginBottom: '20px', width: '100%' }} />
          <Button variant="contained" onClick={handleAssignWork} style={{ width: '100%' }}>Select Staff</Button>
        </div>
      </div>
      <br />
      <br />
      {showTable && <CustomTable selectedItems={selectedItems} handleCheckboxChange={handleCheckboxChange} />}
    </div>
  );
}

function CustomTable({ selectedItems, handleCheckboxChange }: TodosProps) {
  const [user, setUser] = useState<UserDetails[]>([]);
  const {data,refetch} = useTodouserQuery();

  useEffect(() => {
      const fetchData = async () => {
        try {
          await refetch(); 
          if (data && Array.isArray(data)) {
            setUser(data);
          }
        } catch (error) {
          console.error('Error fetching leave data:', error);
        }
      };
      fetchData();
  }, [data, refetch]);
  return (
    <div style={{ paddingTop: '50px', paddingBottom: '50px', textAlign: 'center' }}>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
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
          {user.length > 0 && user.map((userData) => (
              <TableRow key={userData._id}>
              <TableCell align="center">
              <Checkbox
                checked={selectedItems.includes(userData._id)}
                onChange={() => handleCheckboxChange(userData._id)}
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
  );
}

export default Todos;
