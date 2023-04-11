import React, { useState } from 'react';
import './FileInput.styles.scss';

const FileInput = ({ label, handleChange, error, ...otherProps }) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFileName(file.name);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => handleChange(fileReader.result);
  };
  return (
    <div className="file-input-group">
      <label className="input-label">{label}</label>
      <div>
        <div className="input-container">
          <div className="indicator">
            {fileName ? 'change file' : 'Select a file'}
          </div>
          <span className="file-name">{fileName}</span>
          <input
            type="file"
            className="file-input-field"
            onChange={handleFileChange}
            {...otherProps}
          />
        </div>
        {error ? <div className="error-message">{error}</div> : null}
      </div>
    </div>
  );
};

export default FileInput;
