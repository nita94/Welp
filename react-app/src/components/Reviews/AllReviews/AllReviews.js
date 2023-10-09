import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getReviews } from '../../../store/reviews';  // Ensure you have a thunk function like this
import './AllReviews.css';

const AllReviews = () => {
    const dispatch = useDispatch();

    // Accessing the reviews directly from the state
    const reviews = useSelector(state => Object.values(state.reviews.allReviews));  // Ensure your state structure is similar

    useEffect(() => {
        dispatch(getReviews());  // Fetches all reviews from your API
    }, [dispatch]);

    if (!reviews.length) return null;

    return (
        <div className='all-reviews-container'>
            {reviews.map(review => (
                <div className='review-tile-container' key={review.id}>
                    <div>{review.content}</div>
                    <div>Rating: {review.rating}</div>
                    {/* Add more review details here if needed */}
                </div>
            ))}
        </div>
    );
};

export default AllReviews;
