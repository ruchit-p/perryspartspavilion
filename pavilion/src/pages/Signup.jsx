// src/pages/SignUpPage.jsx

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const SignUpPage = () => {
  const { signup } = useAuth();
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    role: "student", // This assumes you have a column 'role' in your users table
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { user, error } = await signup(
      signupData.email,
      signupData.password,
      signupData.role,
      signupData.first_name,
      signupData.last_name,
      signupData.phone_number
    );

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(
        "Signup successful! Please check your email to confirm your account."
      );
    }
    setLoading(false);
  };

  return (
    <div className="main">
      <div className="header">
        <h2>Sign Up</h2>
      </div>
      {message && <div>{message}</div>}
      <div className="form">
        <form className="signupForm" onSubmit={handleSignUp}>
          <label className="label" htmlFor="first_name">
            First Name:
          </label>
          <input
            className="input"
            type="text"
            name="first_name"
            placeholder="First Name"
            value={signupData.first_name}
            onChange={handleInputChange}
            required
          />

          <label className="label" htmlFor="last_name">
            Last Name:
          </label>
          <input
            className="input"
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={signupData.last_name}
            onChange={handleInputChange}
            required
          />

          <label className="label" htmlFor="phone_number">
            Phone Number:
          </label>
          <input
            className="input"
            type="text"
            name="phone_number"
            placeholder="Phone"
            value={signupData.phone_number}
            onChange={handleInputChange}
            required
          />

          <label className="label" htmlFor="email">
            Email:
          </label>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            value={signupData.email}
            onChange={handleInputChange}
            required
          />

          <label className="label" htmlFor="password">
            Password:
          </label>
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={signupData.password}
            onChange={handleInputChange}
            required
          />
          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
