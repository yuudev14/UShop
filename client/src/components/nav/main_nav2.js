import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartProductAction } from "../../reduxStore/actions/cartAction";
import axios from "axios";

const MainNav2 = () => {
  const openNav1 = () => {
    document.querySelector(".nav1").classList.add("openNav1");
  };

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState({
    products: [],
    shops: [],
  });

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartProductAction());
  }, [dispatch]);

  useEffect(() => {
    if (searchInput !== "") {
      (async () => {
        try {
          const search = await axios.post("/ushop/search", {
            search: searchInput,
          });
          setSearchResults(search.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [searchInput]);

  return (
    <div className="nav2">
      <i className="menu-icon" onClick={openNav1}>
        ☰
      </i>
      <Link to="/">
        <h1>UShop</h1>
      </Link>
      <div className="search">
        <form>
          <label>
            <input
              type="search"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <i className="fa fa-search"></i>
          </label>
        </form>
        <div className={`searchResults ${searchInput !== "" && "showSearch"}`}>
          {searchResults.products.length ? (
            <div className="productsSearch">
              <h2>Products</h2>
              {searchResults.products.map((prod) => (
                <Link
                  to={`/product/${prod.product_id}`}
                  onClick={() => setSearchInput("")}>
                  <img src={prod.images} />
                  <div className="info">
                    <h4>{prod.product_name}</h4>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}

          {searchResults.shops.length ? (
            <div className="shopsSearch">
              <h2>Shops</h2>
              {searchResults.shops.map((shop) => (
                <Link
                  to={`/shop/${shop.shop_name}`}
                  onClick={() => setSearchInput("")}>
                  <img src={shop.logo} />
                  <div className="info">
                    <h4>{shop.shop_name}</h4>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <Link to="/cart" className="cartIcon">
        <i class="fa fa-shopping-cart"></i>
        <p>{cart.length > 0 ? cart.length : null}</p>
      </Link>
    </div>
  );
};

export default MainNav2;
