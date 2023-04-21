import React, { useState } from 'react';
import { ReactComponent as StarIcon } from '../../assets/icons/star-icon.svg';
import CustomButton from './../common/CustomButton/CustomButton.component';
import FloatingButton from './../common/FloatingButton/FloatingButton.component';
import InputField from './../common/InputField/InputField.component';
import './ReviewForm.styles.scss';

const ReviewForm = ({ reviewFor = '', setShowReviewForm, handleReview }) => {
  const [stars, setStars] = useState([
    { rating: 1, active: true },
    { rating: 2, active: false },
    { rating: 3, active: false },
    { rating: 4, active: false },
    { rating: 5, active: false },
  ]);
  const [rating, setRating] = useState(1);
  const [reviewContent, setReviewContent] = useState('');

  return (
    <>
      <FloatingButton handleClick={() => setShowReviewForm(false)}>
        &#10096;
      </FloatingButton>
      <div className="review-form-container">
        <form
          className="review-form"
          onSubmit={(e) =>
            handleReview(e, { rating, reviewContent, setShowReviewForm })
          }
        >
          <h2>Review {reviewFor}</h2>
          <div className="star-container">
            {stars.map((star) => (
              <StarIcon
                key={star.rating}
                onClick={() => {
                  const newStars = stars.map((s) =>
                    s.rating <= star.rating ? { ...s, active: true } : s
                  );

                  setStars(newStars);
                  setRating(star.rating);
                }}
                className={`star ${star.active ? 'filled' : ''}`}
              />
            ))}
          </div>
          <InputField
            element="textArea"
            placeholder={'share your thoughts'}
            handleChange={(e) => {
              setReviewContent(e.target.value);
            }}
          />

          <CustomButton
            label={`post your review`}
            size="large"
            primary={true}
            type="submit"
          />
        </form>
      </div>
    </>
  );
};

export default ReviewForm;
