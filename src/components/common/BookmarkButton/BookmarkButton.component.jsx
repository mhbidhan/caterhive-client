import React from 'react';
import { ReactComponent as HeartIcon } from './../../../assets/icons/heart-icon.svg';
import './BookmarkButton.styles.scss';

const BookmarkButton = ({ bookmarked = false, handleClick }) => {
  return (
    <button
      className={`btn-bookmark ${bookmarked ? 'bookmarked' : ''}`}
      onClick={handleClick}
    >
      <HeartIcon className="heart-icon" />
    </button>
  );
};

export default BookmarkButton;
