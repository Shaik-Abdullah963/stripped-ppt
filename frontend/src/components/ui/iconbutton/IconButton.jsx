// src/components/ui/IconButton.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import './IconButton.css';

/**
 * An icon-only button. Inherits Button variants/sizes but hides text.
 */
export default function IconButton({
  variant = 'icon',
  size = 'md',
  disabled = false,
  children,
  'aria-label': ariaLabel,
  ...props
}) {
  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
      className={`icon-button ${props.className ?? ''}`}
    >
      {children}
    </Button>
  );
}

IconButton.propTypes = {
  /** The icon to render (an SVG or emoji) */
  children: PropTypes.node.isRequired,
  /** Accessible label for screen readers */
  'aria-label': PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'icon']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
};
