import "./Footer.css";

const Footer = () => {
  return (
    <div className="footerWrapper">
      <div className="footer-container">
        <div className="footer-header">
          <h1>
            Welp
            <i className="fa-brands fa-yelp" style={{ fontSize: "25px" }}></i>
          </h1>

          <p>
            Browse restaurants, leave reviews, view ratings, and discover new
            places.
          </p>
        </div>

        <div className="footer-col">
          <ul>
            <li>
              <h1>Frontend</h1>
            </li>
            <li>JavaScript</li>
            <li>Redux</li>
            <li>React</li>
            <li>Css</li>
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
              <h1>Other</h1>
            </li>
            <li>Coming Soon</li>
            <li>AWS S3</li>
          </ul>
        </div>

        <div className="footer-links">
          Copyright © 2023{" "}
          <h1>
            Welp
            <i className="fa-brands fa-yelp"></i>
          </h1>
          
          {/* <div>
            <h2>❤</h2>
            <h2>❤</h2>
            <h2>❤</h2>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;