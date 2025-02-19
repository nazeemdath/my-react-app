// Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { registerUser } from "./api"; // Import register API

function Register() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student", // Default role (update based on your needs)
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.username || !formData.email || !formData.password || !formData.role) {
      setError("All fields are required!");
      return;
    }

    try {
      await registerUser(formData);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        
        {/* Role Selection Dropdown */}
        <select name="role" value={formData.role}  onChange={handleChange} required>
        <option value="" disabled>select role</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Register</button>
      </form>
      <span className="toggle-link">
        Already have an account? <Link to="/login">Login here</Link>
      </span>
    </div>
  );
}

export default Register;
