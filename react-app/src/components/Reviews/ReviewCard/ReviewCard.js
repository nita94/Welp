import React, { useState } from 'react';
import OpenModalButton from '../../Landing/OpenModalButton';
import UpdateReviewForm from '../UpdateReviewForm/UpdateReviewForm';
import DeleteReview from '../DeleteReview/DeleteReview';
import './ReviewCard.css';

const ReviewCard = ({ review, user, onReviewDelete, singleBusinessPage, businessId }) => {  // Added businessId to props
    const [isTextTruncated, setIsTextTruncated] = useState(true);
    const newDate = new Date(review?.created_at).toLocaleDateString();

    const toggleTextTruncation = () => {
        setIsTextTruncated(!isTextTruncated);
    };

    // Conditionally apply a class for left alignment
    const cardClassName = `review-card ${singleBusinessPage ? 'left-align' : ''}`;

    return (
        <div className={cardClassName}>
            <div className="reviewer-info">
                <strong>{review.username || 'N/A'}</strong>
            </div>
            <div className="rating-date-info">
                <span className="rating-info">
                    <i className="fa fa-star"></i> {review.rating ? review.rating.toFixed(1) : 'N/A'}
                </span>
                <span className="date-info">
                    {newDate}
                </span>
            </div>
            <div className="review-content">
                {isTextTruncated ? review.content.slice(0, 100) : review.content}
                {review.content.length > 100 && (
                    <span 
                        className="read-more" 
                        onClick={toggleTextTruncation}
                    >
                        {isTextTruncated ? '... Read More' : ' Read Less'}
                    </span>
                )}
            </div>
            {user && user.id === review.user_id && (
                <div className="review-buttons">
                    <OpenModalButton
                        buttonText="Update"
                        buttonStyling="update-business-button"
                        modalComponent={<UpdateReviewForm review={review} />}
                    />
                    <OpenModalButton
                        buttonText="Delete"
                        buttonStyling="delete-business-button"
                        modalComponent={<DeleteReview review={review} businessId={businessId} onReviewDelete={() => {
                            console.log('Review delete button clicked for review ID:', review.id);  // NEW LOG
                            onReviewDelete();
                        }} />} 
                    />
                </div>
            )}
        </div>
    );
};

export default ReviewCard;
