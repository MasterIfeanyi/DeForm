export const VALIDATION_RULES = {
  required: {
    validate: (value) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== undefined && value !== '';
    },
    message: 'This field is required',
  },

  email: {
    validate: (value) => {
      if (!value) return true;
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    },
    message: 'Please enter a valid email address',
  },

  phone: {
    validate: (value) => {
      if (!value) return true;
      // Basic phone validation (customize as needed)
      return /^[\d\s\-\+\(\)]+$/.test(value) && value.replace(/\D/g, '').length >= 10;
    },
    message: 'Please enter a valid phone number',
  },

  minLength: {
    validate: (value, min) => {
      if (!value) return true;
      return value.length >= min;
    },
    message: (min) => `Must be at least ${min} characters`,
  },

  maxLength: {
    validate: (value, max) => {
      if (!value) return true;
      return value.length <= max;
    },
    message: (max) => `Must be no more than ${max} characters`,
  },

  min: {
    validate: (value, min) => {
      if (value === null || value === undefined || value === '') return true;
      return Number(value) >= min;
    },
    message: (min) => `Must be at least ${min}`,
  },

  max: {
    validate: (value, max) => {
      if (value === null || value === undefined || value === '') return true;
      return Number(value) <= max;
    },
    message: (max) => `Must be no more than ${max}`,
  },

  pattern: {
    validate: (value, pattern) => {
      if (!value) return true;
      return new RegExp(pattern).test(value);
    },
    message: 'Invalid format',
  },

  fileSize: {
    validate: (file, maxSizeMB) => {
      if (!file) return true;
      const maxBytes = maxSizeMB * 1024 * 1024;
      return file.size <= maxBytes;
    },
    message: (maxSizeMB) => `File must be smaller than ${maxSizeMB}MB`,
  },

  minSelect: {
    validate: (selectedArray, min) => {
      if (!selectedArray) return true;
      return selectedArray.length >= min;
    },
    message: (min) => `Select at least ${min} option(s)`,
  },

  maxSelect: {
    validate: (selectedArray, max) => {
      if (!selectedArray) return true;
      return selectedArray.length <= max;
    },
    message: (max) => `Select no more than ${max} option(s)`,
  },
};

export function validateField(field, value) {
  const errors = [];
  const fieldType = field.type;
  const config = field.config;

  // Required validation
  if (config.required && !VALIDATION_RULES.required.validate(value)) {
    errors.push(VALIDATION_RULES.required.message);
  }

  // Skip other validations if empty and not required
  if (!value && !config.required) return errors;

  // Type-specific validations
  switch (fieldType) {
    case 'EMAIL':
      if (!VALIDATION_RULES.email.validate(value)) {
        errors.push(VALIDATION_RULES.email.message);
      }
      break;

    case 'PHONE':
      if (!VALIDATION_RULES.phone.validate(value)) {
        errors.push(VALIDATION_RULES.phone.message);
      }
      break;

    case 'NUMBER':
      if (config.min !== null && !VALIDATION_RULES.min.validate(value, config.min)) {
        errors.push(VALIDATION_RULES.min.message(config.min));
      }
      if (config.max !== null && !VALIDATION_RULES.max.validate(value, config.max)) {
        errors.push(VALIDATION_RULES.max.message(config.max));
      }
      break;

    case 'SHORT_TEXT':
    case 'LONG_TEXT':
      if (config.maxLength && !VALIDATION_RULES.maxLength.validate(value, config.maxLength)) {
        errors.push(VALIDATION_RULES.maxLength.message(config.maxLength));
      }
      break;

    case 'CHECKBOX':
      if (config.minSelect && !VALIDATION_RULES.minSelect.validate(value, config.minSelect)) {
        errors.push(VALIDATION_RULES.minSelect.message(config.minSelect));
      }
      if (config.maxSelect && !VALIDATION_RULES.maxSelect.validate(value, config.maxSelect)) {
        errors.push(VALIDATION_RULES.maxSelect.message(config.maxSelect));
      }
      break;
  }

  return errors;
}

export function validateForm(fields, formData) {
  const allErrors = {};
  let isValid = true;

  fields.forEach((field) => {
    const value = formData[field.id];
    const errors = validateField(field, value);
    
    if (errors.length > 0) {
      allErrors[field.id] = errors;
      isValid = false;
    }
  });

  return { isValid, errors: allErrors };
}