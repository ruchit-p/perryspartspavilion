// src/pages/LoginPage.jsx

import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // Make sure this path matches your setup

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      // Navigate to another page or update the state based on successful login
      setMessage("Login successful!");
      // Redirect to home page or dashboard as needed
      window.location.href = "/"; // or "/home" depending on your setup
      
    }

    setLoading(false);
  };

  return (
    <div className="main">
      <div className="header">
        <h2>Login</h2>
      </div>
      {message && <div>{message}</div>}
      <div className="form">
        <form className="loginForm" onSubmit={handleLogin}>
            <label className="label" htmlFor="email">
              Email:
            </label>
            <input
              className="input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />


            <label className="label" htmlFor="password">
              Password:
            </label>
            <input
              className="input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
