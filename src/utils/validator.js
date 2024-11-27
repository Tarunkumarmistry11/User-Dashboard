// utils/validators/userValidator.js

export const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };
  
  export const validateName = (name) => {
    return name.trim().length > 0;
  };
  
  export const validateDepartment = (department) => {
    return department.trim().length > 0;
  };
  
  export const validateUserForm = (user) => {
    const errors = {};
  
    if (!validateName(user.firstName)) {
      errors.firstName = "First Name is required.";
    }
  
    if (!validateName(user.lastName)) {
      errors.lastName = "Last Name is required.";
    }
  
    if (!validateEmail(user.email)) {
      errors.email = "Please enter a valid email address.";
    }
  
    if (!validateDepartment(user.department)) {
      errors.department = "Department is required.";
    }
  
    return errors;
  };
  