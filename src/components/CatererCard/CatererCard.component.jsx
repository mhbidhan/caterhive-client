import React from 'react';
import Tag from '../common/Tag/Tag.component';
import Badge from './../common/Badge/Badge.component';
import BookmarkButton from './../common/BookmarkButton/BookmarkButton.component';
import './CatererCard.styles.scss';

const CatererCard = ({ caterer, bookmarked = false, handleClick }) => {
  const handleBookmark = (e) => {
    e.stopPropagation();
    // TODO: Implement bookmark.
  };

  if (!caterer) return;

  const { businessName, brandImg, activeDays, operationalAreas, reviews } =
    caterer;
  const rating =
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

  return (
    <div className="caterer-card" onClick={handleClick}>
      <span className="bookmark">
        <BookmarkButton handleClick={handleBookmark} bookmarked={bookmarked} />
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
