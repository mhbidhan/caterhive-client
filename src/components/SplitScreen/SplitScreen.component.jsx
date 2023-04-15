import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ReactComponent as LogoutIcon } from '../../assets/icons/logout-icon.svg';
import { setSidebar } from '../../redux/redducers/sidebar';
import CustomIconButton from '../common/CustomIconButton/CustomIconButton.component';
import './SplitScreen.styles.scss';

const SplitScreen = ({ children, routes = [] }) => {
  const user = useSelector((state) => state.user);
  const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  return (
    <div className="split-screen">
      {sidebar ? (
        <div className="side-bar">
          <div>
            <div className="user-detail">
              <img src={user.profileImg} alt="" className="user-img" />
              <p className="user-name">{user.fullName}</p>
              <p className="user-email">{user.email}</p>
            </div>
            <ul className="nav-links">
              {routes.map((route) => (
                <NavLink
                  onClick={() => dispatch(setSidebar(false))}
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
        </div>
      ) : null}
      <div className="main-content">
        <div
          onClick={(e) => {
            if (sidebar) dispatch(setSidebar(false));
          }}
          className={sidebar ? 'content-half' : 'content-full'}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default SplitScreen;
