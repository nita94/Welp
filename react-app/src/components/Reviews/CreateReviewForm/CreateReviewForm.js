import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReview } from '../../../store/reviews';
import './CreateReviewForm.css';

const CreateReviewForm = ({ businessId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector(state => state.session.user.id);
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [errors, setErrors] = useState([]);

    const handleCreateReview = async (e) => {
        e.preventDefault();

        const payload = {
            content,
            rating,
            user_id: userId,
            business_id: businessId,
        };

        try {
            const newReview = await dispatch(createReview(businessId, payload));  // Adjusted line here
            if (newReview) {  // Adjusted line here, checking if newReview exists
                history.push(`/businesses/${businessId}`);
            } else {
                setErrors([...errors, "An error occurred while creating the review."]);
            }
        } catch (err) {
            console.error(err);
            setErrors([...errors, "An error occurred while creating the review."]);
        }
    };

    return (
        <div className="create-review-container">
            <h2>Write a Review</h2>
            <form onSubmit={handleCreateReview}>
                <ul className="error-list">
                    {errors.map((error, idx) => (
                        <li key={idx} className="error">{error}</li>
                    ))}
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
                <button className="submit-button" type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default CreateReviewForm;
