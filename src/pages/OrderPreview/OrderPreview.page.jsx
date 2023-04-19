import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ReactComponent as TickMark } from '../../assets/icons/tick-mark.svg';
import onTheWay from '../../assets/img/on-the-way.gif';
import processing from '../../assets/img/processing.gif';
import OrderMenuCard from '../../components/OrderMenuCard/OrderMenuCard.component';
import { setLoading } from '../../redux/redducers/loading';
import { getOrderById } from '../../services/order';
import BackButton from './../../components/BackButton/BackButton.component';
import CatererDetailCard from './../../components/CatererDetailCard/CatererDetailCard.component';
import './OrderPreview.styles.scss';

const OrderPreview = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();

  const getOrder = useCallback(async () => {
    dispatch(setLoading(true));
    const order = await getOrderById(orderId);

    setOrder(order);
    dispatch(setLoading(false));
  }, [dispatch, setOrder, orderId]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  if (!order) return;

  const {
    orderStatus,
    caterer,
    orderedProducts,
    orderValue,
    paymentDue,
    shippingAddress,
    orderedAt,
  } = order;

  return (
    <div className="order-preview">
      <div className="back-btn-container">
        <BackButton />
      </div>
      {orderStatus === 'processing' ? (
        <img className="status-img" src={processing} alt="" />
      ) : null}

      {orderStatus === 'on the way' ? (
        <img className="status-img" src={onTheWay} alt="" />
      ) : null}

      <div className="container">
        {orderStatus === 'delivered' ? (
          <div className="tick-mark-container">
            <TickMark className="tick-mark" />
            <h2>Delivered</h2>
          </div>
        ) : null}
        <CatererDetailCard caterer={caterer} />
        <div className="order-menu-container">
          {orderedProducts.map(({ menu, quantity }) => (
            <OrderMenuCard orderMenu={menu} quantity={quantity} />
          ))}
        </div>
        <div className="grid grid-1x2">
          <span className="key">Order Value </span>
          <span className="value">{orderValue}</span>
          <span className="key">Payment Status </span>
          <span className="value">{paymentDue ? 'Due' : 'Paid'}</span>
          <span className="key">Ordered At </span>
          <span className="value">{moment(orderedAt).format('lll')}</span>
          <span className="key">Shipping Adress </span>
          <span className="value">{shippingAddress}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderPreview;
