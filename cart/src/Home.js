import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";

export default function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const renderContent = () => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    renderContent();
  }, []);

  const buy = (item) => {
    navigate(`/buy/${item.id}`);
  };

  return (
    <div className="App">
      <div className="product-list">
        {data.length > 0 &&
          data.map((item, index) => (
            <div className="product-card" key={item.id}>
              <img src={item.image} alt={item.title} />
              <h2>{item.title}</h2>
              <p className="price">${item.price}</p>
              <button onClick={() => buy(item)}>Buy</button>
            </div>
          ))}
      </div>
    </div>
  );
}
