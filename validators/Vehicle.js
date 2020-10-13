const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateVehicleInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.type = !isEmpty(data.type) ? data.type : '';
  data.model = !isEmpty(data.model) ? data.model : '';
  data.hullnumber = !isEmpty(data.hullnumber) ? data.hullnumber : '';


  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (Validator.isEmpty(data.type)) {
    errors.type = 'type field is required';
  }
  if (Validator.isEmpty(data.model)) {
    errors.model = 'Model field is required';
  }
  if (Validator.isEmpty(data.hullnumber)) {
    errors.hullnumber = 'Hullnumber field is required';
  }




  return {
    errors,
    isValid: isEmpty(errors)
  };
}