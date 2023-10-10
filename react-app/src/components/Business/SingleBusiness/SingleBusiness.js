import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import { getSelectedBusiness } from "../../../store/businesses";
import { getReviews } from "../../../store/reviews";
import DeleteReview from "../../Reviews/DeleteReview/DeleteReview";
import UpdateReviewForm from "../../Reviews/UpdateReviewForm/UpdateReviewForm"; // Import UpdateReviewForm
import './SingleBusiness.css';

const SingleBusiness = () => {
    const dispatch = useDispatch();
    const { businessId } = useParams();

    const business = useSelector(state => state.businesses.allBusinesses[String(businessId)]);
    const reviewsList = useSelector(state => state.reviews.reviewsList);

    // State to control the visibility of DeleteReview and UpdateReview
    const [showDeleteReview, setShowDeleteReview] = useState(null);
    const [showUpdateReview, setShowUpdateReview] = useState(null);

    // State to track the selected review for update
    const [selectedReviewForUpdate, setSelectedReviewForUpdate] = useState(null);

    useEffect(() => {
        if (!business) {
            console.log('Fetching business data...');
            dispatch(getSelectedBusiness(businessId));
        }

        dispatch(getReviews(businessId));
    }, [dispatch, businessId, business]);

    if (!business) {
        return <p>Loading business data...</p>;
    }

    const reviewsArray = Object.values(reviewsList);

    return (
        <>
            <div className="single-business-container">
                <h2>{business.name}</h2>
                <div>{business.address}</div>
                <div>{business.description}</div>

                <Link to={`/businesses/${businessId}/managebusiness`} className="manage-business-button">
                    Manage Your Business
                </Link>

                <Link to={`/businesses/${businessId}/reviews/new`} className="write-review-button">
                    Write a Review
                </Link>

                <div className="reviews-container">
                    {reviewsArray.length > 0 ? (
                        reviewsArray.map(review => (
                            <div key={review.id} className="review">
                                <p>{review.content}</p>
                                <p>Rating: {review.rating}</p>
                                <div className="review-buttons">
                                    <button onClick={() => setShowUpdateReview(review.id)}>Update Review</button>
                                    {/* Render DeleteReview and UpdateReview components conditionally */}
                                    {showDeleteReview === review.id ? (
                                        <DeleteReview
                                            review={review}
                                            onHide={() => setShowDeleteReview(null)}
                                        />
                                    ) : null}

                                    {showUpdateReview === review.id ? (
                                        <UpdateReviewForm
                                            review={review}
                                            businessId={businessId}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No reviews available.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default SingleBusiness;
