const Validator = require('validator');
const isEmpty = require('is-empty');
module.exports = function validateRegisterInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : '';
  data.mail = !isEmpty(data.mail) ? data.mail : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  // Email checks
  if (Validator.isEmpty(data.mail)) {
    errors.mail = 'Email field is required';
  } else if (!Validator.isEmail(data.mail)) {
    errors.mail = 'Email is invalid';
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
