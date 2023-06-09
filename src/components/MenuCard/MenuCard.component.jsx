import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as CartIcon } from '../../assets/icons/cart-icon.svg';
import { ReactComponent as StarIcon } from '../../assets/icons/star-icon.svg';
import { addItemToCart } from '../../redux/redducers/cart';
import Badge from '../common/Badge/Badge.component';
import CustomIconButton from '../common/CustomIconButton/CustomIconButton.component';
import useBookmark from './../../hooks/useBookmark';
import BookmarkButton from './../common/BookmarkButton/BookmarkButton.component';
import Tag from './../common/Tag/Tag.component';
import './MenuCard.styles.scss';

const MenuCard = ({ menu, masterPrice, handleClick }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { bookmarkMenu } = useBookmark();

  const { _id, title, price, thumbnail, rating, reviews, tags } = menu;
  return (
    <div onClick={handleClick} className="menu-card">
      <div
        onClick={(e) => {
          e.stopPropagation();
          bookmarkMenu(_id);
        }}
        className="bookmark-container"
      >
        <BookmarkButton bookmarked={user.bookmarks.menus.includes(_id)} />
      </div>
      <div className="img-container">
        <div className="price-badge">
          <Badge size="large" colored={true}>
            <h4>
              <>
                <span className={masterPrice ? 'small-price' : 'price'}>
                  {price}
                </span>
                {masterPrice ? (
                  <span className="master-price">{masterPrice}</span>
                ) : null}
                BDT
              </>
            </h4>
          </Badge>
        </div>
        <img src={thumbnail} className="thumbnail" alt="" />
        <div className="rating-badge">
          <Badge size="large">
            <span className="rating">{rating}</span>{' '}
            <StarIcon className="icon" /> ( {reviews.length} )
          </Badge>
        </div>
      </div>

      <div className="content">
        <h4>{title}</h4>
        {tags.split(',').map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
      <CustomIconButton
        Icon={CartIcon}
        label={'Add to cart'}
        handleClick={(e) => {
          e.stopPropagation();
          dispatch(addItemToCart({ ...menu, masterPrice }));
        }}
      />
    </div>
  );
};

export default MenuCard;
