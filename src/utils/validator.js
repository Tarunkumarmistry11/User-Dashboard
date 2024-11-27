export const validateUser = (user) => {
    const errors = {};
    if (!user.firstName.trim()) errors.firstName = 'First Name is required';
    if (!user.lastName.trim()) errors.lastName = 'Last Name is required';
    if (!/\S+@\S+\.\S+/.test(user.email)) errors.email = 'Invalid email address';
    if (!user.department) errors.department = 'Department is required';
    return errors;
  };