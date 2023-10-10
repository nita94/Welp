import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReview } from '../../../store/reviews'; // Assuming store is in src/store
import './CreateReviewForm.css';

const CreateReviewForm = ({ businessId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((state) => state.session.user.id);
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        console.log('Business ID in CreateReviewForm:', businessId); // Debugging line
    }, [businessId]);

    const handleCreateReview = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const reviewData = {
            content,
            rating,
            user_id: userId,
            business_id: businessId, // Ensure businessId is being passed correctly
        };

        console.log('Submitting review:', reviewData); // Debugging line

        try {
            console.log('Creating review for businessId:', businessId); // Debugging line
            console.log('Review data:', reviewData); // Debugging line
            const data = await dispatch(createReview(reviewData, businessId));
            // Log the response status and status text
            console.log('Review Data:', data);

            history.push(`/businesses/${businessId}`);
        } catch (error) {
            // Log any errors that occur with the fetch call itself (e.g., network errors)
            console.error('Fetch Error:', error); // Debugging line
            setErrors([...errors, 'An error occurred while creating the review.']);
        }
    };

    return (
        <div className="create-review-container">
            <h2>Write a Review</h2>
            <form onSubmit={handleCreateReview}>
                <ul className="error-list">
                    {errors.map((error, idx) => (
                        <li key={idx} className="error">
                            {error}
                        </li>
                    ))}
                </ul>
                <div className="form-group">
                    <label className="label">Rating:</label>
                    <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
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
                <button className="submit-button" type="submit">
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default CreateReviewForm;
