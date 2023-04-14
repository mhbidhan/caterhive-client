import moment from 'moment/moment';
import React from 'react';
import Badge from './../common/Badge/Badge.component';
import './Review.styles.scss';

const Review = ({ review }) => {
  const { user, content, createdAt, rating } = review;
  const { fullName, profileImg } = user;

  return (
    <div className="review">
      <div className="review-user">
        <div className="img-container">
          <img src={profileImg} alt="" className="review-user-img" />
          <div className="badge-container">
            <Badge colored={true} size="small">
              {rating}
            </Badge>
          </div>
        </div>
        <div>
          <p className="user-name">{fullName}</p>
          <p className="review-date">{moment(createdAt).format('D/MM/YYYY')}</p>
        </div>
      </div>
      <div className="review-content">{content}</div>
    </div>
  );
};

export default Review;
