import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FoodItemCard from '../../components/FoodItemCard/FoodItemCard.component';
import CustomButton from '../../components/common/CustomButton/CustomButton.component';
import useLoading from '../../hooks/useLoading';
import { getEventMenuById } from '../../services/eventMenu';
import BackButton from './../../components/BackButton/BackButton.component';
import './EventMenuPreview.styles.scss';

const EventMenuPreview = () => {
  const { menuId } = useParams();
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useLoading();

  const [eventMenu, setEventMenu] = useState(null);

  const getEventMenu = useCallback(async () => {
    startLoading();
    const eventMenu = await getEventMenuById(menuId);

    setEventMenu(eventMenu);
    console.log(eventMenu);
    stopLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setEventMenu, menuId]);

  useEffect(() => {
    getEventMenu();
  }, [getEventMenu]);

  const handleOrder = () => {
    navigate('/eventService/order/' + eventMenu._id);
  };

  if (!eventMenu) return null;

  const { title, appetizers, mainCourses, desserts, drinks, minEventOrder } =
    eventMenu;

  const menus = [appetizers, mainCourses, desserts, drinks];

  const price = menus.reduce((acc, curr) => {
    return acc + curr.reduce((a, b) => a + b.price, 0);
  }, 0);

  return (
    <div className="container event-preview-page">
      <h1 className="title">{title}</h1>
      <MenuSection name={'appetizers'} foodItems={appetizers} />
      <MenuSection name={'mainCourses'} foodItems={mainCourses} />
      <MenuSection name={'desserts'} foodItems={desserts} />
      <MenuSection name={'drinks'} foodItems={drinks} />

      <div className="content">
        <p className="title">{title}</p>
        <div className="grid grid-1x2 data">
          <span className="key">Unit Price</span>
          <span className="value">{price}</span>
          <span className="key">Minimum Order </span>
          <span className="value">{minEventOrder}</span>
        </div>
        <CustomButton
          label={'order now'}
          size="large"
          primary={true}
          handleClick={handleOrder}
        />
      </div>
    </div>
  );
};

export default EventMenuPreview;

const MenuSection = ({ name, foodItems }) => {
  return (
    <div className="menu-section">
      <div className="back-btn-container">
        <BackButton />
      </div>
      <h3 className="name">{name}</h3>
      <div className="menu-list">
        {foodItems.map((foodItem) => (
          <FoodItemCard key={foodItem._id} foodItem={foodItem} />
        ))}
      </div>
    </div>
  );
};
