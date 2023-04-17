import React from 'react';
import { useNavigate } from 'react-router-dom';
import CatererCard from './../CatererCard/CatererCard.component';

const CatererList = ({ caterers = [] }) => {
  const navigate = useNavigate();
  return (
    <div className="caterer-list">
      {caterers.map((caterer) => (
        <CatererCard
          key={caterer._id}
          caterer={caterer}
          handleClick={() => navigate(`/caterers/${caterer._id}`)}
        />
      ))}
    </div>
  );
};

export default CatererList;
