import React from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as ShopingBag } from '../../assets/icons/shoping-bag.svg';
import { toggleCart } from '../../redux/redducers/cart';
import './CartButton.styles.scss';

const CartButton = () => {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(toggleCart())} className="cart-button">
      <ShopingBag />
    </button>
  );
};

export default CartButton;
