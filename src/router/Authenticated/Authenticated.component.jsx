import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Bookmarks from '../../pages/Bookmarks/Bookmarks.component';
import Home from '../../pages/Home/Home.page';
import SplitScreen from './../../components/SplitScreen/SplitScreen.component';
import MenuPreview from './../../pages/MenuPreview/MenuPreview.component';
import MyProfile from './../../pages/MyProfile/MyProfile.page';

const Authenticated = () => {
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
      path: '/menus/:menuId',
      label: 'Menu',
      element: <MenuPreview />,
    },
  ];
  return (
    <div>
      <SplitScreen routes={routes}>
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
