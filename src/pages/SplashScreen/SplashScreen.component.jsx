import React from 'react';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import './SplashScreen.styles.scss';

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <div className="content">
        <div className="logo-container">
          <Logo />
        </div>
        <h1 className="name">
          <span className="head">Cater </span>
          <span className="tail">Hive</span>
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;
