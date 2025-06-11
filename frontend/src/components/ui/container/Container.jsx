import React from 'react';
import PropTypes from 'prop-types';
import './Container.module.css';

/**
 * Centers content with max-width and horizontal padding.
 *
 * @param {('sm'|'md'|'lg'|'xl')} size  Which breakpoint to cap at
 * @param {React.ElementType} as        Which HTML tag to render
 */
export default function Container({
  size = 'md',
  as: Tag = 'div',
  children,
  className = '',
  ...props
}) {
  return (
    <Tag className={`container container--${size} ${className}`} {...props}>
      {children}
    </Tag>
  );
}

Container.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  as: PropTypes.elementType,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
