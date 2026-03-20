'use client'

import React from 'react';
import PropTypes from 'prop-types';
import Label from './Label'; // your existing reusable Label

/**
 * FieldLabel renders a label for a form field with optional required star
 * and accessibility support.
 */
const FieldLabel = ({ label, required = false, htmlFor, className = '', ...props }) => {
  return (
    <Label
      htmlFor={htmlFor}
      className={`block text-gray-700 ${className}`}
      {...props}
    >
      <span>{label}</span>
      {required && (
        <span className="text-red-500 ml-1" aria-hidden="true">
          *
        </span>
      )}
    </Label>
  );
};

FieldLabel.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  htmlFor: PropTypes.string,
  className: PropTypes.string,
};

export default FieldLabel;