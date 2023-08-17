import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "./Buy.css";

const Buy = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [ordered, setOrdered] = useState(false);
  const [orderId, setOrderId] = useState(0);

  const getCurrentBuy = () => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  };

  useEffect(() => {
    getCurrentBuy();
  });

  const buy = () => {
    const newOrderedProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      date: new Date().toLocaleDateString(),
      orderId: orderId,
      orderedPerson: "loki",
    };

    axios
      .post(
        "https://filtercard-72939-default-rtdb.firebaseio.com/order.json",
        newOrderedProduct
      )
      .then((response) => {
        console.log(response);
        setOrdered(false);
      });
  };

  const showBuyPop = () => {
    generateOrderID();
    setOrdered(true);
  };

  const generateOrderID = () => {
    let randomId = Math.floor(Math.random() * 999999);
    setOrderId(randomId);
  };

  return (
    <div className="buy-container">
      {product ? (
        <div className="product-details">
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "50%", height: "auto", marginBottom: "10px" }}
          />
          <h1 className="product-title">{product.title}</h1>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>
          <button onClick={() => showBuyPop()}>Buy</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {ordered && (
        <div className="overlay">
          <div className="pop">
            <div className="pop-inner">
              <div>
                <img
                  src={product.image}
                  style={{ width: "10vw", height: "10vh" }}
                  alt={product.title}
                />
                <h1 className="product-title">{product.title}</h1>
                <p className="product-price">${product.price}</p>
              </div>
              <p>Order Id: {orderId}</p>
              <button onClick={() => buy(orderId)}>Confirm order</button>
              <button onClick={() => setOrdered(false)}>Cancel order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buy;
