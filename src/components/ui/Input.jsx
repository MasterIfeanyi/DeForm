'use client'

import React from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { clsx } from 'clsx'
import Icon from '@/icons/Icon'

const Input = ({
    id,
    label,
    type = "text",
    disabled,
    placeholder = "",
    required = false,
    onChange,
    value,
    className = "",
    labelClassName = "",
    wrapperClassName = "",
    icon = false,
    imgSrc,
    iconClassName = "",
    iconName,
    onIconClick,
    ...rest
  }) => {

  return (
    <div className={clsx("relative", wrapperClassName)}>
      {label && (
        <label 
          htmlFor={id} 
          className={clsx(
            "text-sm text-blackDark font-medium",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <input 
        id={id}
        type={type}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
        className={clsx(
          "w-full px-4 py-2 h-10 text-sm font-light mt-2 bg-white border rounded outline-none transition disabled:opacity-70 disabled:cursor-not-allowed border-grey focus:border-primary",
          icon && "pr-10",
          className
        )}
      />
      {iconName && (
        <Icon
          name={iconName}
          onClick={onIconClick}
          className={`absolute right-4 top-1/2 -translate-y-1/2 ${iconClassName}`}
        />

        // <img 
        //   src={imgSrc} 
        //   width={24}
        //   height={24}
        //   alt="icon" 
        //   className={clsx(
        //     "absolute right-3 bottom-2 w-6 h-6",
        //     iconClassName
        //   )}
        // />
      )}
    </div>
  )
}

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
  icon: PropTypes.bool,
  imgSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  iconClassName: PropTypes.string,
}

export default Input