import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/buyPage/followedShops.scss";

const FollowedShops = () => {
  const [followedShops, setFollowedShops] = useState([]);

  useEffect(() => {
    (async () => {
      const shops = await axios.get("/profile/all-followed-shops", {
        headers: { token: JSON.parse(localStorage.getItem("UShop")).token },
      });
      setFollowedShops(shops.data);
    })();
  }, []);
  return (
    <div className="followedShops">
      <h1>Followed Shops</h1>
      <div className="shopsLists">
        {followedShops.map((shop) => (
          <Link to={`/shop/${shop.shop_name}`} className="shop">
            <div className="shop_logo">
              <img src={shop.logo} alt="logo" />
            </div>
            <h2>{shop.shop_name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FollowedShops;
