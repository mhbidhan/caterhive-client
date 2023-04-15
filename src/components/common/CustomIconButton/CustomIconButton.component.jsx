import React from 'react';
import './CustomIconButton.styles.scss';

const CustomIconButton = ({
  label,
  Icon,
  size = 'large',
  handleClick,
  ...otherProps
}) => {
  return (
    <button onClick={handleClick} className={`btn-icon ${size}`}>
      <Icon className="icon" />
      <span className="label">{label}</span>
    </button>
  );
};

export default CustomIconButton;
