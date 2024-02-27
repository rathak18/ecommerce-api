function validateData(data, requiredFields) {
    for (const field of requiredFields) {
      if (!data[field]) {
        return { isValid: false, message: `${field} is required` };
      }
    }
    return { isValid: true };
  }
  
  module.exports = validateData;
  