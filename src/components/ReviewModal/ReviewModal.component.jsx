import React, { useState } from 'react';
import Review from './../Review/Review.component';
import ReviewForm from './../ReviewForm/ReviewForm.component';
import CustomButton from './../common/CustomButton/CustomButton.component';
import FloatingButton from './../common/FloatingButton/FloatingButton.component';
import './ReviewModal.styles.scss';

const ReviewModal = ({
  reviewFor = 'Product',
  reviews = [],
  handleClose,
  handleReview,
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  return (
    <div className="review-modal">
      <div
        onClick={() => {
          document.body.classList.remove('scroll-lock');
          handleClose();
        }}
        className="backdrop"
      >
        <div className="float-container">
          <FloatingButton
            onClick={() => {
              document.body.classList.remove('scroll-lock');
              handleClose();
            }}
          >
            &#10006;
          </FloatingButton>
        </div>
        <div onClick={(e) => e.stopPropagation()} className="modal">
          {showReviewForm ? (
            <ReviewForm
              reviewFor={reviewFor}
              setShowReviewForm={setShowReviewForm}
              handleReview={handleReview}
            />
          ) : (
            <>
              <h2 className="review-heading">{reviewFor} Reviews</h2>
              <div className="review-list">
                {reviews
                  .sort((a, b) => {
                    return (
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                    );
                  })
                  .map((review) => (
                    <Review key={review._id} review={review} />
                  ))}
              </div>
              <div className="btn-container">
                <CustomButton
                  label={`Review ${reviewFor}`}
                  size="large"
                  primary={true}
                  handleClick={() => setShowReviewForm(true)}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
