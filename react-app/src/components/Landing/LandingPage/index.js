import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getBusinesses } from '../../../store/businesses';
import './LandingPage.css';

const LandingPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const businesses = useSelector(state => Object.values(state.businesses.allBusinesses));

  const [hoverRating, setHoverRating] = useState({});

  useEffect(() => {
    dispatch(getBusinesses());
  }, [dispatch]);

  if (!businesses.length) return null;

  // Define the background image URL
  const backgroundImageURL = process.env.PUBLIC_URL + '/images/chopboard.png';

  return (
    <div className='landing-page-container' style={{ backgroundImage: `url(${backgroundImageURL})` }}>
      {businesses.map(business => {
        return (
          <div className='business-tile-container' key={business.id}>
            {business.image_url && (
              <img src={business.image_url} alt={business.name} />
            )}
            <a 
                className='business-name-link' 
                onClick={() => history.push(`/businesses/${business.id}`)}
            >
              {business.name}
            </a>
            <div>{business.address}</div>
            <div>{business.city}, {business.state}</div> {/* Add city and state */}
            <div className="hours">Hours: {business.hours}</div> {/* Apply the hours class */}
            <div className="recommendation">Do you recommend this business?</div> {/* Apply the recommendation class */}
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= (hoverRating[business.id] || 0) ? 'filled' : ''}`}
                  onMouseEnter={() => setHoverRating(prev => ({ ...prev, [business.id]: star }))}
                  onMouseLeave={() => setHoverRating(prev => ({ ...prev, [business.id]: 0 }))}
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
  );
};

export default LandingPage;
