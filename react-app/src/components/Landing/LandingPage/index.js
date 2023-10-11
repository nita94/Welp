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

  const businessesArray = Object.values(businesses);

  return (
    <div className="landing-page">
      {/* Rest of your LandingPage content */}
      
      {/* Include the Footer component here */}
      <Footer />
    </div>
  );
};

export default LandingPage;
