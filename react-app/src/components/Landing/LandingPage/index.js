import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBusinesses } from '../../../store/businesses';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const dispatch = useDispatch();
  const businesses = useSelector(state => state.businesses.allBusinesses);

  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    dispatch(getBusinesses());
  }, [dispatch]);

  const businessesArray = Object.values(businesses);

  return (
    <div className="landing-page">
      <section className="featured-businesses">
        <h2>Your Next Review Awaits</h2>
        <div className="business-grid">
          {businessesArray.map(business => (
            <article className="business" key={business.id}>
              <img src={business.image_url} alt={business.name} className="standardized-image" />
              <h3>
                <Link to={`/businesses/${business.id}`}>{business.name}</Link>
              </h3>
              <p>Do you recommend this business?</p>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
