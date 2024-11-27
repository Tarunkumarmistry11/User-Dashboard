export const validateUser = (user) => {
    const errors = {};
    if (!user.name.trim()) errors.name = 'First Name is required';
    if (!user.username.trim()) errors.username = 'Last Name is required';
    if (!/\S+@\S+\.\S+/.test(user.email)) errors.email = 'Invalid email address';
    if (!user.website) errors.website = 'Department is required';
    return errors;
  };