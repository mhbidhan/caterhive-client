import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventServiceOrderContext } from '../../pages/EventServiceOrder/EventServiceOrder.page';
import CatererDetailCard from '../CatererDetailCard/CatererDetailCard.component';
import EventServiceForm from '../EventServiceForm/EventServiceForm.component';
import CustomButton from '../common/CustomButton/CustomButton.component';
import InputField from '../common/InputField/InputField.component';
import './EventServiceCart.styles.scss';

const EventServiceCart = () => {
  const { eventMenu, formData, updateForm, setView } = useContext(
    EventServiceOrderContext
  );
  const [quantityInput, setQuantityInput] = useState(10);
  const [discountPerPiece, setDiscountPerPiece] = useState(0);
  const [menus, setMenus] = useState([]);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const { quantity } = formData;

  useEffect(() => {
    const { discountOnEachHundred, maxDiscount } = eventMenu;

    const estimatedDiscount =
      Math.floor(+quantity / 100) * +discountOnEachHundred;

    const discount =
      estimatedDiscount <= maxDiscount ? estimatedDiscount : maxDiscount;

    setDiscountPerPiece(discount);
  }, [eventMenu, quantity]);

  useEffect(() => {
    const { appetizers, mainCourses, desserts, drinks } = eventMenu;
    const menus = [appetizers, mainCourses, desserts, drinks];

    const price = menus.reduce((acc, curr) => {
      return acc + curr.reduce((a, b) => a + b.price, 0);
    }, 0);

    setMenus(menus);
    setPrice(price);
  }, [eventMenu]);

  useEffect(() => {
    updateForm({
      orderValue: price * quantity,
      discount: discountPerPiece * quantity,
    });
  }, [quantity, discountPerPiece, price, updateForm]);

  if (!eventMenu) return null;

  const { caterer, title, minEventOrder } = eventMenu;
  const { orderValue, discount } = formData;
  return (
    <div className="event-service-cart-item">
      <CatererDetailCard caterer={caterer} />
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
      <div className="event-service-contnet">
        <p className="title">{title}</p>
        <p className="price">
          {price - discountPerPiece} X {quantity} BDT
        </p>
      </div>
      <div className="counter-container">
        <button
          className="btn btn-cart"
          onClick={() => {
            if (quantity <= 0) return;
            const newQuantity = +quantity - +quantityInput;

            if (newQuantity < minEventOrder)
              return alert(
                `Order under ${minEventOrder} unit can not be made for ${title} `
              );
            updateForm({
              quantity: +quantity - +quantityInput,
            });
          }}
        >
          -
        </button>
        <div className="quantity-input-container">
          <InputField
            label={''}
            value={quantityInput}
            handleChange={(e) => setQuantityInput(e.target.value)}
          />
        </div>
        <button
          className="btn btn-cart"
          onClick={() =>
            updateForm({
              quantity: +quantity + +quantityInput,
            })
          }
        >
          +
        </button>
      </div>
      <div>
        <div className="calc">
          <div className="grid grid-1x2 ">
            <span className="key">subtotal </span>
            <span className="value">{orderValue}</span>
            <span className="key">discount </span>
            <span className="value">{discount} </span>
            <span className="key">total </span>
            <span className="value">{orderValue - discount} </span>
          </div>
        </div>
      </div>
      <div className="btn-container">
        <CustomButton label={'Back'} handleClick={() => navigate(-1)} />
        <CustomButton
          handleClick={() => setView(<EventServiceForm />)}
          label={'Next'}
          primary={true}
        />
      </div>
    </div>
  );
};

export default EventServiceCart;
