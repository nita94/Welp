import React from 'react';
import './LandingPage.css';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
  const history = useHistory();

  const handleNavigate = (path) => {
    history.push(path);
  };

  return (
    <div className="landing-page">
      <header className="header">
        <img src="logo.png" alt="Welp Logo" className="logo" />
        <nav className="navigation">
          <ul>
            <li><button onClick={() => handleNavigate('/businesses')}>Business Listings</button></li>
            <li><button onClick={() => handleNavigate('/reviews')}>User Reviews</button></li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        <section className="search-bar">
          <input type="text" placeholder="Search for businesses..." />
          <button type="button" onClick={() => handleNavigate('/search')}>Search</button>
        </section>
        <section className="featured-businesses">
          <h2>Featured Businesses</h2>
          {/* Render featured businesses here */}
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
