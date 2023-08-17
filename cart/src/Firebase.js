import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Firebase.css";

const Firebase = () => {
  const [orderedData, setOrderedData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    handleOrdered();
  }, []);

  const handleOrdered = () => {
    axios
      .get("https://filtercard-72939-default-rtdb.firebaseio.com/order.json")
      .then((res) => {
        let orders = Object.values(res.data);
        console.log(orders);
        setOrderedData(orders);
      })
      .catch((error) => {
        console.error("Error fetching ordered data:", error);
      });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredData =
    selectedCategory === "All"
      ? orderedData
      : orderedData.filter((item) => item.category === selectedCategory);

  const TotalAmout = () => {
    let totalAmount = 0;
    totalAmount = filteredData.reduce((acc, item) => {
      return acc + item.price;
    }, totalAmount);

    return totalAmount;
  };

  return (
    <div>
      <div className="dropdown-container">
        <select
          className="dropdown-select"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="All">All</option>
          <option value="electronics">Electronics</option>
          <option value="men's clothing">Men's Clothings</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelery">jewelery</option>
          {/* <option value="grocery">grocery</option> */}
        </select>
      </div>

      <div className="product-list">
        {filteredData.length > 0 &&
          filteredData.map((item, index) => (
            <div className="product-card" key={index}>
              <img src={item.image} alt={item.title} />
              <h2>{item.title}</h2>
              <h2>order Id:{item.orderId}</h2>
              <h2>Date :{item.date}</h2>
              <p className="price">${item.price}</p>
            </div>
          ))}
      </div>
      <div className="Total">
        <p className="price">
          Total Amount Spent on {selectedCategory} Items <span className="total-span">${TotalAmout()}</span>
        </p>
      </div>
    </div>
  );
};

export default Firebase;
