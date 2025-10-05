import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      setMessage("✅ " + res.data.message);
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Signup failed"));
    }
  };

  return (
    <div className="signup-wrapper d-flex justify-content-center align-items-center">
      <div className="signup-card p-4 shadow">
        <h2 className="text-center fw-bold mb-3 text-primary">Create Account ✨</h2>
        <p className="text-center text-muted mb-4">
          Join the BookReview community today!
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="name">Full Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2">
            Sign Up
          </button>
        </form>

        {message && (
          <div className="alert alert-info text-center mt-3 py-2" role="alert">
            {message}
          </div>
        )}

        <p className="text-center mt-3 small text-muted">
          Already have an account? <a href="/login" className="text-primary">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
