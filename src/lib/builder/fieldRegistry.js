export const FIELD_TYPES = [
  {
    id: "SHORT_TEXT",
    label: "Short Text",
    icon: "text",
    category: "text",
    defaultConfig: {
      label: "Untitled Question",
      placeholder: "Type your answer here...",
      required: false,
      maxLength: 100
    },
    validation: {
      rules: ["required", "minLength", "maxLength", "pattern"]
    }
  },
  {
    id: "EMAIL",
    label: "Email",
    icon: "email",
    category: "text",
    defaultConfig: {
      label: "Email Address",
      placeholder: "example@email.com",
      required: true
    },
    validation: {
      rules: ["required", "email"],
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
  },
  {
    id: "PHONE",
    label: "Phone Number",
    icon: "phone",
    category: "text",
    defaultConfig: {
      label: "Phone Number",
      placeholder: "+1 (555) 000-0000",
      required: false
    },
    validation: {
      rules: ["required", "phone"]
    }
  },
  {
    id: "NUMBER",
    label: "Number",
    icon: "number",
    category: "number",
    defaultConfig: {
      label: "Number",
      placeholder: "0",
      required: false,
      min: null,
      max: null
    },
    validation: {
      rules: ["required", "min", "max"]
    }
  },
  {
    id: "DATE",
    label: "Date",
    icon: "date",
    category: "date",
    defaultConfig: {
      label: "Date",
      required: false,
      minDate: null,
      maxDate: null
    },
    validation: {
      rules: ["required", "minDate", "maxDate"]
    }
  },
  {
    id: "FILE_UPLOAD",
    label: "File Upload",
    icon: "upload",
    category: "file",
    defaultConfig: {
      label: "Upload File",
      required: false,
      maxSize: 5,
      allowedTypes: ["image/*", "application/pdf"]
    },
    validation: {
      rules: ["required", "fileSize", "fileType"]
    }
  },
  {
    id: "RATING",
    label: "Rating",
    icon: "star",
    category: "choice",
    defaultConfig: {
      label: "Rate your experience",
      required: false,
      max: 5,
      icon: "star"
    },
    validation: {
      rules: ["required"]
    }
  },
  {
    id: "CHECKBOX",
    label: "Checkbox",
    icon: "checkbox",
    category: "choice",
    defaultConfig: {
      label: "Select options",
      required: false,
      options: ["Option 1", "Option 2"],
      minSelect: null,
      maxSelect: null
    },
    validation: {
      rules: ["required", "minSelect", "maxSelect"]
    }
  }
];
export const getFieldTypeById = (id) => FIELD_TYPES[id];

export const getAllFieldTypes = () => Object.values(FIELD_TYPES);

export const getFieldTypesByCategory = (category) => {
  return Object.values(FIELD_TYPES).filter(
    (field) => field.category === category
  );
};

export const FIELD_TYPES_MAP = Object.fromEntries(
  FIELD_TYPES.map(field => [field.id, field])
);

// export const FIELD_TYPES = [
//   { id: 'text', label: 'Text Input', icon: '📝' },
//   { id: 'email', label: 'Email', icon: '✉️' },
//   { id: 'number', label: 'Number', icon: '🔢' },
//   { id: 'tel', label: 'Phone', icon: '📞' },
//   { id: 'url', label: 'URL', icon: '🔗' },
//   { id: 'textarea', label: 'Long Text', icon: '📄' },
//   { id: 'radio', label: 'Single Choice', icon: '⚪' },
//   { id: 'checkbox', label: 'Multiple Choice', icon: '☑️' },
//   { id: 'select', label: 'Dropdown', icon: '📋' },
//   { id: 'file', label: 'File Upload', icon: '📎' },
//   { id: 'date', label: 'Date', icon: '📅' },
//   { id: 'time', label: 'Time', icon: '⏰' }
// ];