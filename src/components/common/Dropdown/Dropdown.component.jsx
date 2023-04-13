import React, { useState } from 'react';
import './Dropdown.styles.scss';

const Dropdown = ({
  options = [],
  label = 'Label',
  defaultPlaceholder = 'Select an option',
  placeholderProp,
  handleChange,
}) => {
  const [placeholder, setPlaceholder] = useState('');
  const [menuHidden, setMenuHidden] = useState(true);

  const getOptionLabel = (option) => option[placeholderProp] || option;
  return (
    <div className="dropdown-container">
      <label className={`label ${menuHidden ? '' : 'active'}`}>{label}</label>
      <div onClick={() => setMenuHidden(!menuHidden)} className="dropdown">
        {placeholder || defaultPlaceholder}
      </div>
      <div className={`options ${menuHidden ? '' : 'show'}`}>
        {options.map((option) => (
          <div
            key={option._id || option}
            onClick={() => {
              setPlaceholder(getOptionLabel(option));
              setMenuHidden(!menuHidden);
              handleChange(option);
            }}
            className="option"
          >
            {getOptionLabel(option)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
