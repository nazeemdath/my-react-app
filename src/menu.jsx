import React, { useEffect, useState } from "react";
import axios from "axios";
import "./menu.css"; // Add styling

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
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
    <div className="menu-container">
      <h1>Menu</h1>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-card">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
