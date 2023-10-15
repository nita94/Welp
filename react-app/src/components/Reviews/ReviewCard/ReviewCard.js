import React from 'react';
import OpenModalButton from '../../Landing/OpenModalButton';
import UpdateReviewForm from '../UpdateReviewForm/UpdateReviewForm';
import DeleteReview from '../DeleteReview/DeleteReview';

const ReviewCard = ({ review, user }) => {
  const newDate = new Date(review?.created_at).toLocaleDateString();

  return (
    <div className="review-card">
      <div className="review-content">{review.content}</div>
      <div>
        {review.user_id} · <i className="fa fa-star"></i>
        {review.star_rating ? review.star_rating.toFixed(1) : 'N/A'} · {newDate}
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
            modalComponent={<DeleteReview review={review} />}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewCard;