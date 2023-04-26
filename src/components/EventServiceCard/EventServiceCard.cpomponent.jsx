import React from 'react';
import CatererDetailCard from '../CatererDetailCard/CatererDetailCard.component';
import Badge from '../common/Badge/Badge.component';
import CustomButton from './../common/CustomButton/CustomButton.component';
import './EventServiceCard.styles.scss';

const EventServiceCard = ({ eventService, tier, handleClick, handleOrder }) => {
  const { caterer, title, appetizers, mainCourses, desserts, drinks } =
    eventService;

  const menus = [appetizers, mainCourses, desserts, drinks];

  const price = menus.reduce((acc, curr) => {
    return acc + curr.reduce((a, b) => a + b.price, 0);
  }, 0);

  return (
    <div onClick={handleClick} className="event-service-card">
      {tier ? (
        <div className="badge-container">
          <Badge colored={true}>{tier}</Badge>
        </div>
      ) : null}{' '}
      <div className="event-service-contnet">
        <p className="title">{title}</p>
        <p className="price">{price} BDT</p>
      </div>
      <div className="img-container">
        {menus.map((menu) => (
          <img src={menu[0].imgUrl} alt="" className="menu-img" />
        ))}
      </div>
      <CustomButton
        label={'order now'}
        size="large"
        primary={true}
        handleClick={handleOrder}
      />
      <CatererDetailCard caterer={caterer} />
    </div>
  );
};

export default EventServiceCard;
