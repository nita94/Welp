import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReview } from '../../../store/reviews'; 
import { useModal } from '../../../context/Modal';  // Import useModal
import './CreateReviewForm.css';

const CreateReviewForm = ({ businessId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();  // Get closeModal from useModal
    const userId = useSelector((state) => state.session.user.id);
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        console.log('Business ID in CreateReviewForm:', businessId); 
    }, [businessId]);

    const handleCreateReview = async (e) => {
        e.preventDefault(); 

        const reviewData = {
            content,
            rating,
            user_id: userId,
            business_id: businessId, 
        };

        console.log('Submitting review:', reviewData); 

        try {
            console.log('Creating review for businessId:', businessId); 
            console.log('Review data:', reviewData); 
            const data = await dispatch(createReview(reviewData, businessId));
            console.log('Review Data:', data);

            closeModal();  // Close the modal after review submission

            history.push(`/businesses/${businessId}`);
        } catch (error) {
            console.error('Fetch Error:', error);
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
