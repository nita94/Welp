import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateReview, getReviewsForBusiness } from "../../../store/reviews"; 
// Update import path as needed
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
            const res = await dispatch(updateReview(payload, review.id));
            if (res) {
                dispatch(getReviewsForBusiness(businessId));
                // Optionally close modal if you're using one
            }
        } catch(err) {
            console.error(err);
            setErrors([...errors, "An error occurred while updating the review."]);
        }
    };

    return (
        <>
            <div>Update a review</div>
            <form onSubmit={handleUpdateReview}>
                <ul>{errors.map((error, idx) => (<li key={idx}>{error}</li>))}</ul>
                <label>Content</label>
                <textarea
                    value={content}
                    required
                    onChange={(e) => setContent(e.target.value)}
                />
                <label>Rating:</label>
                {[1, 2, 3, 4, 5].map(star => (
                    <span
                        key={star}
                        className={rating >= star ? 'full' : 'blank'}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(rating)}
                        onClick={() => setRating(star)}
                    >
                        <i className="fa fa-star"></i>
                    </span>
                ))}
                <button type="submit">Update Review</button>
            </form>
        </>
    );
};

export default UpdateReviewForm;
