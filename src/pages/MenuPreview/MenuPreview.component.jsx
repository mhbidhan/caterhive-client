import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as StarIcon } from '../../assets/icons/star-icon.svg';
import FoodItemList from './../../components/FoodItemList/FoodItemList.component';
import ReviewModal from './../../components/ReviewModal/ReviewModal.component';
import BookmarkButton from './../../components/common/BookmarkButton/BookmarkButton.component';
import './MenuPreview.styles.scss';

const MenuPreview = ({ menu }) => {
  const user = useSelector((state) => state.user);
  const [reviewModal, setReviewModal] = useState(false);

  if (!menu) return;
  const {
    _id,
    title,
    description,
    thumbnail,
    rating,
    price,
    foodItems,
    reviews,
  } = menu;

  const bookmarked = user.bookmarks.menus.includes(_id);
  return (
    <>
      {reviewModal ? (
        <ReviewModal
          reviewFor={title}
          reviews={reviews}
          handleClose={() => setReviewModal(false)}
        />
      ) : null}
      <div
        className={`menu-preview ${reviewModal ? 'modal-active' : ''}`}
        scroll="no"
      >
        <div className="bookmark-container">
          <BookmarkButton bookmarked={bookmarked} />
        </div>

        <img src={thumbnail} alt="" className="thumbnail" />
        <div>
          <h2>{title}</h2>
          <div className="rating-review">
            <StarIcon className="star-icon" />
            <span className="rating"> {rating}</span>
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
          <p className="price">{price} bdt</p>
          <p>{description}</p>

          <FoodItemList foodItems={foodItems} menuName={title} />
        </div>
      </div>
    </>
  );
};

export default MenuPreview;
