import React, { useCallback, useEffect, useState } from 'react';
import useLoading from '../../hooks/useLoading';
import { getOwnOrder } from '../../services/order';
import OrderItem from './../../components/OrderItem/OrderItem.component';
import SidebarButton from './../../components/SidebarButton/SidebarButton.component';
import './MyOrders.styles.scss';

const MyOrders = () => {
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
    <div className="container my-order-page">
      <SidebarButton />
      <h1 className="page-title">My Order</h1>
      {orders.length ? (
        orders.map((oo) => <OrderItem key={oo._id} order={oo} />)
      ) : (
        <div>No Orders Yet</div>
      )}
    </div>
  );
};

export default MyOrders;
