import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "./api";  // Import API function

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();  // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Both fields are required!");
      return;
    }
    
    try {
      const response = await loginUser({ username, password }); // Call API
      localStorage.setItem("accessToken", response.access);  // Store token
      localStorage.setItem("refreshToken", response.refresh);
      
      alert("Login Successful!");
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (error) {
      setError(error.response?.data?.detail || "Login failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <span className="toggle-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </span>
    </div>
  );
}

export default Login;
