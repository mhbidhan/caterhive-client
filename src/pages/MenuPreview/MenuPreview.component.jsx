import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ReactComponent as StarIcon } from '../../assets/icons/star-icon.svg';
import { getMenuById, reviewMenuById } from '../../services/menu';
import BackButton from './../../components/BackButton/BackButton.component';
import FoodItemList from './../../components/FoodItemList/FoodItemList.component';
import ReviewModal from './../../components/ReviewModal/ReviewModal.component';
import BookmarkButton from './../../components/common/BookmarkButton/BookmarkButton.component';
import './MenuPreview.styles.scss';

export const MenuContext = createContext();

const MenuPreview = () => {
  const user = useSelector((state) => state.user);
  const [reviewModal, setReviewModal] = useState(false);
  const [menu, setMenu] = useState(null);

  let { menuId } = useParams();

  const getMenu = useCallback(async () => {
    const menu = await getMenuById(menuId);

    setMenu(menu);
  }, [setMenu, menuId]);

  useEffect(() => {
    getMenu();
  }, [getMenu]);

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

  const handleReview = async (
    e,
    { rating, reviewContent, setShowReviewForm }
  ) => {
    e.preventDefault();

    const newMenu = await reviewMenuById(menu._id, {
      rating,
      content: reviewContent,
    });

    setMenu(newMenu);
    setShowReviewForm(false);
  };

  const bookmarked = user.bookmarks.menus.includes(_id);
  return (
    <MenuContext.Provider value={{ handleReview }}>
      <div className="container">
        {reviewModal ? (
          <ReviewModal
            reviewFor={title}
            reviews={reviews}
            handleClose={() => setReviewModal(false)}
          />
        ) : null}
        <div className={`menu-preview ${reviewModal ? 'modal-active' : ''}`}>
          <div className="back-btn-container">
            <BackButton />
          </div>
          <div className="bookmark-container">
            <BookmarkButton bookmarked={bookmarked} />
          </div>

          <img src={thumbnail} alt="" className="thumbnail" />
          <div>
            <h2>{title}</h2>
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
            )}
            <p className="price">{price} bdt</p>
            <p>{description}</p>

            <FoodItemList foodItems={foodItems} menuName={title} />
          </div>
        </div>
      </div>
    </MenuContext.Provider>
  );
};

export default MenuPreview;
