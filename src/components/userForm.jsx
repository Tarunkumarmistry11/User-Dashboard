import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const UserForm = ({ newUser, handleInputChange, addUser }) => {
  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2, 
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h5" textAlign="center" color="textPrimary" mb={2}>
        Add New User
      </Typography>
      <TextField
        label="Name"
        name="name"
        variant="outlined"
        fullWidth
        value={newUser.name}
        onChange={handleInputChange}
      />
      <TextField
        label="Username"
        name="username"
        variant="outlined"
        fullWidth
        value={newUser.username}
        onChange={handleInputChange}
      />
      <TextField
        label="Email"
        name="email"
        variant="outlined"
        fullWidth
        value={newUser.email}
        onChange={handleInputChange}
        type="email"
      />
      <TextField
        label="Phone"
        name="phone"
        variant="outlined"
        fullWidth
        value={newUser.phone}
        onChange={handleInputChange}
      />
      <TextField
        label="Website"
        name="website"
        variant="outlined"
        fullWidth
        value={newUser.website}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={addUser}
        sx={{
          mt: 2,
          py: 1.5,
          fontWeight: 'bold',
        }}
      >
        Add User
      </Button>
    </Box>
  );
};

export default UserForm;
