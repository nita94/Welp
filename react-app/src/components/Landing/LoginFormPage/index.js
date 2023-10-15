// LoginFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../../store/session";
import DemoUser from "../DemoUser/DemoUser"; // Import the DemoUser component
import Footer from '../Footer/Footer'; // Import the Footer component
import "../Footer/Footer.css"


function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className="login-form-page-container">
      <div className="login-form-page-content">
        <h1 className="login-form-page-h1">Log In to Your Account</h1>
        <form onSubmit={handleSubmit} className="login-form-page-form">
          {errors.length > 0 && (
            <ul className="error-list">
              {errors.map((error, idx) => (
                <li key={idx} className="error">
                  {error}
                </li>
              ))}
            </ul>
          )}
          <div className="form-group">
            <label htmlFor="email" className="login-form-page-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-form-page-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="login-form-page-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-form-page-input"
            />
          </div>
          <button type="submit" className="login-form-page-button">
            Log In
          </button>

          {/* Add the DemoUser button next to the Login button */}
          <DemoUser
            className="login-form-page-demo-button"
            string="Demo User"
          />
        </form>
        
        {/* Include the Footer component at the end of the page */}
        <Footer className="login-form-page-footer" />
      </div>
    </div>
  );
}

export default LoginFormPage;
