import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../utils/API";
import Auth from "../utils/auth";
import Header from "../components/Header";

export default function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);

  const loggedIn = Auth.loggedIn();

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(formState);

      if (!response.ok) {
        const errorMessage = await response.text();
        console.log(response);
        throw new Error("Failed to login: " + errorMessage);
      }

      // Use authentication function
      const { token, user } = await response.json();
      Auth.login(token);
      console.log(user);
    } catch (err) {
    
      // Set showAlert to true to display the error message
      setShowAlert(true);
    }

    // Clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  // If the user is logged in, redirect to the home page
  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="signup d-flex flex-column align-items-center justify-content-center text-center">
      <Header />
      <form onSubmit={handleFormSubmit} className="signup-form d-flex flex-column">
        {/* Email input */}
        <label htmlFor="email">Email</label>
        <input
          className="form-input"
          value={formState.email}
          placeholder="youremail@gmail.com"
          name="email"
          type="email"
          onChange={handleChange}
        />

        {/* Password input */}
        <label htmlFor="password">Password</label>
        <input
          className="form-input"
          value={formState.password}
          placeholder="********"
          name="password"
          type="password"
          onChange={handleChange}
        />

        {/* Login button */}
        <div className="btn-div">
          <button disabled={!(formState.email && formState.password)} className="signup-btn mx-auto my-auto">Login</button>
        </div>
        
        {/* Signup link */}
        <p className="link-btn">
          New to FitTrack?{' '}
          <Link to="/signup" >Create one</Link>
        </p>
        
        {/* Error message display */}
        {showAlert && <div className="err-message">Login failed</div>}
      </form>
    </div>
  );
}
