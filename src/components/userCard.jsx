import React from 'react';
import { TextField, Button, TableCell, TableRow } from '@mui/material';

const UserCard = ({
  user,
  editingUserId,
  startEditing,
  stopEditing,
  updateUserData,
  deleteUserData,
}) => {
  return (
    <TableRow>
      {editingUserId === user.id ? (
        <>
          <TableCell>{user.id}</TableCell>
          <TableCell>
            <TextField
              variant="outlined"
              fullWidth
              value={user.name}
              onChange={(e) => updateUserData(user.id, 'name', e.target.value)}
              label="Name"
            />
          </TableCell>
          <TableCell>{user.username}</TableCell>
          <TableCell>
            <TextField
              variant="outlined"
              fullWidth
              value={user.email}
              onChange={(e) => updateUserData(user.id, 'email', e.target.value)}
              label="Email"
              type="email"
            />
          </TableCell>
          <TableCell>
            <TextField
              variant="outlined"
              fullWidth
              value={user.phone}
              onChange={(e) => updateUserData(user.id, 'phone', e.target.value)}
              label="Phone"
            />
          </TableCell>
          <TableCell>
            <TextField
              variant="outlined"
              fullWidth
              value={user.website}
              onChange={(e) => updateUserData(user.id, 'website', e.target.value)}
              label="Website"
            />
          </TableCell>
          <TableCell>
            <Button
              variant="contained"
              color="primary"
              onClick={stopEditing}
            >
              Save
            </Button>
          </TableCell>
        </>
      ) : (
        <>
          <TableCell>{user.id}</TableCell>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.username}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.phone}</TableCell>
          <TableCell>{user.website}</TableCell>
          <TableCell>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => startEditing(user.id)}
              style={{ marginRight: 8 }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteUserData(user.id)}
            >
              Delete
            </Button>
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

export default UserCard;
