import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CatererList from '../../components/CatererList/CatererList.cpmponent';
import DayMenuCard from '../../components/DayMenuCard/DayMenuCard.component';
import useLoading from '../../hooks/useLoading';
import { getAllCaterersByArea } from '../../services/caterer';
import SidebarButton from './../../components/SidebarButton/SidebarButton.component';
import Tab from './../../components/common/Tab/Tab.component';
import './Home.styles.scss';

const Home = () => {
  const [caterers, setCaterers] = useState([]);
  const [menus, setMenus] = useState([]);
  const { startLoading, stopLoading } = useLoading();
  const user = useSelector((state) => state.user);

  const tabData = [
    {
      id: 'caterers',
      label: 'Caterers',
      content: <CatererList caterers={caterers} />,
    },
    {
      id: 'menus',
      label: 'menus',
      content: <DayMenuList dayMenus={menus} />,
    },
  ];

  const getData = useCallback(async () => {
    startLoading();
    const caterers = await getAllCaterersByArea(user.area._id);

    const menus = [];

    for (let caterer of caterers) {
      if (caterer.weekMenu) {
        const keys = Object.keys(caterer.weekMenu);

        if (keys.length) {
          for (let key of keys) {
            const today = moment(new Date()).format('dddd').toLocaleLowerCase();

            if (key === today)
              menus.push({ ...caterer.weekMenu[key], day: key });
          }
        }
      }
    }

    setMenus(menus);

    setCaterers(caterers);
    stopLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="home container">
      <SidebarButton />
      <div className="main padding-top">
        <h1 className="heading">What would you like to order</h1>
        <Tab id={'home'} tabData={tabData} />
      </div>
    </div>
  );
};

export default Home;

const DayMenuList = ({ dayMenus = [] }) => {
  if (!dayMenus.length) return;

  return (
    <div>
      {dayMenus.map((dayMenu) => (
        <DayMenuCard day={dayMenu.day} dayMenu={dayMenu} />
      ))}
    </div>
  );
};
