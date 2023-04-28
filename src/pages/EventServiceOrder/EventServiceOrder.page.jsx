import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventMenuById } from '../../services/eventMenu';

import EventServiceCartItem from '../../components/EventServiceCart/EventServiceCart.component';
import SidebarButton from './../../components/SidebarButton/SidebarButton.component';
import './EventServiceOrder.styles.scss';

export const EventServiceOrderContext = createContext();

const EventServiceOrder = () => {
  const [formData, setFormData] = useState({
    caterer: '',
    menu: '',
    quantity: 0,
    orderValue: 0,
    discount: 0,
    shippingAddress: '',
    specialInstruction: '',
  });

  const [view, setView] = useState({});

  const updateForm = useCallback(
    (data) => {
      setFormData((formData) => ({
        ...formData,
        ...data,
      }));
    },
    [setFormData]
  );

  const [eventMenu, setEventMenu] = useState(null);

  const { menuId } = useParams();

  const getEventMenu = useCallback(async () => {
    const eventMenu = await getEventMenuById(menuId);
    setEventMenu(eventMenu);
  }, [menuId]);

  useEffect(() => {
    getEventMenu();
  }, [getEventMenu]);

  useEffect(() => {
    updateForm({
      caterer: eventMenu?.caterer._id,
      menu: menuId,
      quantity: eventMenu?.minEventOrder,
    });
  }, [eventMenu, updateForm, menuId]);

  useEffect(() => {
    setView(<EventServiceCartItem />);
  }, []);

  if (!eventMenu) return null;

  return (
    <div className="container event-service-order-page">
      <SidebarButton />

      <EventServiceOrderContext.Provider
        value={{ eventMenu, formData, updateForm, setView }}
      >
        {view}
      </EventServiceOrderContext.Provider>
    </div>
  );
};

export default EventServiceOrder;
