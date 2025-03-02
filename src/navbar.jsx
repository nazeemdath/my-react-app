// Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "./api";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const sample = true

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
   <nav className="navbar">
  <div className="navbar-logo">
    <h2>Canteen</h2>
  </div>
  <div className="navbar-menu">
    <ul className="navbar-links">
      <li><Link to="/dashboard">Dashboard</Link></li> 
      {sample && <li><Link to="/orders">Orders</Link></li>}
      {sample && <li><Link to="/track">Track</Link></li>}
    
    </ul>
    <button className="logout-button" onClick={handleLogout}>Logout</button>
  </div>
</nav>

  );
};

export default Navbar;
