import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footerWrapper">
      <div className="footer-container">
        <div className="footer-header">
          <h1>
            Welp
            <img src={process.env.PUBLIC_URL + '/images/welp_logo.png'} alt="Welp Logo" style={{ width: "25px", verticalAlign: "middle" }} />
          </h1>
          <p>
            Browse businessess, leave reviews, view ratings, and discover new
            places.
          </p>
        </div>
        <div className="footer-content">
          <div className="footer-col">
            <ul>
              <li>
                <h1>Frontend</h1>
              </li>
              <li>JavaScript</li>
              <li>Redux</li>
              <li>React</li>
              <li>CSS</li>
            </ul>
            <ul>
              <li>
                <h1>Backend</h1>
              </li>
              <li>Python</li>
              <li>SQL</li>
            </ul>
            <ul>
              <li>
                <h1>Coming Soon</h1>
              </li>
              <li>AWS S3</li>
              <li>Search</li>
              <li>Business Categories</li>
            </ul>
          </div>
          <div className="footer-links">
            Copyright Nick T© 2023{" "}
            <h1>
              Welp
              <img src={process.env.PUBLIC_URL + '/images/welp_logo.png'} alt="Welp Logo" style={{ width: "25px", verticalAlign: "middle" }} />
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
