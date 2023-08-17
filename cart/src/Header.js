import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div
      className="header"
      style={{ backgroundColor: "lightBlue", height: "10vh" }}
    >
      <h1>ShopNow</h1>
      <div className="nav-tags">
        <ul>
          <li>
            <Link to="/"> Home</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
