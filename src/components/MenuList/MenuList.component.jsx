import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuCard from './../MenuCard/MenuCard.component';
import './MenuList.styles.scss';

const MenuList = ({ menus = [] }) => {
  const navigate = useNavigate();

  if (!menus || !menus.length) return;

  return (
    <div className="menu-list container">
      {menus.map((menu) => (
        <MenuCard
          handleClick={() => navigate(`/menus/${menu._id}`)}
          key={menu._id}
          menu={menu}
        />
      ))}
    </div>
  );
};

export default MenuList;
