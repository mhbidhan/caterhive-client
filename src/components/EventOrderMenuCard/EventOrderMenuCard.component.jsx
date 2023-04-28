import React from 'react';
import './EventOrderMenuCard.styles.scss';

const EventOrderMenuCard = ({ eventMenu, quantity, handleClick }) => {
  const { title, appetizers, mainCourses, desserts, drinks } = eventMenu;
  const menus = [appetizers, mainCourses, desserts, drinks];

  const price = menus.reduce((acc, curr) => {
    return acc + curr.reduce((a, b) => a + b.price, 0);
  }, 0);
  return (
    <div onClick={handleClick} className="event-order-menu-card">
      <div className="img-container">
        {menus.map((menu) => (
          <img
            key={menu[0]._id}
            src={menu[0].imgUrl}
            alt=""
            className="menu-img"
          />
        ))}
      </div>
      <div className="content">
        <p className="title">{title}</p>
        <p className="price ">
          {price} X {quantity}
        </p>
      </div>
    </div>
  );
};

export default EventOrderMenuCard;
