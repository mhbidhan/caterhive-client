import React from 'react';
import './OrderMenuCard.styles.scss';

const OrderMenuCard = ({ orderMenu, quantity }) => {
  if (!orderMenu) return;

  const { thumbnail, title, price, masterPrice } = orderMenu;

  return (
    <div className="order-item">
      <img src={thumbnail} alt="" className="order-item-img" />
      <div className="content">
        <p className="title">{title}</p>
        <p className="price">
          {masterPrice || price} X {quantity}
        </p>
      </div>
    </div>
  );
};

export default OrderMenuCard;
