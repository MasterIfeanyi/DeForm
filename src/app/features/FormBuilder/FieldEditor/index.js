import React from 'react';
import { AiOutlineDelete, AiOutlineDrag, AiOutlinePlus } from 'react-icons/ai';
// import { FIELD_TYPES } from '@/constants/fieldTypes';
import { FIELD_TYPES } from '@/lib/builder/fieldRegistry';

export const FieldEditor = ({ field, onUpdate, onDelete }) => {
  const hasOptions = ['radio', 'checkbox', 'select'].includes(field.type);
  
  const updateField = (property, value) => {
    onUpdate(field.id, { ...field, [property]: value });
  };
  
  const addOption = () => {
    const newOptions = [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`];
    updateField('options', newOptions);
  };
  
  const updateOption = (index, value) => {
    const newOptions = [...(field.options || [])];
    newOptions[index] = value;
    updateField('options', newOptions);
  };
  
  const deleteOption = (index) => {
    const newOptions = (field.options || []).filter((_, i) => i !== index);
    updateField('options', newOptions);
  };
  
  return (
    <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <AiOutlineDrag size={18} className="text-neutral-500 cursor-grab" />
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
            {FIELD_TYPES.find(t => t.id === field.type)?.label}
          </span>
        </div>
        <button
          onClick={() => onDelete(field.id)}
          className="text-red-400 hover:text-red-300 transition-colors"
          aria-label="Delete field"
        >
          <AiOutlineDelete size={16} />
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium mb-1.5 text-neutral-300">Label *</label>
          <input
            type="text"
            value={field.label}
            onChange={(e) => updateField('label', e.target.value)}
            placeholder="e.g., Full Name"
            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 focus:border-blue-500 rounded text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
          />
        </div>

        {!hasOptions && field.type !== 'file' && (
          <div>
            <label className="block text-xs font-medium mb-1.5 text-neutral-300">Placeholder</label>
            <input
              type="text"
              value={field.placeholder || ''}
              onChange={(e) => updateField('placeholder', e.target.value)}
              placeholder="e.g., Enter your name"
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 focus:border-blue-500 rounded text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-medium mb-1.5 text-neutral-300">Helper Text</label>
          <input
            type="text"
            value={field.description || ''}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Additional guidance (optional)"
            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 focus:border-blue-500 rounded text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
          />
        </div>

        {hasOptions && (
          <div>
            <label className="block text-xs font-medium mb-1.5 text-neutral-300">Options</label>
            <div className="space-y-2">
              {field.options?.map((option, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(idx, e.target.value)}
                    className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 focus:border-blue-500 rounded text-sm text-white focus:outline-none transition-colors"
                  />
                  {(field.options?.length || 0) > 2 && (
                    <button
                      onClick={() => deleteOption(idx)}
                      className="px-2.5 text-red-400 hover:text-red-300 transition-colors"
                      aria-label="Delete option"
                    >
                      <AiOutlineDelete size={14} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addOption}
                className="w-full px-3 py-2 bg-neutral-700 hover:bg-neutral-600 rounded text-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                <AiOutlinePlus size={14} />
                Add Option
              </button>
            </div>
          </div>
        )}

        {field.type === 'file' && (
          <div>
            <label className="block text-xs font-medium mb-1.5 text-neutral-300">Max File Size</label>
            <input
              type="text"
              value={field.maxSize || ''}
              onChange={(e) => updateField('maxSize', e.target.value)}
              placeholder="e.g., 10MB"
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 focus:border-blue-500 rounded text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
            />
          </div>
        )}

        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={field.required || false}
            onChange={(e) => updateField('required', e.target.checked)}
            className="w-4 h-4 accent-blue-500"
          />
          <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">Required field</span>
        </label>
      </div>
    </div>
  );
};