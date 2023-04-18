import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as CartIcon } from '../../assets/icons/cart-icon.svg';
import { ReactComponent as StarIcon } from '../../assets/icons/star-icon.svg';
import CustomIconButton from '../../components/common/CustomIconButton/CustomIconButton.component';
import useBookmark from '../../hooks/useBookmark';
import { addItemToCart } from '../../redux/redducers/cart';
import { setLoading } from '../../redux/redducers/loading';
import { getMenuById, reviewMenuById } from '../../services/menu';
import BackButton from './../../components/BackButton/BackButton.component';
import CatererDetailCard from './../../components/CatererDetailCard/CatererDetailCard.component';
import FoodItemList from './../../components/FoodItemList/FoodItemList.component';
import ReviewModal from './../../components/ReviewModal/ReviewModal.component';
import BookmarkButton from './../../components/common/BookmarkButton/BookmarkButton.component';
import './MenuPreview.styles.scss';

export const MenuContext = createContext();

const MenuPreview = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);
  const [menu, setMenu] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const masterPrice = state?.masterPrice;
  const { bookmarkMenu } = useBookmark();

  let { menuId } = useParams();

  const getMenu = useCallback(async () => {
    dispatch(setLoading(true));
    const menu = await getMenuById(menuId);

    setMenu(menu);
    dispatch(setLoading(false));
  }, [setMenu, menuId, dispatch]);

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
    caterer,
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
      <div className="cart-btn-container">
        <CustomIconButton
          Icon={CartIcon}
          label={'Add to cart'}
          handleClick={(e) => {
            e.stopPropagation();
            dispatch(addItemToCart(menu));
          }}
        />
      </div>
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
            <BookmarkButton
              handleClick={() => bookmarkMenu(_id)}
              bookmarked={bookmarked}
            />
          </div>
          <img src={thumbnail} alt="" className="thumbnail" />
          <div>
            <div className="main">
              <h2>{title}</h2>
              <p className="price">
                {masterPrice ? (
                  <>
                    <span className="small-price">{price}</span>
                    {masterPrice}
                  </>
                ) : (
                  <span>{price}</span>
                )}{' '}
                bdt
              </p>
            </div>
            <CatererDetailCard
              caterer={caterer}
              handleClick={() => navigate(`/caterers/${caterer._id}`)}
            />

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
            <p>{description}</p>

            <FoodItemList foodItems={foodItems} menuName={title} />
          </div>
        </div>
      </div>
    </MenuContext.Provider>
  );
};

export default MenuPreview;
