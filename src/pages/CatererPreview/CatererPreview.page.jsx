import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as StarIcon } from '../../assets/icons/star-icon.svg';
import DayMenuCard from '../../components/DayMenuCard/DayMenuCard.component';
import PageDecorator from '../../components/PageDecorator/PageDecorator.component';
import ReviewModal from '../../components/ReviewModal/ReviewModal.component';
import SidebarButton from '../../components/SidebarButton/SidebarButton.component';
import { setLoading } from '../../redux/redducers/loading';
import { getCatererById, reviewCatererById } from '../../services/caterer';
import './CatererPreview.styles.scss';

export const CatererContext = createContext();

const CatererPreview = () => {
  const [caterer, setCaterer] = useState(null);
  const [reviewModal, setReviewModal] = useState(false);

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

  const { businessName, email, brandImg, reviews, rating, weekMenu } = caterer;

  const handleReview = async (
    e,
    { rating, reviewContent, setShowReviewForm }
  ) => {
    e.preventDefault();

    const newCaterer = await reviewCatererById(caterer._id, {
      rating,
      content: reviewContent,
    });

    setCaterer(newCaterer);
    setShowReviewForm(false);
  };

  return (
    <PageDecorator circle={false}>
      {reviewModal ? (
        <ReviewModal
          reviewFor={caterer.businessName}
          reviews={caterer.reviews}
          handleClose={() => setReviewModal(false)}
          handleReview={handleReview}
        />
      ) : null}
      <div className="container caterer-preview">
        <SidebarButton />
        <div className="caterer-intro">
          <img src={brandImg} alt="" className="caterer-brand-logo avatar" />
          <h3>{businessName}</h3>
          <p>{email}</p>
          {!reviews.length ? (
            <div className="no-review">
              <StarIcon className="star-icon" /> No reviews yet
              <span
                onClick={() => setReviewModal(true)}
                className="post-review"
              >
                Post a review
              </span>
            </div>
          ) : (
            <div className="rating-review">
              <span className="rating"> {rating}</span>
              <StarIcon className="star-icon" />
              <span className="review-container">
                (
                <span
                  onClick={() => setReviewModal(true)}
                  className="review-count"
                >
                  {reviews.length} {reviews.length > 1 ? 'Reviews' : 'Review'}
                </span>
                )
              </span>
            </div>
          )}
        </div>

        <div className="day-menu-container">
          {weekMenu
            ? Object.keys(weekMenu).map((day) => (
                <DayMenuCard
                  key={day}
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
