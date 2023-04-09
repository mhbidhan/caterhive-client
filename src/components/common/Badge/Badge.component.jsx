import React from 'react';
import './Badge.styles.scss';

const Badge = ({ children, size = 'medium', colored = false }) => {
  return (
    <span className={`badge ${size} ${colored ? 'colored' : ''}`}>
      {children}
    </span>
  );
};

export default Badge;
