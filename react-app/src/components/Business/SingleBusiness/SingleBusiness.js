import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import { getSelectedBusiness } from "../../../store/businesses";
import { getReviews } from "../../../store/reviews";
import DeleteReview from "../../Reviews/DeleteReview/DeleteReview";
import UpdateReviewForm from "../../Reviews/UpdateReviewForm/UpdateReviewForm";
import OpenModalButton from "../../Landing/OpenModalButton"; // Correct relative path
import CreateReviewForm from "../../Reviews/CreateReviewForm/CreateReviewForm"; // Correct relative path

import './SingleBusiness.css';

const SingleBusiness = () => {
    const dispatch = useDispatch();
    const { businessId } = useParams();

    const user = useSelector(state => state.session.user); // Assuming you have this in your Redux state
    const business = useSelector(state => state.businesses.singleBusiness);
    const reviewsList = useSelector(state => state.reviews.reviews);

    const [showUpdateReview, setShowUpdateReview] = useState(null);
    const [showDeleteReview, setShowDeleteReview] = useState(null);

    // Debugging step A: Log businessId and fetched reviews
    useEffect(() => {
        console.log("Business ID in SingleBusiness:", businessId);
        dispatch(getSelectedBusiness(businessId));
        dispatch(getReviews(businessId));

        // Log fetched reviews
        console.log("Fetched reviews:", reviewsList);
    }, [dispatch, businessId]);

    const reviewsArray = Object.values(reviewsList || {}); // Add fallback to an empty object

    // Debugging step B: Log and render reviews
    console.log("Rendering reviews:", reviewsArray);

    if (!business) {
        return <p>Error: Business data not loaded. Check the businessId: {businessId} and Redux state.</p>;
    }

    const businessOwner = user && business.user_id === user.id;
    const reviewOwner = user && reviewsArray.find((review) => review.user_id === user.id);

    return (
        <div className="single-business-container">
            <h2>{business.name}</h2>
            <div>{business.address}</div>
            <div>{business.description}</div>

            <Link to={`/businesses/${businessId}/managebusiness`} className="manage-business-button">
                Manage Your Business
            </Link>

            {user && !(businessOwner || reviewOwner) && (
                <div>
                    {/* Replace with your modal opening logic if different */}
                    <OpenModalButton buttonText="Add Review" modalComponent={<CreateReviewForm businessId={businessId} />} />
                </div>
            )}

            <h3>Reviews</h3>
            <div className="reviews-container">
                {reviewsArray.length > 0 ? (
                    reviewsArray.map(review => (
                        <div key={review.id} className="review">
                            <p>{review.content}</p>
                            <p>Rating: {review.rating}</p>
                            <div className="review-buttons">
                                {user && (user.id === review.user_id) && (
                                    <>
                                        {/* Replace with your modal opening logic if different */}
                                        <OpenModalButton
                                            buttonText='Edit Review'
                                            modalComponent={<UpdateReviewForm review={review}/>}
                                        />
                                        <OpenModalButton
                                            buttonText='Delete Review'
                                            modalComponent={<DeleteReview review={review}/>}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>
        </div>
    );
};

export default SingleBusiness;
