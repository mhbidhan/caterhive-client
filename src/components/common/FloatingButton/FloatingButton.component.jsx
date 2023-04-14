import React from 'react';
import './FloatingButton.styles.scss';

const FloatingButton = ({ children, handleClick }) => {
  return (
    <button className="floating-button" onClick={handleClick}>
      {children}
    </button>
  );
};

export default FloatingButton;
