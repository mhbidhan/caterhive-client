import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderItem.styles.scss';

const OrderItem = ({ order, api = 'myOrders' }) => {
  const navigate = useNavigate();
  if (!order) return;
  const { _id, caterer, orderStatus, orderValue } = order;
  return (
    <div onClick={() => navigate(`/${api}/${_id}`)} className="order-item">
      <div className="content">
        <div className="caterer-details">
          <img src={caterer.brandImg} className="caterer-logo" alt="" />
          <div>
            <p className="caterer-name">{caterer.businessName}</p>
          </div>
        </div>
        <div
          className={`status ${orderStatus === 'delivered' ? 'delivered' : ''}`}
        >
          {orderStatus}
        </div>
      </div>
      <p className="value">order value: {orderValue}</p>
    </div>
  );
};

export default OrderItem;
