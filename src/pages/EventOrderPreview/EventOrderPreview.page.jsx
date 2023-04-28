import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as TickMark } from '../../assets/icons/tick-mark.svg';
import onTheWay from '../../assets/img/on-the-way.gif';
import processing from '../../assets/img/processing.gif';
import SidebarButton from '../../components/SidebarButton/SidebarButton.component';
import { setLoading } from '../../redux/redducers/loading';
import { getEventServiceOrderById } from '../../services/eventServiceOrder';
import CatererDetailCard from './../../components/CatererDetailCard/CatererDetailCard.component';
import EventOrderMenuCard from './../../components/EventOrderMenuCard/EventOrderMenuCard.component';
import './EventOrderPreview.styles.scss';

const EventOrderPreview = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getOrder = useCallback(async () => {
    dispatch(setLoading(true));
    const order = await getEventServiceOrderById(orderId);

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
    menu,
    orderValue,
    quantity,
    paymentDue,
    shippingAddress,
    orderedAt,
  } = order;

  const { appetizers, mainCourses, desserts, drinks } = menu;
  const menus = [appetizers, mainCourses, desserts, drinks];

  const price = menus.reduce((acc, curr) => {
    return acc + curr.reduce((a, b) => a + b.price, 0);
  }, 0);
  return (
    <div className="event-order-preview">
      <div className="back-btn-container">
        <SidebarButton />
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
        <CatererDetailCard
          handleClick={() => navigate(`/caterers/${caterer._id}`)}
          caterer={caterer}
        />
        <div className="order-menu-container">
          <EventOrderMenuCard eventMenu={menu} quantity={quantity} />
        </div>
        <div className="grid grid-1x2">
          <span className="key">Unit Price</span>
          <span className="value">{price}</span>
          <span className="key">Order Quantity </span>
          <span className="value">{quantity}</span>
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

export default EventOrderPreview;
