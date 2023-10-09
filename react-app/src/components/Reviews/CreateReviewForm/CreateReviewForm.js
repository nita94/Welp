import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReview } from '../../../store/reviews';
import './CreateReviewForm.css';

const CreateReviewForm = ({businessId}) => {
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
            const res = await dispatch(createReview(payload));
            if (res) {
                history.push(`/businesses/${businessId}`);
            }
        } catch(err) {
            console.error(err);
            setErrors([...errors, "An error occurred while creating the review."]);
        }
    };

    return (
        <>
            <div>Post a review</div>
            <form onSubmit={handleCreateReview}>
                <ul>{errors.map((error, idx) => (<li key={idx}>{error}</li>))}</ul>
                <label>Content</label>
                <textarea
                    value={content}
                    required
                    onChange={(e) => setContent(e.target.value)}
                />
                <label>Rating:</label>
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
                <button type="submit">Create Review</button>
            </form>
        </>
    );
};

export default CreateReviewForm;
