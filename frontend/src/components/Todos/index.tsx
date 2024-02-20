import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, TableHead } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

interface TodosProps {
  selectedItems: string[];
  handleCheckboxChange: (id: string) => void;
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
            <TableRow style={{ textAlign: 'center' }}>
              <TableCell align="center">
                <Checkbox
                  checked={selectedItems.includes("ID")}
                  onChange={() => handleCheckboxChange("ID")}
                  inputProps={{ 'aria-label': 'Select ID' }}
                />
              </TableCell>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Department</TableCell>
            </TableRow>
            {/* Render more rows as needed */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Todos;
