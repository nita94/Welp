import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReview } from '../../../store/reviews';
import { useModal } from '../../../context/Modal';
import './CreateReviewForm.css';

const CreateReviewForm = ({ businessId, onReviewSubmit }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const user = useSelector((state) => state.session.user);
  const userId = user ? user.id : null;

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user, history]);

  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState([]);

  const handleCreateReview = async (e) => {
    e.preventDefault();

    const errorsObj = {};

    if (rating < 1 || rating > 5) errorsObj.rating = "Rating must be between 1 and 5";
    if (content.length < 10) errorsObj.content = "Review must be at least 10 characters";
    else if (content.length > 100) errorsObj.content = "Review must be less than 100 characters";

    const reviewData = {
      content,
      rating,
      user_id: userId,
      business_id: businessId,
    };

    if (Object.keys(errorsObj).length === 0) {
      try {
        const response = await dispatch(createReview(reviewData, businessId));

        closeModal();
        history.push(`/businesses/${businessId}`);

        onReviewSubmit();
      } catch (error) {
        setErrors([...errors, 'An error occurred while creating the review.']);
      }
    } else {
      setErrors(Object.values(errorsObj));
    }
  };

  return (
    <div className="create-review-container">
      <h2 className="create-review-header">Write a Review</h2>
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
