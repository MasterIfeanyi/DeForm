'use client'

import React from 'react';
import PropTypes from 'prop-types';

/**
 * FieldLabel renders a label for a form field with optional required star
 * and accessibility support.
 */
const FieldLabel = ({ labelIdentifier, required = false, htmlFor, className = '', ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-gray-700 ${className}`}
      {...props}
    >
      <span>{labelIdentifier}</span>
      {required && (
        <span className="text-red-500 ml-1" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
};

FieldLabel.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  htmlFor: PropTypes.string,
  className: PropTypes.string,
};

export default FieldLabel;