import React from 'react';
import { useSelector } from 'react-redux';
import Tag from '../common/Tag/Tag.component';
import useBookmark from './../../hooks/useBookmark';
import Badge from './../common/Badge/Badge.component';
import BookmarkButton from './../common/BookmarkButton/BookmarkButton.component';
import './CatererCard.styles.scss';

const CatererCard = ({ caterer, handleClick }) => {
  const { bookmarkCaterer } = useBookmark();
  const user = useSelector((state) => state.user);

  if (!caterer) return;

  const { _id, businessName, brandImg, activeDays, operationalAreas, reviews } =
    caterer;
  const rating =
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

  const handleBookmark = (e) => {
    e.stopPropagation();
    bookmarkCaterer(_id);
  };

  return (
    <div className="caterer-card" onClick={handleClick}>
      <span className="bookmark">
        <BookmarkButton
          handleClick={handleBookmark}
          bookmarked={user.bookmarks.caterers.includes(_id)}
        />
      </span>
      <div className="brand-img-container">
        <img src={brandImg} alt="" className="brand-img" />
        <span className="rating-badge">
          <Badge size="small" colored={true}>
            {isNaN(rating) || !rating ? 0 : rating}
          </Badge>
        </span>
      </div>
      <div>
        <h2 className="title">{businessName}</h2>
        <div className="service-days">{activeDays}</div>
        <div className="services">
          {operationalAreas.map((area) => (
            <Tag key={area._id} label={area.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatererCard;
