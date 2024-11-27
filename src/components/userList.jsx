import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import UserCard from "./userCard"
import { fetchUsers, addUser } from "../api/apiUrl";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '', // Default empty department
  });
  const [editingUserId, setEditingUserId] = useState(null);

  // Modal state
  const [open, setOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // You can change this value based on how many users you want per page

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const result = await fetchUsers();
        setUsers(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    loadUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleAddUser = async () => {
    try {
      const createdUser = await addUser(newUser);
      setUsers((prevUsers) => [...prevUsers, createdUser]);
      setNewUser({ firstName: '', lastName: '', email: '', department: '' });
      setOpen(false); // Close the modal after adding the user
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const startEditing = (id) => setEditingUserId(id);
  const stopEditing = () => setEditingUserId(null);

  const updateUserData = (id, key, value) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, [key]: value } : user
      )
    );
  };

  const deleteUserData = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  // Logic for pagination
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <h1>User List</h1>

      {/* Add User Button */}
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ marginBottom: 2 }}>
        Add User
      </Button>

      {/* Modal Dialog for Adding User */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              margin="normal"
              name="firstName"
              value={newUser.firstName}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              margin="normal"
              name="lastName"
              value={newUser.lastName}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
            />

            {/* Department Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Department</InputLabel>
              <Select
                name="department"
                value={newUser.department}
                onChange={handleInputChange}
                label="Department"
              >
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              editingUserId={editingUserId}
              startEditing={startEditing}
              stopEditing={stopEditing}
              updateUserData={updateUserData}
              deleteUserData={deleteUserData}
            />
          ))}
        </TableBody>
      </Table>

      {/* Pagination Component */}
      <Pagination
        count={Math.ceil(users.length / itemsPerPage)}
        page={currentPage}
        onChange={paginate}
        color="primary"
        showFirstButton
        showLastButton
      />
    </div>
  );
};

export default UserList;
