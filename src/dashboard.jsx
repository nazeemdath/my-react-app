import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import "./app.css"; // Add CSS file

const Dashboard = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Fetch menu items from the backend
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/menu/");
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="banner">
        <h1>Welcome to the Canteen Dashboard</h1>
        <p>Manage your orders, view the menu, and track your meals easily.</p>
      </div>

      {/* Display Menu Items */}
      <div className="menu-container">
        <h2>Today's Menu</h2>
        <div className="menu-grid">
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <div key={item.id} className="menu-card">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p><strong>₹{item.price}</strong></p>
              </div>
            ))
          ) : (
            <p>No menu items available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
