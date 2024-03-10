import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Assuming the useAuth hook is correctly set up

const Signup2 = () => {
  const { signup } = useAuth(); // Using the signup function from AuthContext
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target; // using id to match the field id
    setSignupData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await signup(
      signupData.email,
      signupData.password,
      signupData.role,
      signupData.firstName,
      signupData.lastName,
      signupData.phone
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
    <div>
      <body className="d-flex align-items-center py-4 bg-body-tertiary ">
        <main className="form-signin mx-auto" style={{ width: "40%" }}>
          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
          <form onSubmit={handleSignup}>
            <h1 className="h3 mb-3 fw-normal">Sign Up</h1>

            {/* First Name */}
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="First Name"
                value={signupData.firstName}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="firstName">First Name</label>
            </div>

            {/* Last Name */}
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Last Name"
                value={signupData.lastName}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="lastName">Last Name</label>
            </div>

            {/* Phone Number */}
            <div className="form-floating mb-2">
              <input
                type="tel"
                className="form-control"
                id="phone"
                placeholder="Phone"
                value={signupData.phone}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="phone">Phone Number</label>
            </div>

            {/* Email */}
            <div className="form-floating mb-2">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={signupData.email}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="email">Email address</label>
            </div>

            {/* Password */}
            <div className="form-floating my-2">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="password">Password</label>
            </div>

            {/* Submit Button */}
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
                "Sign Up"
              )}
            </button>
          </form>
        </main>
      </body>
    </div>
  );
};

export default Signup2;
