import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as StarIcon } from '../../assets/icons/star-icon.svg';
import Badge from '../common/Badge/Badge.component';
import BookmarkButton from './../common/BookmarkButton/BookmarkButton.component';
import Tag from './../common/Tag/Tag.component';
import './MenuCard.styles.scss';

const MenuCard = ({ menu }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { _id, title, price, thumbnail, rating, reviews, tags } = menu;
  return (
    <div onClick={() => navigate(`/menus/${_id}`)} className="menu-card">
      <div className="bookmark-container">
        <BookmarkButton bookmarked={user.bookmarks.menus.includes(_id)} />
      </div>
      <div className="img-container">
        <div className="price-badge">
          <Badge size="large">
            <h4>{price} BDT</h4>
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
          <Tag label={tag} />
        ))}
      </div>
    </div>
  );
};

export default MenuCard;
