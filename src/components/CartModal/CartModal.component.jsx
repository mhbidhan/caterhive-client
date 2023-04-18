import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCartHidden } from '../../redux/redducers/cart';
import { getCatererById } from '../../services/caterer';
import CartItem from '../CartItem/CartItem.component';
import FloatingButton from '../common/FloatingButton/FloatingButton.component';
import './CartModal.styles.scss';

const CartModal = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [currentCaterer, setCurrentCaterer] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCaterer = useCallback(
    async (id) => {
      const caterer = await getCatererById(id);

      setCurrentCaterer(caterer);
      setLoading(false);
    },
    [setCurrentCaterer]
  );

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
          {loading ? 'Loading...' : currentCaterer?.businessName}
        </h2>
        <div className="cart-item-container">
          {cart.cartItems.map((cartItem) => (
            <CartItem key={cartItem._id} cartItem={cartItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
