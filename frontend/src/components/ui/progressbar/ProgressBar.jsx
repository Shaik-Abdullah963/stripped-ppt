import React from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.css';

export default function ProgressBar({ value = 0, label, height = '0.5rem' }) {
  // Clamp between 0 and 1
  const pct = Math.min(Math.max(value, 0), 1) * 100;

  return (
    <div className="progress-wrapper" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
      <div className="progress-bar" style={{ width: `${pct}%`, height }} />
      {label && <div className="progress-label">{label}</div>}
    </div>
  );
}

ProgressBar.propTypes = {
  /** Fractional value between 0 and 1 */
  value: PropTypes.number,
  /** Optional label to display (e.g. "Slide 3 of 10") */
  label: PropTypes.string,
  /** CSS height of the bar (any valid CSS size) */
  height: PropTypes.string,
};
