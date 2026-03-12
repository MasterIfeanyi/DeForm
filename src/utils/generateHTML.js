export const generateHTML = (formData) => {
  const { title, description, fields } = formData;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || 'Form'}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      background: #0a0a0a;
      color: #e5e5e5;
      min-height: 100vh;
      padding: 2rem;
    }
    .container { max-width: 640px; margin: 0 auto; }
    h1 { font-size: 2.5rem; margin-bottom: 1rem; font-weight: 600; line-height: 1.2; }
    .description { color: #a3a3a3; margin-bottom: 2.5rem; line-height: 1.6; }
    .form-field { margin-bottom: 1.75rem; }
    label { display: block; font-size: 1rem; margin-bottom: 0.5rem; font-weight: 500; }
    .required { color: #ef4444; margin-left: 2px; }
    .helper-text { color: #737373; font-size: 0.875rem; margin-bottom: 0.625rem; }
    input[type="text"], input[type="email"], input[type="number"], input[type="tel"],
    input[type="url"], input[type="date"], input[type="time"], textarea, select {
      width: 100%;
      padding: 0.75rem 1rem;
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 0.5rem;
      color: #e5e5e5;
      font-size: 1rem;
      font-family: inherit;
      transition: border-color 0.2s;
    }
    textarea { resize: vertical; min-height: 120px; }
    input:focus, textarea:focus, select:focus { outline: none; border-color: #525252; }
    input::placeholder, textarea::placeholder { color: #666; }
    .radio-group, .checkbox-group { display: flex; flex-direction: column; gap: 0.75rem; }
    .option-label { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; }
    input[type="radio"], input[type="checkbox"] { width: 1.125rem; height: 1.125rem; accent-color: #3b82f6; cursor: pointer; }
    .file-upload { border: 2px dashed #333; border-radius: 0.5rem; padding: 2.5rem 2rem; text-align: center; cursor: pointer; transition: border-color 0.2s; }
    .file-upload:hover { border-color: #525252; }
    .file-icon { font-size: 2rem; margin-bottom: 0.5rem; }
    .file-text { color: #e5e5e5; margin-bottom: 0.25rem; }
    .file-limit { color: #666; font-size: 0.875rem; }
    input[type="file"] { display: none; }
    button[type="submit"] {
      width: 100%;
      padding: 1rem;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      margin-top: 0.5rem;
    }
    button[type="submit"]:hover { background: #2563eb; }
    .powered-by { text-align: center; margin-top: 2.5rem; color: #525252; font-size: 0.875rem; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${title || 'Form'}</h1>
    ${description ? `<p class="description">${description}</p>` : ''}
    
    <form id="generatedForm">
${fields.map(field => {
  let html = `      <div class="form-field">
        <label for="${field.id}">${field.label}${field.required ? '<span class="required">*</span>' : ''}</label>
        ${field.description ? `<p class="helper-text">${field.description}</p>` : ''}
`;
  
  switch(field.type) {
    case 'textarea':
      html += `        <textarea id="${field.id}" ${field.placeholder ? `placeholder="${field.placeholder}"` : ''} ${field.required ? 'required' : ''}></textarea>\n`;
      break;
    case 'select':
      html += `        <select id="${field.id}" ${field.required ? 'required' : ''}>
          <option value="">Select an option</option>
${field.options?.map(opt => `          <option value="${opt}">${opt}</option>`).join('\n') || ''}
        </select>\n`;
      break;
    case 'radio':
      html += `        <div class="radio-group">
${field.options?.map((opt, idx) => `          <label class="option-label">
            <input type="radio" name="${field.id}" value="${opt}" ${field.required && idx === 0 ? 'required' : ''}>
            <span>${opt}</span>
          </label>`).join('\n') || ''}
        </div>\n`;
      break;
    case 'checkbox':
      html += `        <div class="checkbox-group">
${field.options?.map(opt => `          <label class="option-label">
            <input type="checkbox" name="${field.id}[]" value="${opt}">
            <span>${opt}</span>
          </label>`).join('\n') || ''}
        </div>\n`;
      break;
    case 'file':
      html += `        <label class="file-upload" for="${field.id}">
          <div class="file-icon">📎</div>
          <div class="file-text">Click to upload</div>
          <div class="file-limit">Max ${field.maxSize || '10MB'}</div>
        </label>
        <input type="file" id="${field.id}" ${field.accept ? `accept="${field.accept}"` : ''} ${field.required ? 'required' : ''}>\n`;
      break;
    default:
      html += `        <input type="${field.type}" id="${field.id}" ${field.placeholder ? `placeholder="${field.placeholder}"` : ''} ${field.required ? 'required' : ''}>\n`;
  }
  
  html += `      </div>\n`;
  return html;
}).join('\n')}
      <button type="submit">Submit</button>
    </form>
    
    <div class="powered-by">Powered by DeForm</div>
  </div>
  
  <script>
    document.getElementById('generatedForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());
      console.log('Form submitted:', data);
      alert('Form submitted successfully!');
    });
  </script>
</body>
</html>`;
};