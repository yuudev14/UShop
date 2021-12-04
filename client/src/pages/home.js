import React, { useEffect } from "react";
import HomeProductList from "../components/home/homeProductList";
import MostPopular from "../components/home/mostPopular";
import PopularCategory from "../components/home/popularCategory";
import TopCategory from "../components/home/topCategory";
import "../styles/buyPage/home.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUshopProductListAction } from "../reduxStore/actions/ushopAction";
import { resetProductListAction } from "../reduxStore/actions/ushopAction";

const Home = () => {
  const productLists = useSelector((state) => state.ushopProductLists);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUshopProductListAction(productLists.length, "popular"));
    return () => {
      dispatch(resetProductListAction());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home">
      <MostPopular />
      <PopularCategory />
      <TopCategory />
      <h1>For You</h1>
      <HomeProductList />
    </div>
  );
};

export default Home;
