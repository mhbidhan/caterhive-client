import React, { useCallback, useEffect, useState } from 'react';
import useLoading from '../../hooks/useLoading';
import { getOwnEventServiceOrders } from '../../services/eventServiceOrder';
import { getOwnOrder } from '../../services/order';
import OrderItem from './../../components/OrderItem/OrderItem.component';
import SidebarButton from './../../components/SidebarButton/SidebarButton.component';
import Tab from './../../components/common/Tab/Tab.component';
import './MyOrders.styles.scss';

const MyOrders = () => {
  const tabData = [
    { id: 'orrders', label: 'Regular Orders', content: <RegularOrderList /> },
    { id: 'eventOrders', label: 'Event Orders', content: <EventOrderList /> },
  ];
  return (
    <div className="container my-order-page">
      <SidebarButton />
      <h1 className="page-title">My Orders</h1>
      <Tab id={'orderList'} tabData={tabData} />
    </div>
  );
};

export default MyOrders;

const RegularOrderList = () => {
  const [orders, setOrders] = useState([]);
  const { startLoading, stopLoading } = useLoading();

  const getOrders = useCallback(async () => {
    try {
      startLoading();
      const orders = await getOwnOrder();

      setOrders(orders);
      stopLoading();
    } catch (error) {
      stopLoading();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div>
      {orders.length ? (
        orders.map((order) => <OrderItem key={order._id} order={order} />)
      ) : (
        <div>No Orders Yet</div>
      )}
    </div>
  );
};

const EventOrderList = () => {
  const [orders, setOrders] = useState([]);
  const { startLoading, stopLoading } = useLoading();

  const getOrders = useCallback(async () => {
    try {
      startLoading();
      const orders = await getOwnEventServiceOrders();

      setOrders(orders);
      stopLoading();
    } catch (error) {
      stopLoading();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div>
      {orders.length ? (
        orders.map((order) => (
          <OrderItem key={order._id} order={order} api="eventOrder" />
        ))
      ) : (
        <div>No Orders Yet</div>
      )}
    </div>
  );
};
