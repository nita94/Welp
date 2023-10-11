import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import { getSelectedBusiness } from "../../../store/businesses";
import { getReviews } from "../../../store/reviews";
import DeleteReview from "../../Reviews/DeleteReview/DeleteReview";
import UpdateReviewForm from "../../Reviews/UpdateReviewForm/UpdateReviewForm";
import OpenModalButton from "../../Landing/OpenModalButton";
import CreateReviewForm from "../../Reviews/CreateReviewForm/CreateReviewForm";
import '../../../index.css';
import './SingleBusiness.css';

const SingleBusiness = () => {
    const dispatch = useDispatch();
    const { businessId } = useParams();
    const user = useSelector(state => state.session.user);
    const business = useSelector(state => state.businesses.singleBusiness);
    const reviews = Object.values(useSelector(state => state.reviews.allReviews)); // Adjust based on your Redux state

    useEffect(() => {
        console.log("Business ID in SingleBusiness:", businessId);
        dispatch(getSelectedBusiness(businessId));
        dispatch(getReviews(businessId));
        console.log("Fetched reviews:", reviews);
    }, [dispatch, businessId]); // Remove 'reviews' from the dependency array
    

    if (!business) {
        return <p>Error: Business data not loaded. Check the businessId: {businessId} and Redux state.</p>;
    }

    const businessOwner = user && business.user_id === user.id;
    const reviewOwner = user && reviews.find((review) => review.user_id === user.id);

    return (
        <div className="single-business-container">
            <h2>{business.name}</h2>
            <div>{business.address}</div>
            <div>{business.description}</div>
            
            {/* Display the business image */}
            {business.image_url && (
                <img src={business.image_url} alt={business.name} className="business-image standardized-image" />
                
            )}

            <Link to={`/businesses/${businessId}/managebusiness`} className="manage-business-button">
                Manage Your Business
            </Link>
            
            {user && !(businessOwner || reviewOwner) && (
                <div>
                    <OpenModalButton 
                        buttonText="Add Review" 
                        modalComponent={<CreateReviewForm businessId={businessId} />} 
                    />
                </div>
            )}

            <h3>Reviews</h3>
            <div className="reviews-container">
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id} className="review">
                            <p>{review.content}</p>
                            <p>Rating: {review.rating}</p>
                            <div className="review-buttons">
                                {user && (user.id === review.user_id) && (
                                    <>
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
