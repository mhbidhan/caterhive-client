import React from 'react';
import Tag from '../common/Tag/Tag.component';
import Badge from './../common/Badge/Badge.component';
import BookmarkButton from './../common/BookmarkButton/BookmarkButton.component';
import './CatererCard.styles.scss';

const CatererCard = ({ caterer, bookmarked = false, handleClick }) => {
  const handleBookmark = () => {
    // TODO: Implement bookmark.
  };

  if (!caterer) return;

  const { bussinesName, brandImg, activeDays, providedServices, reviews } =
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
            {rating}
          </Badge>
        </span>
      </div>
      <div>
        <h2 className="title">{bussinesName}</h2>
        <div className="service-days">{activeDays}</div>
        <div className="services">
          {providedServices.map((service) => (
            <Tag key={service} label={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatererCard;
