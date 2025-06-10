import React from 'react';
import PropTypes from 'prop-types';
import './Typography.css';

const VARIANTS = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  caption: 'span',
};

export default function Typography({ variant = 'body', children, className = '', ...props }) {
  const Tag = VARIANTS[variant] || VARIANTS.body;
  return (
    <Tag className={`typography typography--${variant} ${className}`} {...props}>
      {children}
    </Tag>
  );
}

Typography.propTypes = {
  /** One of 'h1'–'h6', 'body', or 'caption' */
  variant: PropTypes.oneOf(Object.keys(VARIANTS)),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};