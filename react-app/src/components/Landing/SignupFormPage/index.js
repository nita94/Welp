import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../../store/session";
import './SignupFormPage.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <div className="signup-form-page-container">
      <h1 className="signup-form-page-h1">Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form-page-form">
        <ul className="error-list">
          {errors.map((error, idx) => <li key={idx} className="error">{error}</li>)}
        </ul>
        <label className="signup-form-page-label">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-form-page-input"
          />
        </label>
        <label className="signup-form-page-label">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="signup-form-page-input"
          />
        </label>
        <label className="signup-form-page-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-form-page-input"
          />
        </label>
        <label className="signup-form-page-label">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="signup-form-page-input"
          />
        </label>
        <button type="submit" className="signup-form-page-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
