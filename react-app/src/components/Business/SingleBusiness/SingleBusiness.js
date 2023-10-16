import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getSelectedBusiness } from '../../../store/businesses';
import { getReviews } from '../../../store/reviews';
import OpenModalButton from '../../Landing/OpenModalButton';
import CreateReviewForm from '../../Reviews/CreateReviewForm/CreateReviewForm';
import '../../../index.css';
import './SingleBusiness.css';
import ReviewCard from '../../Reviews/ReviewCard/ReviewCard';

const SingleBusiness = () => {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const user = useSelector((state) => state.session.user);
  const business = useSelector((state) => state.businesses.singleBusiness);
  const reviews = Object.values(useSelector((state) => state.reviews.allReviews));
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    if (user) {
      const checkReview = async () => {
        const response = await fetch(`/api/reviews/check/${businessId}/${user.id}`);
        const data = await response.json();
        setHasReviewed(data.hasReviewed);
      };
      checkReview();
    }

    dispatch(getSelectedBusiness(businessId));
    dispatch(getReviews(businessId));
  }, [dispatch, businessId, user]);

  // Add a loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (business && reviews) {
      setIsLoading(false);
    }
  }, [business, reviews]);

  const handleReviewSubmitted = () => {
    setHasReviewed(true);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!business) {
    return (
      <p>
        Error: Business data not loaded. Check the businessId: {businessId} and Redux state.
      </p>
    );
  }

  const businessOwner = user && (business.owner_user_id || business.user_id) === user.id;

  return (
    <div className="single-business-container">
      {business.image_url && (
        <img src={business.image_url} alt={business.name} className="business-image standardized-image" />
      )}

      <div className="business-details">
        <h2>{business.name}</h2>
        <div>{business.address}</div>
        <div>{business.description}</div>
      </div>

      {user && businessOwner && (
        <Link to={`/businesses/${businessId}/managebusiness`} className="manage-business-button">
          Manage Your Business
        </Link>
      )}

      {user && !businessOwner && !hasReviewed && (
        <div className="review-button-container">
          <OpenModalButton
            buttonText="Add Review"
            modalComponent={<CreateReviewForm businessId={businessId} onReviewSubmit={handleReviewSubmitted} />}
          />
        </div>
      )}

      <h3>Reviews</h3>
      <div className="reviews-container">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} user={user} singleBusinessPage={true} />
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default SingleBusiness;
