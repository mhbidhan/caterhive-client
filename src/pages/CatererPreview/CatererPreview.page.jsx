import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DayMenuCard from '../../components/DayMenuCard/DayMenuCard.component';
import PageDecorator from '../../components/PageDecorator/PageDecorator.component';
import SidebarButton from '../../components/SidebarButton/SidebarButton.component';
import { setLoading } from '../../redux/redducers/loading';
import { getCatererById } from '../../services/caterer';
import './CatererPreview.styles.scss';

const CatererPreview = () => {
  const [caterer, setCaterer] = useState(null);
  const navigate = useNavigate();
  const { catererId } = useParams();
  const dispatch = useDispatch();

  const getCaterer = useCallback(async () => {
    dispatch(setLoading(true));
    const caterer = await getCatererById(catererId);

    setCaterer(caterer);
    dispatch(setLoading(false));
  }, [setCaterer, catererId, dispatch]);

  useEffect(() => {
    getCaterer();
  }, [getCaterer]);

  if (!caterer) return null;

  const { businessName, email, brandImg, weekMenu } = caterer;

  return (
    <PageDecorator circle={false}>
      <div className="container caterer-preview">
        <SidebarButton />
        <div className="caterer-intro">
          <img src={brandImg} alt="" className="caterer-brand-logo avatar" />
          <h3>{businessName}</h3>
          <p>{email}</p>
        </div>
        <div className="day-menu-container">
          {weekMenu
            ? Object.keys(weekMenu).map((day) => (
                <DayMenuCard
                  dayMenu={weekMenu[day]}
                  day={day}
                  handleClick={() => navigate(`dayMenu/${weekMenu[day]._id}`)}
                />
              ))
            : null}
        </div>
      </div>
    </PageDecorator>
  );
};

export default CatererPreview;
