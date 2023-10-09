import React from 'react';
import './LandingPage.css';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
  const history = useHistory();

  // Function to handle navigation to different paths
  const handleNavigate = (path) => {
    history.push(path);
  };

  return (
    <div className="landing-page">
      
      {/* Header Section */}
      <header className="header">
        {/* Logo */}
        <img src="logo.png" alt="Welp Logo" className="logo" />
        
        {/* Navigation */}
        <nav className="navigation">
          <ul>
            <li>
              <button onClick={() => handleNavigate('/businesses')}>
                Business Listings
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigate('/reviews')}>
                User Reviews
              </button>
            </li>
          </ul>
        </nav>
      </header>
      
      {/* Main Content */}
      <main className="main-content">
        
        {/* Search Bar Section */}
        <section className="search-bar">
          <input type="text" placeholder="Search for businesses..." />
          <button type="button" onClick={() => handleNavigate('/search')}>
            Search
          </button>
        </section>
        
        {/* Featured Businesses Section */}
        <section className="featured-businesses">
          <h2>Featured Businesses</h2>
          
          {/* Individual Business Feature */}
          <article className="business">
            <img src="business1.jpg" alt="Business 1" />
            <h3>Business Name 1</h3>
            <p>Rating: 4.5/5</p>
          </article>
          
          <article className="business">
            <img src="business2.jpg" alt="Business 2" />
            <h3>Business Name 2</h3>
            <p>Rating: 4.0/5</p>
          </article>
          
          {/* Add more business articles as needed */}
        </section>
      </main>
    </div>
  );
};

export default LandingPage;