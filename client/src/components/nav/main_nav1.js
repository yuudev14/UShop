import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../reduxStore/actions/authAction";
import axios from "axios";

const MainNav1 = () => {
  const socialMedia = ["facebook", "twitter", "instagram"];

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAction());
  };
  const closeNav1 = () => {
    document.querySelector(".nav1").classList.remove("openNav1");
  };

  const [category, setCategory] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const category = await axios.get("/ushop/categories");
        setCategory(category.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="nav1">
      <ul>
        <p>follow us on:</p>
        {socialMedia.map((social) => (
          <li key={social}>
            <i className={`fa fa-${social}`}></i>
          </li>
        ))}
      </ul>
      <ul className="nav1-list-options">
        <Link to="/sell-UShop">
          <li>Sell on UShop</li>
        </Link>
        <li className="category">
          Categories
          <ul>
            {category.map((li) => (
              <Link to={`/category/${li.category_name}`} key={li.category_name}>
                <li>{li.category_name}</li>
              </Link>
            ))}
          </ul>
        </li>

        {auth.isAuth ? (
          <>
            <li onClick={logout}>log out</li>
            <Link to="/profile">
              <li>profile</li>
            </Link>
          </>
        ) : (
          <Link to="/auth">
            <li className="account_nav">log-in | sign-up</li>
          </Link>
        )}
      </ul>
      <i className="fa fa-close" onClick={closeNav1}></i>
    </div>
  );
};

export default MainNav1;
