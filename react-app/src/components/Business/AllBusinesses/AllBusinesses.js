import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getBusinesses, updateBusiness } from '../../../store/businesses';
import { getReviews } from '../../../store/reviews';
import './AllBusinesses.css';
import './../../../index.css';

const AllBusinesses = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const businesses = useSelector((state) =>
    Object.values(state.businesses.allBusinesses)
  );
  const reviews = useSelector((state) =>
    Object.values(state.reviews.allReviews)
  );

  const [hoverRating, setHoverRating] = useState({});

  useEffect(() => {
    dispatch(getBusinesses());
    dispatch(getReviews());
  }, [dispatch]);

  if (!businesses.length) return null;

  return (
    <div className='all-businesses-page'>
      <div className='business-intro'>
        <h1 className='business-intro-text'>
          Choose a business or a star rating below to write a review!
        </h1>
      </div>
      <div className='all-businesses-container'>
        {businesses.map((business) => {
          return (
            <div className='business-tile-container' key={business.id}>
              {business.image_url && <img src={business.image_url} alt={business.name} />}
              <a
                className='business-name-link'
                onClick={() => history.push(`/businesses/${business.id}`)}
              >
                {business.name}
              </a>
              <div>{business.address}</div>
              <div>Do you recommend this business?</div>
              <div className='star-rating'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${
                      star <= (hoverRating[business.id] || 0) ? 'filled' : ''
                    }`}
                    onMouseEnter={() =>
                      setHoverRating((prev) => ({ ...prev, [business.id]: star }))
                    }
                    onMouseLeave={() =>
                      setHoverRating((prev) => ({ ...prev, [business.id]: 0 }))
                    }
                    onClick={() => {
                      history.push(`/businesses/${business.id}/reviews/new`);
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllBusinesses;
