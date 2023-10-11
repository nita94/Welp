import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteReview } from '../../../store/reviews'; // Assuming the path is consistent with previous
import { useModal } from '../../../context/Modal';
import './DeleteReview.css';

const DeleteReview = ({ review, businessId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDeleteReview = async () => {
        await dispatch(deleteReview(review.id, businessId)); // Ensure backend supports this call structure
        // Optionally fetch reviews here to refresh the list, if not being handled in another way
        closeModal();
    }

    const handleCancelClick = () => {
        closeModal();
    }

    return (
        <div className="delete-review-container">
            <h2>Delete Review</h2>
            <h4>Are you sure you want to delete this Review?</h4>
            <div className="delete-review-buttons">
                <button className="delete-review-button" onClick={handleDeleteReview}>
                    Delete Review
                </button>
                <button className="cancel-button" onClick={handleCancelClick}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default DeleteReview;
