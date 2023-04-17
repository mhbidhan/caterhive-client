import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CatererList from '../../components/CatererList/CatererList.cpmponent';
import MenuList from '../../components/MenuList/MenuList.component';
import Tab from '../../components/common/Tab/Tab.component';
import { getOwnData } from '../../services/customer';
import SidebarButton from './../../components/SidebarButton/SidebarButton.component';
import './Bookmarks.styles.scss';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState(null);
  const user = useSelector((state) => state.user);

  const tabData = [
    {
      id: 'menus',
      label: 'Menus',
      content: <MenuList menus={bookmarks?.menus} />,
    },
    {
      id: 'caterers',
      label: 'Caterers',
      content: <CatererList caterers={bookmarks?.caterers} />,
    },
  ];

  const getBookmarks = useCallback(async () => {
    const user = await getOwnData(true);

    setBookmarks(user.bookmarks);
  }, []);

  useEffect(() => {
    getBookmarks();
  }, [getBookmarks, user]);

  return (
    <div className="bookmark container padding-top">
      <SidebarButton />
      <Tab tabData={tabData} />
    </div>
  );
};

export default Bookmarks;
