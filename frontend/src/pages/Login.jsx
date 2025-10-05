import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";


const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true); 
      setMessage("✅ Login successful!");
      navigate("/"); 
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Login failed"));
    }
  };

  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center">
      <div className="login-card p-4 shadow">
        <h2 className="text-center fw-bold mb-3 text-primary">Welcome Back 👋</h2>
        <p className="text-center text-muted mb-4">
          Login to continue exploring books
        </p>

        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>

        {message && (
          <div className="alert alert-info text-center mt-3 py-2" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
