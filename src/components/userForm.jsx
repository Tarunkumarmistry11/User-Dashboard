
import React from 'react';

const UserForm = ({ newUser, handleInputChange, addUser }) => {
  return (
    <div>
      <h2>Add New User</h2>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newUser.phone}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="website"
          placeholder="Website"
          value={newUser.website}
          onChange={handleInputChange}
        />
        <button onClick={addUser}>Add User</button>
      </div>
    </div>
  );
};

export default UserForm;
