const Validator = require('validator');
const isEmpty = require('is-empty');
module.exports = function validateLoginInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.mail = !isEmpty(data.mail) ? data.mail : '';
  data.password = !isEmpty(data.password) ? data.password : '';
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
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
