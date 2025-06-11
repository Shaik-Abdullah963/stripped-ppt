import React from 'react';
import PropTypes from 'prop-types';
import './Button.module.css'; // create this for your styles

export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  ...props
}) {
  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'icon']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
