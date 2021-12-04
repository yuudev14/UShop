import React, { useEffect } from "react";
import "../styles/buyPage/profile.scss";
import OrdersProcess from "../components/buyerProfile/ordersProcess";
import HomeProductList from "../components/home/homeProductList";
import { useDispatch } from "react-redux";
import {
  getUsersFollowProductsAction,
  resetProductListAction,
} from "../reduxStore/actions/ushopAction";
import FollowedShops from "../components/buyerProfile/followedShops";

const BuyerProfile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersFollowProductsAction("popular"));
    return () => {
      dispatch(resetProductListAction());
    };
  }, [dispatch]);
  return (
    <div className="buyerProfile">
      <OrdersProcess />

      <FollowedShops />
      <HomeProductList />
    </div>
  );
};

export default BuyerProfile;
