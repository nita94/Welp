import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import { getSelectedBusiness } from "../../../store/businesses";
import { getReviews } from "../../../store/reviews";
import './SingleBusiness.css';

const SingleBusiness = () => {
    const dispatch = useDispatch();
    const { businessId } = useParams();

    const business = useSelector(state => state.businesses.allBusinesses[String(businessId)]);
    const reviewsList = useSelector(state => state.reviews.reviewsList);

    useEffect(() => {
        // Fetch the business data if it's not available in the store
        if (!business) {
            console.log('Fetching business data...');
            dispatch(getSelectedBusiness(businessId));
        }

        // Fetch reviews for the selected business
        dispatch(getReviews(businessId));
    }, [dispatch, businessId, business]);

    // Check if business is not defined yet, and render accordingly
    if (!business) {
        return null; // or you can render a loading spinner or message here
    }

    // If business data is available, render the component
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
                    {reviewsList.map(review => (
                        <div key={review.id} className="review">
                            {console.log('Review:', review)}
                            <p>{review.content}</p>
                            <p>Rating: {review.rating}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SingleBusiness;
