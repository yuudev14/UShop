import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import {
  getCategoryProductsAction,
  getShopProductsAction,
  getUsersFollowProductsAction,
  getUshopProductListAction,
  seeMoreCategoryProductsAction,
  seeMoreShopProductsAction,
  seeMoreUsersFollowProductsAction,
  seeMoreUshopProductListAction,
} from "../../reduxStore/actions/ushopAction";

const HomeProductList = () => {
  const [filterState, setFilterState] = useState("popular");
  const filterList = useRef();
  const { shop_name, category } = useParams();
  const [currentCategory, setCurrentCategory] = useState(category);
  const location = useLocation();

  const productLists = useSelector((state) => state.ushopProductLists);
  const dispatch = useDispatch();

  const seeMoreProducts = () => {
    if (shop_name) {
      dispatch(
        seeMoreShopProductsAction(filterState, shop_name, productLists.length)
      );
    } else if (category) {
      dispatch(
        seeMoreCategoryProductsAction(
          filterState,
          currentCategory,
          productLists.length
        )
      );
    } else if (location.pathname === "/profile") {
      dispatch(
        seeMoreUsersFollowProductsAction(filterState, productLists.length)
      );
    } else {
      dispatch(seeMoreUshopProductListAction(productLists.length, filterState));
    }
  };

  const setFilterStateMethod = (e) => {
    if (e.target.id !== filterState) {
      setFilterState(e.target.id);
    }
  };

  useEffect(() => {
    setCurrentCategory(category);
  }, [category]);

  useEffect(() => {
    setFilterState("popular");
    dispatch(getCategoryProductsAction("popular", currentCategory));
  }, [currentCategory, dispatch]);

  useEffect(() => {
    if (shop_name) {
      dispatch(getShopProductsAction(filterState, shop_name));
    } else if (category) {
      dispatch(getCategoryProductsAction(filterState, currentCategory));
    } else if (location.pathname === "/profile") {
      dispatch(getUsersFollowProductsAction(filterState));
    } else {
      dispatch(getUshopProductListAction(productLists.length, filterState));
    }
    [...filterList.current.children].forEach((li) => {
      if (li.id === filterState) {
        li.classList.add("active");
      } else {
        li.classList.remove("active");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterState]);

  return (
    <div className="forYou">
      <div className="filter">
        <h4>Sort by</h4>
        <ul ref={filterList}>
          <li onClick={setFilterStateMethod} className="active" id="popular">
            Popular
          </li>
          <li onClick={setFilterStateMethod} id="latest">
            Latest
          </li>
          <li onClick={setFilterStateMethod} id="top-sales">
            Top Sales
          </li>
        </ul>
      </div>

      <div className="productContainer">
        {productLists.map((prod) => (
          <Link className="product" to={`/product/${prod.product_id}`}>
            <div className="prev-img">
              <img src={prod.images} alt="product" />
            </div>
            <div className="productInfo">
              <h3>{prod.product_name}</h3>
              <div className="priceNstock">
                <p className="price">price: ¥{prod.price}</p>
                <p className="stock">Sold: {prod.sold}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <button onClick={seeMoreProducts}>see more</button>
    </div>
  );
};

export default HomeProductList;
