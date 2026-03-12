export const FIELD_TYPES = {
  SHORT_TEXT: {
    id: 'SHORT_TEXT',
    label: 'Short Text',
    icon: '📝',
    category: 'text',
    defaultConfig: {
      label: 'Untitled Question',
      placeholder: 'Type your answer here...',
      required: false,
      maxLength: 100,
    },
    validation: {
      rules: ['required', 'minLength', 'maxLength', 'pattern'],
    },
  },
  EMAIL: {
    id: 'EMAIL',
    label: 'Email',
    icon: '📧',
    category: 'text',
    defaultConfig: {
      label: 'Email Address',
      placeholder: 'example@email.com',
      required: true,
    },
    validation: {
      rules: ['required', 'email'],
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
  PHONE: {
    id: 'PHONE',
    label: 'Phone Number',
    icon: '📞',
    category: 'text',
    defaultConfig: {
      label: 'Phone Number',
      placeholder: '+1 (555) 000-0000',
      required: false,
    },
    validation: {
      rules: ['required', 'phone'],
    },
  },
  NUMBER: {
    id: 'NUMBER',
    label: 'Number',
    icon: '🔢',
    category: 'number',
    defaultConfig: {
      label: 'Number',
      placeholder: '0',
      required: false,
      min: null,
      max: null,
    },
    validation: {
      rules: ['required', 'min', 'max'],
    },
  },
  DATE: {
    id: 'DATE',
    label: 'Date',
    icon: '📅',
    category: 'date',
    defaultConfig: {
      label: 'Date',
      required: false,
      minDate: null,
      maxDate: null,
    },
    validation: {
      rules: ['required', 'minDate', 'maxDate'],
    },
  },
  FILE_UPLOAD: {
    id: 'FILE_UPLOAD',
    label: 'File Upload',
    icon: '📁',
    category: 'file',
    defaultConfig: {
      label: 'Upload File',
      required: false,
      maxSize: 5, // MB
      allowedTypes: ['image/*', 'application/pdf'],
    },
    validation: {
      rules: ['required', 'fileSize', 'fileType'],
    },
  },
  RATING: {
    id: 'RATING',
    label: 'Rating',
    icon: '⭐',
    category: 'choice',
    defaultConfig: {
      label: 'Rate your experience',
      required: false,
      max: 5,
      icon: 'star',
    },
    validation: {
      rules: ['required'],
    },
  },
  CHECKBOX: {
    id: 'CHECKBOX',
    label: 'Checkbox',
    icon: '☑️',
    category: 'choice',
    defaultConfig: {
      label: 'Select options',
      required: false,
      options: ['Option 1', 'Option 2'],
      minSelect: null,
      maxSelect: null,
    },
    validation: {
      rules: ['required', 'minSelect', 'maxSelect'],
    },
  },
};

export const getFieldTypeById = (id) => FIELD_TYPES[id];

export const getAllFieldTypes = () => Object.values(FIELD_TYPES);

export const getFieldTypesByCategory = (category) => {
  return Object.values(FIELD_TYPES).filter(
    (field) => field.category === category
  );
};