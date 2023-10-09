import { useDispatch } from 'react-redux';
import { deleteReview, getReviewsForBusiness } from '../../../store/reviews';
// Update path as needed
import './DeleteReview.css';

const DeleteReview = ({ review }) => {
    const dispatch = useDispatch()

    const handleDeleteReview = async(e) => {
        e.preventDefault();
        await dispatch(deleteReview(review.id));
        await dispatch(getReviewsForBusiness(review.business_id));
        // Optionally close modal if you're using one
    }

    const handleCancelClick = (e) => {
        // Optionally close modal if you're using one
    }

    return(
        <>
            <h2>Delete Review</h2>
            <h4>Are you sure you want to delete this Review?</h4>
            <button onClick={handleDeleteReview}>Delete Review</button>
            <button onClick={handleCancelClick}>Cancel</button>
        </>
    )
}

export default DeleteReview;
