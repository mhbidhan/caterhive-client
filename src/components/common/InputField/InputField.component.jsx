import React from 'react';
import './InputField.styles.scss';

const InputField = ({
  label,
  handleChange,
  element = 'text',
  ...otherProps
}) => {
  return (
    <div className="input-group">
      {element === 'textArea' ? (
        <textarea
          className="input-field"
          onChange={handleChange}
          rows={10}
          {...otherProps}
        />
      ) : (
        <input
          className="input-field"
          onChange={handleChange}
          {...otherProps}
        />
      )}
      <label className="input-label">{label}</label>
    </div>
  );
};

export default InputField;
