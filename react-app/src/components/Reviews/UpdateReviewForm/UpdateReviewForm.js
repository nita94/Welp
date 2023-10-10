import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateReview } from "../../../store/reviews"; 
import './UpdateReviewForm.css'; 

const UpdateReviewForm = ({ review, businessId }) => { 
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id);
    const [content, setContent] = useState(review.content);
    const [rating, setRating] = useState(review.rating);
    const [hoverRating, setHoverRating] = useState(rating); 
    const [errors, setErrors] = useState([]);

    const handleUpdateReview = async (e) => {
        e.preventDefault();

        const payload = {
            content,
            rating,
            user_id: userId,
            business_id: businessId,
        };

        try {
            const updatedReview = await dispatch(updateReview(review.id, payload));
            if (!updatedReview) {
                throw new Error("An error occurred while updating the review.");
            }
            // Optionally close modal or navigate if you're using React-Router
        } catch(err) {
            console.error(err);
            setErrors([...errors, "An error occurred while updating the review."]);
        }
    };

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
                <button className="submit-button" type="submit">Update Review</button>
            </form>
        </div>
    );
};

export default UpdateReviewForm;
