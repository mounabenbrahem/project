import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUser } from "../utils/API";

export default function Signup() {
  // Define formState and setFormState using useState
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  // Update formState based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update formState using spread syntax
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createUser(formState);

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to create user");
      }

      // Redirect to login page after successful signup
      window.location.replace("/login");
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    // Clear form values
    setFormState({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="signup">
      <h2>Create Account</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formState.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>
      </form>

      {showAlert && <div className="error">Failed to create user</div>}

      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
