import React from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as MenuIcon } from '../../assets/icons/menu-icon.svg';
import { setSidebar } from '../../redux/redducers/sidebar';
import FloatingButton from '../common/FloatingButton/FloatingButton.component';
import './SidebarButton.styles.scss';

const SidebarButton = () => {
  const dispatch = useDispatch();

  return (
    <div className="menu-btn-container">
      <FloatingButton handleClick={() => dispatch(setSidebar(true))}>
        <MenuIcon />
      </FloatingButton>
    </div>
  );
};

export default SidebarButton;
