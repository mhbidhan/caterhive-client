import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ReactComponent as LogoutIcon } from '../../assets/icons/logout-icon.svg';
import CustomIconButton from '../common/CustomIconButton/CustomIconButton.component';
import './SplitScreen.styles.scss';

const SplitScreen = ({
  children,
  sidebarActive,
  setSidebarActive,
  routes = [],
}) => {
  const user = useSelector((state) => state.user);

  return (
    <div className="split-screen">
      {sidebarActive ? (
        <div className="side-bar">
          <div className="user-detail">
            <img src={user.profileImg} alt="" className="user-img" />
            <p className="user-name">{user.fullName}</p>
            <p className="user-email">{user.email}</p>
          </div>
          <ul className="nav-links">
            {routes.map((route) => (
              <NavLink
                onClick={() => setSidebarActive(false)}
                className="nav-link"
                key={route?.path}
                to={route?.path}
              >
                {route?.label}
              </NavLink>
            ))}
          </ul>
          <div className="logout-btn-container">
            <CustomIconButton
              Icon={LogoutIcon}
              size="small"
              label={'logout'}
              handleClick={() => {
                localStorage.removeItem('token');
                document.location = '/';
              }}
            />
          </div>
        </div>
      ) : null}
      <div onClick={() => setSidebarActive(false)} className="main-content">
        <div
          onClick={(e) => {
            if (!sidebarActive) e.stopPropagation();
            else return;
          }}
          className={sidebarActive ? 'content-half' : 'content-full'}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default SplitScreen;
