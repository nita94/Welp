import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBusinesses } from '../../../store/businesses';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import OpenModalButton from '../OpenModalButton';
import Footer from '../Footer/Footer'; // Import the Footer component

const AddBusinessModalContent = () => (
  <div>
    <h2>Add a Business</h2>
    <p>Claim your business and start managing reviews today!</p>
    <Link to="/businesses/new">Add a Business</Link>
  </div>
);

const LandingPage = () => {
  const dispatch = useDispatch();
  const businesses = useSelector(state => state.businesses.allBusinesses);

  useEffect(() => {
    dispatch(getBusinesses());
  }, [dispatch]);

  // Get an array of businesses from the Redux store
  const businessesArray = Object.values(businesses);

  return (
    <div className="landing-page">
      {/* Rest of your LandingPage content */}
      <section className="featured-businesses">
        <h2>Your Next Review Awaits</h2>
        <div className="business-grid">
          {businessesArray.map(business => (
            <article className="business" key={business.id}>
              <img src={business.image_url} alt={business.name} />
              <h3>
                <Link to={`/businesses/${business.id}`}>{business.name}</Link>
              </h3>
            </article>
          ))}
        </div>
      </section>
      {/* Include the Footer component here */}
      <Footer />
    </div>
  );
};

export default LandingPage;
