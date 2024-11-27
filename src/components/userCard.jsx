import React from 'react';
import { TextField, Button, TableCell, TableRow, Typography } from '@mui/material';

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
          <TableCell>
            <Typography variant="body2">{user.id}</Typography>
          </TableCell>
          <TableCell>
            <TextField
              variant="outlined"
              fullWidth
              value={user.name}
              onChange={(e) => updateUserData(user.id, 'name', e.target.value)}
              label="First Name"
              sx={{ minWidth: { xs: 120, sm: 180 } }}
            />
          </TableCell>
          <TableCell>
            <TextField
              variant="outlined"
              fullWidth
              value={user.username}
              onChange={(e) => updateUserData(user.id, 'username', e.target.value)}
              label="Last Name"
              sx={{ minWidth: { xs: 120, sm: 180 } }}
            />
          </TableCell>
          <TableCell>
            <TextField
              variant="outlined"
              fullWidth
              value={user.email}
              onChange={(e) => updateUserData(user.id, 'email', e.target.value)}
              label="Email"
              type="email"
              sx={{ minWidth: { xs: 200, sm: 250 } }}
            />
          </TableCell>
          <TableCell>
            <TextField
              variant="outlined"
              fullWidth
              value={user.phone}
              onChange={(e) => updateUserData(user.id, 'phone', e.target.value)}
              label="Phone"
              sx={{ minWidth: { xs: 150, sm: 200 } }}
            />
          </TableCell>
          <TableCell>
            <TextField
              variant="outlined"
              fullWidth
              value={user.website}
              onChange={(e) => updateUserData(user.id, 'website', e.target.value)}
              label="Department"
              sx={{ minWidth: { xs: 150, sm: 200 } }}
            />
          </TableCell>
          <TableCell>
            <Button
              variant="contained"
              color="primary"
              onClick={stopEditing}
              sx={{ mt: { xs: 1, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
            >
              Save
            </Button>
          </TableCell>
        </>
      ) : (
        <>
          <TableCell>
            <Typography variant="body2">{user.id}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body2">{user.name}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body2">{user.username}</Typography>
          </TableCell>
          <TableCell>
            <Typography
              variant="body2"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: { xs: 100, sm: 150 },
              }}
            >
              {user.email}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body2">{user.phone}</Typography>
          </TableCell>
          <TableCell>
            <Typography
              variant="body2"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: { xs: 100, sm: 150 },
              }}
            >
              {user.website}
            </Typography>
          </TableCell>
          <TableCell>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => startEditing(user.id)}
              sx={{ marginRight: 1, width: { xs: '100%', sm: 'auto' } }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteUserData(user.id)}
              sx={{ width: { xs: '100%', sm: 'auto' }, mt: { xs: 1, sm: 0 } }}
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
