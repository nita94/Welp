import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBusinesses } from '../../../store/businesses';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import OpenModalButton from '../OpenModalButton';  // Ensure path is correct

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

  const businessesArray = Object.values(businesses);

  return (
    <div className="landing-page">
      <header className="header">
        <img src="images/welp_logo.png" alt="Welp" className="logo" />
        <nav className="navigation">
          <ul>
            <li>
              <OpenModalButton 
                modalComponent={<AddBusinessModalContent />} 
                buttonText="Welp for Business" 
              />
            </li>
            <li>
              <button onClick={() => window.location.href='/businesses'}>
                Write a Review
              </button>
            </li>
          </ul>
        </nav>
      </header>
      
      <main className="main-content">
        <section className="search-bar">
          <input type="text" placeholder="Search for businesses..." />
          <button type="button" onClick={() => window.location.href='/search'}>
            Search
          </button>
        </section>
        
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
      </main>
    </div>
  );
};

export default LandingPage;
