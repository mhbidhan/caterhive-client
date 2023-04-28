import React from 'react';
import './FoodItemCard.styles.scss';

const FoodItemCard = ({ foodItem }) => {
  const { title, imgUrl, price } = foodItem;
  return (
    <div className="food-item-card">
      <img src={imgUrl} alt="" className="card-img" />
      <p className="food-item-title">{title}</p>
      <p className="price">{price} BDT</p>
    </div>
  );
};

export default FoodItemCard;
