import React from 'react';
import OpenModalButton from '../../Landing/OpenModalButton';
import UpdateReviewForm from '../UpdateReviewForm/UpdateReviewForm';
import DeleteReview from '../DeleteReview/DeleteReview';

const ReviewCard = ({ review, user, onReviewDelete }) => {
  const newDate = new Date(review?.created_at).toLocaleDateString();

  return (
    <div className="review-card">
      <div className="reviewer-info">
        <strong>{review.username || 'N/A'}</strong>
      </div>
      <div className="rating-date-info">
        <span className="rating-info">
          <i className="fa fa-star"></i>{review.rating ? review.rating.toFixed(1) : 'N/A'}
        </span> · 
        <span className="date-info">
          {newDate}
        </span>
      </div>
      <div className="review-content">
        {review.content}
      </div>
      {user && user.id === review.user_id && (
        <div className="review-buttons">
          <OpenModalButton
            buttonText="Update"
            buttonStyling="update-restaurant-button"
            modalComponent={<UpdateReviewForm review={review} />}
          />
          <OpenModalButton
            buttonText="Delete"
            buttonStyling="delete-restaurant-button"
            modalComponent={<DeleteReview review={review} onReviewDelete={onReviewDelete} />} 
          />
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
