import React from 'react';
import './InputField.styles.scss';

const InputField = ({
  label,
  handleChange,
  element = 'text',
  error,
  ...otherProps
}) => {
  return (
    <div className="input-group">
      <div className="input-container">
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
      {error ? <div className="error-message">{error}</div> : null}
    </div>
  );
};

export default InputField;
