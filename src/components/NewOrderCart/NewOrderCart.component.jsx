import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewOrderForm from '../../components/NewOrderForm/NewOrderForm.component';
import { NewOrderContext } from '../../pages/NewOrder/NewOrder.page';
import { setCartData } from '../../redux/redducers/cart';
import CartItem from './../../components/CartItem/CartItem.component';
import CustomButton from './../../components/common/CustomButton/CustomButton.component';
import './NewOrderCart.styles.scss';

const OrderCart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { formData, setFormData, setView, setAmount } =
    useContext(NewOrderContext);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartData'));

    if (!cartItems) return;

    dispatch(setCartData(cartItems));
  }, [dispatch]);

  useEffect(() => {
    setFormData((formData) => ({
      ...formData,
      caterer: cart.caterer,
      orderedProducts: cart.cartItems.map((item) => ({
        menu: item._id,
        quantity: item.quantity,
      })),
    }));
  }, [cart, setFormData]);

  const subtotal = cart.cartItems.reduce(
    (acc, curr) =>
      acc + curr.masterPrice * curr.quantity || curr.price * curr.quantity,
    0
  );
  const deliveryCharge = 0;

  if (!cart.cartItems?.length) return <p>Cart is empty</p>;

  return (
    <>
      <h1>Make A Order</h1>
      <div className="order-items-container">
        {cart.cartItems.length &&
          cart.cartItems.map((item) => (
            <CartItem key={item._id} cartItem={item} />
          ))}
      </div>
      <div className="pricing">
        <p className="subtotal">Subtotal: {subtotal}</p>
        <p className="delivery">Delivry Chargre : {deliveryCharge}</p>
        <p className="total">Total : {subtotal + deliveryCharge}</p>
      </div>
      <CustomButton
        handleClick={() => {
          if (!formData.orderedProducts.length || !formData.caterer) return;

          setAmount(subtotal + deliveryCharge);
          setView(<NewOrderForm />);
        }}
        label={'Next'}
        primary={true}
        size="large"
      />
    </>
  );
};

export default OrderCart;
