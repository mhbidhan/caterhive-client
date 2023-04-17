import React from 'react';
import { ReactComponent as StarIcon } from '../../assets/icons/star-icon.svg';
import './CatererDetailCard.styles.scss';

const CatererDetailCard = ({ caterer, handleClick }) => {
  const { businessName, brandImg, reviews, rating } = caterer;
  return (
    <div onClick={handleClick} className="caterer-details">
      <img src={brandImg} className="caterer-logo" alt="" />
      <div>
        <p className="caterer-name">{businessName}</p>
        {reviews.length ? (
          <div className="rating-review">
            <span className="rating"> {rating}</span>
            <StarIcon className="star-icon" />
            <span className="review-container">
              (
              <span className="review-count">
                {reviews.length} {reviews.length > 1 ? 'Reviews' : 'Review'}
              </span>
              )
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CatererDetailCard;
