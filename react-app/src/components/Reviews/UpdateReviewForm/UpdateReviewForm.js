import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateReview } from "../../../store/reviews";
import { useModal } from "../../../context/Modal"; // Import useModal
import './UpdateReviewForm.css';

const UpdateReviewForm = ({ review, businessId, refreshReviews }) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id);
    const [content, setContent] = useState(review.content);
    const [rating, setRating] = useState(review.rating);
    const [hoverRating, setHoverRating] = useState(rating);
    const [errors, setErrors] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false); // State to track update status

    // Use the useModal context to access the closeModal function
    const { closeModal } = useModal();

    const handleUpdateReview = async (e) => {
        e.preventDefault();
    
        const payload = {
            content,
            rating,
            user_id: userId,
            business_id: businessId,
        };
    
        try {
            setIsUpdating(true);
    
            const updatedReview = await dispatch(updateReview(review.id, payload));
            if (!updatedReview) {
                throw new Error("An error occurred while updating the review.");
            }
    
            setErrors([]);
            
            // Close the modal after successfully updating the review
            closeModal();
    
            setIsUpdating(false);
            console.log("Review updated successfully:", updatedReview);
            
            // Optionally, refresh the reviews after updating
            if (refreshReviews) {
                refreshReviews();
            }
        } catch (err) {
            console.error("Error updating review:", err);
            setErrors(["An error occurred while updating the review."]);
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        // This effect can be used to trigger actions when the component mounts or props change.
        // You can add any code here that should run when the component is initially rendered or
        // when the props change.
    }, [review]); // Add dependencies as needed

    return (
        <div className="update-review-container">
            <h2>Update a Review</h2>
            <form onSubmit={handleUpdateReview}>
                <ul className="error-list">
                    {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
                </ul>
                <div className="form-group">
                    <label className="label">Rating:</label>
                    <div className="star-rating">
                        {[1, 2, 3, 4, 5].map(star => (
                            <span
                                key={star}
                                className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label className="label">Your Review:</label>
                    <textarea
                        className="text-area"
                        value={content}
                        required
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button className="submit-button" type="submit" disabled={isUpdating}>Update Review</button>
            </form>
        </div>
    );
};

export default UpdateReviewForm;
