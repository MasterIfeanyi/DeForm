'use client'

import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { FiCheck } from 'react-icons/fi'; // Feather icons – lightweight

const Checkbox = ({
  checked = false,
  onChange,
  disabled = false,
  label,
  id,
  className = '',
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <label
      htmlFor={inputId}
      className={`inline-flex items-center gap-2 cursor-pointer ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      <input
        type="checkbox"
        id={inputId}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only peer"
        {...props}
      />

      <span
        className={`
          size-4 shrink-0 rounded-sm border shadow-xs transition-all
          border-border
          peer-checked:bg-primary peer-checked:border-primary peer-checked:text-primary-foreground
          peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2
          flex items-center justify-center
          ${disabled ? 'opacity-50' : ''}
        `}
      >
        {checked && <FiCheck className="size-3.5 stroke-3" />}
      </span>

      {label && <span className="text-sm text-foreground">{label}</span>}
    </label>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
};

export default Checkbox;