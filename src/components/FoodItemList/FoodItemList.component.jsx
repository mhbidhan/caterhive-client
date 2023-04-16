import React, { useState } from 'react';
import FoodItemPreview from '../FoodItemPreview/FoodItemPreview.component';
import './FoodItemList.styles.scss';

const FoodItemList = ({ foodItems = [], menuName = 'the' }) => {
  const [active, setActive] = useState(null);

  const handleActive = (foodItem) => {
    if (foodItem._id === active?._id) {
      setActive(null);
    } else {
      setActive(foodItem);
    }
  };

  if (!foodItems.length) return;

  return (
    <div className="food-item-list">
      <p className="list-heading">food items of {menuName} menu</p>
      {foodItems.map((foodItem) => (
        <FoodItemPreview
          key={foodItem._id}
          foodItem={foodItem}
          active={active?._id === foodItem._id}
          handleClick={() => handleActive(foodItem)}
        />
      ))}
    </div>
  );
};

export default FoodItemList;
