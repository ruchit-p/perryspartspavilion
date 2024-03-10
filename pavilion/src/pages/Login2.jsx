import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = login({
      email: email,
      password: password,
    })

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Login successful!");
      navigate("/"); // Use navigate instead of window.location.href for better user experience
    }

    setLoading(false);
  };


  return (
    <>
      <body className="d-flex align-items-center py-4 bg-body-tertiary ">
        <main className="form-signin mx-auto" style={{ width: "40%" }}>
          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <h1 className="h3 mb-3 fw-normal">Please log in</h1>

            <div className="form-floating mb-2">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating my-2">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <button
              className="btn btn-primary w-100 py-2 mx-auto"
              type="submit"
              disabled={loading}
            >
             {loading ? (
              <div className="d-flex align-items-center justify-content-center">
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              "Sign in"
            )}
            </button>
          </form>
        </main>
      </body>
    </>
  );
};

export default Login2;
