import React from 'react';
import './FoodItemPreview.styles.scss';

const FoodItemPreview = ({ foodItem, active, handleClick }) => {
  const { title, imgUrl, description } = foodItem;
  return (
    <div onClick={handleClick} className="food-item-preview">
      <div className="preview-toggle">
        <div className="content">
          <img src={imgUrl} alt="" className="img" />
          <p className="title">{title}</p>
        </div>
        <div className={`arrow ${active ? 'arrow-down' : ''}`}>&#10097;</div>
      </div>
      <div className={`preview-content ${active ? 'show' : ''}`}>
        <img src={imgUrl} alt="" className="img" />
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default FoodItemPreview;
