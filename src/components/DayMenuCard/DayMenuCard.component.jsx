import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuCard from '../MenuCard/MenuCard.component';
import Badge from '../common/Badge/Badge.component';
import CatererDetailCard from './../CatererDetailCard/CatererDetailCard.component';
import './DayMenuCard.styles.scss';

const DayMenuCard = ({ dayMenu, day, handleClick }) => {
  const navigate = useNavigate();
  const today = moment(new Date()).format('dddd');
  const menuDay =
    day?.toLocaleLowerCase() === today.toLocaleLowerCase()
      ? 'today'
      : day?.toLocaleLowerCase();

  if (!dayMenu) return;

  const { title, price, caterer, menus } = dayMenu;

  return (
    <div onClick={handleClick} className="day-menu-card">
      {day ? (
        <div className="badge-container">
          <Badge colored={true}>{menuDay}</Badge>
        </div>
      ) : null}
      <div className="day-menu-content">
        <p className="title">{title}</p>
        <p className="price">{price} BDT</p>
      </div>
      <div className="menu-card-container">
        {menus.map((menu) => (
          <div
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/menus/${menu._id}`);
            }}
            className="individual-card-container"
          >
            <MenuCard menu={menu} />
          </div>
        ))}
      </div>
      <CatererDetailCard caterer={caterer} />
    </div>
  );
};

export default DayMenuCard;
