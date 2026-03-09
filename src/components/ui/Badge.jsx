'use client';

import React from 'react';


const variantStyles = {
  default: 'border-transparent bg-primary text-primary-foreground',
  secondary: 'border-transparent bg-secondary text-secondary-foreground',
  destructive: 'border-transparent bg-destructive text-destructive-foreground',
  outline:
    'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
};

const Badge = React.forwardRef(
  (
    {
      className = '',
      variant = 'default',
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles that apply to all badges
    const baseStyles = `
      inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium
      w-fit whitespace-nowrap shrink-0 gap-1
      [&>svg]:size-3 [&>svg]:pointer-events-none
      transition-[color,box-shadow] overflow-hidden
    `;

    // Combine base + variant + custom className
    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`.replace(
      /\s+/g,
      ' '
    );

    // If asChild is true and children is a valid element, clone it with merged props
    if (asChild && React.isValidElement(children)) {
      // Build props object conditionally to avoid passing ref if it's null
      const clonedProps = {
        className: combinedClassName,
        ...props,
      };
      
      // Only add ref if it exists
      if (ref) {
        clonedProps.ref = ref;
      }
      
      return React.cloneElement(children, clonedProps);
    }

    // Default: render a <span>
    return (
      <span
        ref={ref}
        data-slot="badge"
        className={combinedClassName}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';



export default Badge;