import React, { useState, useEffect } from "react";
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
  FormControl,
  FormHelperText,
  Typography,
  Grid,
} from "@mui/material";
import UserCard from "./userCard";
import { fetchUsers, addUser } from "../api/apiUrl";
import { validateUser } from "../utils/validator"; // Import the validator

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [open, setOpen] = useState(false); // Modal state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [errors, setErrors] = useState({}); // Error state

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const result = await fetchUsers();
        setUsers(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    loadUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleAddUser = async () => {
    const formErrors = validateUser(newUser);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const createdUser = await addUser(newUser);
      setUsers((prevUsers) => [...prevUsers, createdUser]);
      setNewUser({
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
      });
      setErrors({});
      setOpen(false);
    } catch (error) {
      console.error("Error adding user:", error);
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

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ backgroundColor: "#f0f0f0", minHeight: "100vh", p: 3 }}>
      <Grid container spacing={2} alignItems="center">
        {/* User Management Dashboard Heading */}
        <Grid item xs={12}>
          <Typography
            variant="h4"
            color="textPrimary"
            sx={{ mb: 2, textAlign: "center" }}
          >
            User Management Dashboard
          </Typography>
        </Grid>

        {/* Add User Button */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Add User
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              margin="normal"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              margin="normal"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              label="Phone"
              variant="outlined"
              margin="normal"
              name="phone"
              value={newUser.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <FormControl fullWidth margin="normal" error={!!errors.website}>
              <InputLabel>Department</InputLabel>
              <Select
                name="website"
                value={newUser.website}
                onChange={handleInputChange}
                label="Department"
              >
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
              </Select>
              {errors.website && (
                <FormHelperText>{errors.website}</FormHelperText>
              )}
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

      <Box
        sx={{
          overflowX: "auto",
          backgroundColor: "#fff",
          borderRadius: 1,
          p: 2,
          mt: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
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
      </Box>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={Math.ceil(users.length / itemsPerPage)}
          page={currentPage}
          onChange={paginate}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
};

export default UserList;
