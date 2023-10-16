import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import DemoUser from "../DemoUser/DemoUser";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import DropdownMenu from '../DropdownMenu/DropdownMenu'; // Import the DropdownMenu component

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  const location = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [showFeatureMessage, setShowFeatureMessage] = useState(false);

  const handleSearch = () => {
    // Show the "Feature coming soon" message
    setShowFeatureMessage(true);

    // Hide the "Feature coming soon" message after 2 seconds
    setTimeout(() => {
      setShowFeatureMessage(false);
    }, 2000);

    // You can add any logic here for future search functionality
  }

  return (
    <ul className="navbar">
      <NavLink className="homeNavLink" exact to="/">
        <h1 className="home">
          <img src={process.env.PUBLIC_URL + '/images/welp_logo.png'} alt="Welp" className="logo" /> Welp
        </h1>
      </NavLink>
      <div className="search-bar-container">
        <input type="text" placeholder="Search for businesses..." />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
        {showFeatureMessage && (
          <div className="feature-message">
            Feature coming soon!
          </div>
        )}
      </div>
      <div className="dropdown-container">
        <button onClick={toggleDropdown} className="nav-button business">
          Welp for Business
        </button>
        <DropdownMenu isOpen={isDropdownOpen} closeDropdown={toggleDropdown} />
      </div>
      <NavLink className="nav-button business" to="/businesses">
        Write a Review
      </NavLink>
      <div className="iconLinks">
        <a id="fabLink1" href="https://github.com/nita94" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} size="2x" style={{ color: "#000" }} />
        </a>
        <a id="fabLink2" href="https://www.linkedin.com/in/nicholas-tan-8046a5159/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} size="2x" style={{ color: "#000" }} />
        </a>
        {sessionUser ? (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        ) : (
          <div className="sessionUser">
            <NavLink className="login" to="/login">
              Log In
            </NavLink>
            <NavLink className="signUp" to="/signup">
              Sign Up
            </NavLink>
            <NavLink to="/">
              <DemoUser className={"demoLogin"} string="Demo Login" />
            </NavLink>
          </div>
        )}
      </div>
    </ul>
  );
}

export default Navigation;
