import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import CartButton from '../../components/CartButton/CartButton.component';
import CartModal from '../../components/CartModal/CartModal.component';
import Bookmarks from '../../pages/Bookmarks/Bookmarks.component';
import CatererPreview from '../../pages/CatererPreview/CatererPreview.page';
import EventMenuPreview from '../../pages/EventMenuPreview/EventMenuPreview.component';
import EventOrderPreview from '../../pages/EventOrderPreview/EventOrderPreview.page';
import Home from '../../pages/Home/Home.page';
import MyOrders from '../../pages/MyOrders/MyOrders.page';
import NewOrder from '../../pages/NewOrder/NewOrder.page';
import OrderPreview from '../../pages/OrderPreview/OrderPreview.page';
import PaymentSuccessful from '../../pages/PaymentSuccessful/PaymentSuccessful.page';
import SplitScreen from './../../components/SplitScreen/SplitScreen.component';
import EventServiceOrder from './../../pages/EventServiceOrder/EventServiceOrder.page';
import MenuPreview from './../../pages/MenuPreview/MenuPreview.component';
import MyProfile from './../../pages/MyProfile/MyProfile.page';

const Authenticated = () => {
  const cart = useSelector((state) => state.cart);
  const routes = [
    {
      path: '/',
      label: 'home',
      element: <Home />,
      sidebar: true,
    },
    {
      path: '/profile',
      label: 'My Profile',
      element: <MyProfile />,
      sidebar: true,
    },
    {
      path: '/bookmarks',
      label: 'Bookmarks',
      element: <Bookmarks />,
      sidebar: true,
    },
    {
      path: '/myOrders',
      label: 'My Orders',
      element: <MyOrders />,
      sidebar: true,
    },
    {
      path: '/newOrder',
      element: <NewOrder />,
    },
    {
      path: '/myOrders/:orderId',
      element: <OrderPreview />,
    },
    {
      path: '/menus/:menuId',
      element: <MenuPreview />,
    },
    {
      path: '/caterers/:catererId',
      element: <CatererPreview />,
    },
    {
      path: '/eventMenu/:menuId',
      element: <EventMenuPreview />,
    },
    {
      path: '/eventService/order/:menuId',
      element: <EventServiceOrder />,
    },
    {
      path: '/eventOrder/:orderId',
      element: <EventOrderPreview />,
    },
    {
      path: '/orders/paymentSuccessful',
      element: <PaymentSuccessful />,
    },
  ];
  return (
    <div>
      <SplitScreen routes={routes}>
        {cart.cartHidden ? <CartButton /> : <CartModal />}

        <Routes>
          {routes.map((route) => {
            const { path, element } = route;
            return <Route key={path} path={path} element={element} />;
          })}{' '}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </SplitScreen>
    </div>
  );
};

export default Authenticated;
