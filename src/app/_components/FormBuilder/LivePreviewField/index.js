import React from 'react';

export const LivePreviewField = ({ field }) => {
  const renderField = () => {
    switch(field.type) {
      case 'textarea':
        return (
          <textarea
            placeholder={field.placeholder}
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 resize-none"
            rows={4}
          />
        );
      case 'select':
        return (
          <select className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-neutral-600">
            <option value="">Select an option</option>
            {field.options?.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </select>
        );
      case 'radio':
        return (
          <div className="flex flex-col gap-3">
            {field.options?.map((option, idx) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name={`preview_${field.id}`} className="w-4 h-4 accent-blue-500" />
                <span className="text-white">{option}</span>
              </label>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div className="flex flex-col gap-3">
            {field.options?.map((option, idx) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-blue-500" />
                <span className="text-white">{option}</span>
              </label>
            ))}
          </div>
        );
      case 'file':
        return (
          <div className="border-2 border-dashed border-neutral-700 rounded-lg p-10 text-center hover:border-neutral-600 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">📎</div>
            <div className="text-white mb-1">Click to upload</div>
            <div className="text-neutral-500 text-sm">Max {field.maxSize || '10MB'}</div>
          </div>
        );
      default:
        return (
          <input
            type={field.type}
            placeholder={field.placeholder}
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
          />
        );
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-base font-medium mb-2 text-white">
        {field.label || 'Untitled Field'}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {field.description && (
        <p className="text-neutral-400 text-sm mb-3">{field.description}</p>
      )}
      {renderField()}
    </div>
  );
};