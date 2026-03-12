import Icon from '@/icons/Icon';
import React from 'react';

export const FieldTypeButton = ({ type, onClick }) => (
  <button
    onClick={() => onClick(type.id)}
    className="w-full px-3 py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600 rounded-lg text-left flex items-center gap-2.5 text-sm transition-all duration-150 active:scale-[0.98]"
  >
    {/* <span className="text-lg">{type.icon}</span> */}
    <Icon name={type.icon} className="w-4 h-4" />
    <span className="font-medium">{type.label}</span>
  </button>
);