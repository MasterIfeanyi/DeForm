export const FIELD_TYPES = [
  {
    id: "text",
    label: "fieldTypes.text",
    icon: "text",
    category: "text",
    defaultConfig: {
      label: "fields.default.text.label",
      placeholder: "fields.default.text.placeholder",
      required: false,  
      maxLength: 100
    },
    validation: {
      rules: ["required", "minLength", "maxLength", "pattern"]
    }
  },
  {
    id: "email",
    label: "fieldTypes.email",
    icon: "email",
    category: "text",
    defaultConfig: {
      label: "fields.default.email.label",
      placeholder: "fields.default.email.placeholder",
      required: true
    },
    validation: {
      rules: ["required", "email"],
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
  },
  {
    id: "tel",
    label: "fieldTypes.tel",
    icon: "phone",
    category: "text",
    defaultConfig: {
      label: "fields.default.tel.label",
      placeholder: "fields.default.tel.placeholder",
      required: false
    },
    validation: {
      rules: ["required", "phone"]
    }
  },
  {
    id: "number",
    label: "fieldTypes.number",
    icon: "number",
    category: "number",
    defaultConfig: {
      label: "fields.default.number.label",
      placeholder: "fields.default.number.placeholder",
      required: false,
      min: null,
      max: null
    },
    validation: {
      rules: ["required", "min", "max"]
    }
  },
  {
    id: "date",
    label: "fieldTypes.date",
    icon: "date",
    category: "date",
    defaultConfig: {
      label: "fields.default.date.label",
      required: false,
      minDate: null,
      maxDate: null
    },
    validation: {
      rules: ["required", "minDate", "maxDate"]
    }
  },
  {
    id: "file",
    label: "fieldTypes.file",
    icon: "file",
    category: "file",
    defaultConfig: {
      label: "fields.default.file.label",
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
    label: "fieldTypes.rating",
    icon: "star",
    category: "choice",
    defaultConfig: {
      label: "fields.default.rating.label",
      required: false,
      max: 5,
      icon: "star"
    },
    validation: {
      rules: ["required"]
    }
  },
  {
    id: "checkbox",
    label: "fieldTypes.checkbox",
    icon: "checkbox",
    category: "choice",
    defaultConfig: {
      label:  "fields.default.checkbox.label",
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



export const getAllFieldTypes = () => FIELD_TYPES;

export const getFieldTypesByCategory = (category) =>
  FIELD_TYPES.filter(field => field.category === category);


export const getFieldTypeById = (id) =>
  FIELD_TYPES.find(field => field.id === id);


export const FIELD_TYPES_MAP = Object.fromEntries(
  FIELD_TYPES.map(field => [field.id, field])
);