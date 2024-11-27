
export const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
  
  // Add a new user
  export const addUser = async (user) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
  
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Failed to add user');
        throw new Error('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  };
