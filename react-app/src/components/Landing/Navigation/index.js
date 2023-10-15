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

  // State to manage the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to close the dropdown
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <ul className="navbar">
      <NavLink className="homeNavLink" exact to="/">
        <h1 className="home">
          <img src={process.env.PUBLIC_URL + '/images/welp_logo.png'} alt="Welp" className="logo" /> Welp
        </h1>
        <FontAwesomeIcon icon={["fab", "yelp"]} style={{ color: "#ff1a1a" }} />
      </NavLink>
      <div className="search-bar-container">
        <input type="text" placeholder="Search for businesses..." />
        <button type="button" onClick={() => window.location.href = '/search'}>
          Search
        </button>
      </div>
      <div className="nav-buttons">
        <div className="dropdown-container">
          <button onClick={toggleDropdown} className="nav-button business">
            Welp for Business
          </button>
          <DropdownMenu isOpen={isDropdownOpen} closeDropdown={closeDropdown} />
        </div>
        <NavLink className="nav-button business" to="/businesses">
          Write a Review
        </NavLink>
      </div>
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
