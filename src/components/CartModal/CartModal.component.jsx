import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCartData, setCartHidden } from '../../redux/redducers/cart';
import { getCatererById } from '../../services/caterer';
import CartItem from '../CartItem/CartItem.component';
import FloatingButton from '../common/FloatingButton/FloatingButton.component';
import CustomButton from './../common/CustomButton/CustomButton.component';
import './CartModal.styles.scss';

const CartModal = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentCaterer, setCurrentCaterer] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCaterer = useCallback(
    async (id) => {
      try {
        const caterer = await getCatererById(id);

        setCurrentCaterer(caterer);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [setCurrentCaterer]
  );

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cartData'));

    if (cartData) {
      dispatch(setCartData(cartData));
    }
  }, [dispatch]);

  useEffect(() => {
    getCaterer(cart.caterer);
  }, [getCaterer, cart]);

  const handleModalClose = () => {
    dispatch(setCartHidden());
  };
  return (
    <div onClick={handleModalClose} className="backdrop">
      <div onClick={(e) => e.stopPropagation()} className="cart-modal">
        <div className="floating-btn-container">
          <FloatingButton handleClick={handleModalClose}>
            &#10006;
          </FloatingButton>
        </div>
        <h2 className="caterer-name">
          {loading
            ? 'Loading...'
            : currentCaterer?.businessName || 'Cart is empty'}
        </h2>
        <div className="cart-item-container">
          {cart.cartItems.map((cartItem) => (
            <CartItem key={cartItem._id} cartItem={cartItem} />
          ))}
        </div>

        <div className="pricing">
          Total :{' '}
          {cart.cartItems.reduce(
            (acc, curr) =>
              acc + curr.masterPrice * curr.quantity ||
              curr.price * curr.quantity,
            0
          )}
        </div>
        <div className="btn-container">
          <CustomButton
            label={'Order Now'}
            primary={true}
            size="large"
            handleClick={() => {
              handleModalClose();
              navigate('/newOrder');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CartModal;
