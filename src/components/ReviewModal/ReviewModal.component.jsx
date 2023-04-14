import React, { useState } from 'react';
import Review from './../Review/Review.component';
import ReviewForm from './../ReviewForm/ReviewForm.component';
import CustomButton from './../common/CustomButton/CustomButton.component';
import FloatingButton from './../common/FloatingButton/FloatingButton.component';
import './ReviewModal.styles.scss';

const ReviewModal = ({ reviewFor = 'Product', reviews = [], handleClose }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  return (
    <div className="review-modal">
      <div onClick={handleClose} className="backdrop">
        <div className="float-container">
          <FloatingButton
            onClick={() => {
              console.log('sfa');
              handleClose();
            }}
          >
            &#10006;
          </FloatingButton>
        </div>
        <div onClick={(e) => e.stopPropagation()} className="modal">
          {showReviewForm ? (
            <ReviewForm
              menuName={reviewFor}
              setShowReviewForm={setShowReviewForm}
            />
          ) : (
            <>
              <h2 className="review-heading">{reviewFor} Reviews</h2>
              {reviews
                .sort((a, b) => {
                  return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                  );
                })
                .map((review) => (
                  <Review review={review} />
                ))}
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
