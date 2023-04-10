import React from 'react';
import './Tag.styles.scss';

const Tag = ({ label }) => {
  return <div className="tag">{label}</div>;
};

export default Tag;
