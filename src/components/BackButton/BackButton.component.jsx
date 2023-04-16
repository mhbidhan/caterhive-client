import React from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingButton from '../common/FloatingButton/FloatingButton.component';
import './BackButton.styles.scss';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="back-btn">
      <FloatingButton handleClick={() => navigate(-1)}>&#10096;</FloatingButton>
    </div>
  );
};

export default BackButton;
