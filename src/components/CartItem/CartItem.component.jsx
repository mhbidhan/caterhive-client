import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  decreaseCartItem,
  increaseCartItem,
  removeItemFromCart,
  setCartHidden,
} from '../../redux/redducers/cart';
import './CartItem.styles.scss';

const CartItem = ({ cartItem }) => {
  const { _id, thumbnail, title, price, quantity } = cartItem;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(setCartHidden());
        navigate(`/menus/${_id}`);
      }}
      className="cart-item"
    >
      <img src={thumbnail} alt="" className="cart-item-img" />
      <div className="content">
        <p className="title">{title}</p>
        <div className="price-contianer">
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(decreaseCartItem(_id));
            }}
            className="action-btn"
          >
            -
          </button>
          <p className="price">
            {price} X {quantity}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(increaseCartItem(_id));
            }}
            className="action-btn"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(removeItemFromCart(_id));
        }}
        className="action-btn"
      >
        X
      </button>
    </div>
  );
};

export default CartItem;
