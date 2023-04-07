import React from 'react';
import './CustomButton.styles.scss';

const CustomButton = ({
  label,
  size = 'medium',
  primary = false,
  handleClick,
  ...otherProps
}) => {
  return (
    <button
      className={`btn btn-${primary ? 'primary' : 'secondary'} ${size}`}
      onClick={handleClick}
      {...otherProps}
    >
      {label}
    </button>
  );
};

export default CustomButton;
