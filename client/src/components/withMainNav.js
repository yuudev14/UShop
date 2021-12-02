import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import BuyerProductDetails from "../pages/buyerProductDetails";
import BuyerProfile from "../pages/buyerProfile";
import Cart from "../pages/cart";
import Home from "../pages/home";
import RegisterShop from "../pages/registerShop";
import Shop from "../pages/shop";
import UshopAuth from "../pages/ushopAuth";
import MainNav from "./nav/main_nav";
import { connect, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import BuyerAllOrders from "../pages/buyerAllOrders";
import ToShip from "../pages/toShip";
import FollowedShops from "../pages/followedShops";
import CategoryProducts from "../pages/categoryProducts";

const WithMainNav = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <Router>
      <MainNav />
      <Switch>
        <Route path="/auth" component={UshopAuth} />
        <Route exact path="/" component={Home} />
        <Route path="/product/:product_id" component={BuyerProductDetails} />
        <Route path="/shop/:shop_name" component={Shop} />
        <Route path="/category/:category" component={CategoryProducts} />

        {auth.isAuth === true && (
          <>
            <Route path="/profile" component={BuyerProfile} />
            <Route path="/registerShop" component={RegisterShop} />
            <Route path="/orders" component={BuyerAllOrders} />
            <Route path="/to-ship-orders" component={ToShip} />
            <Route path="/cart" component={Cart} />
            <Route path="/followed-shops" component={FollowedShops} />
          </>
        )}
        {auth.isAuth === false && <Redirect to="/auth" />}
      </Switch>
    </Router>
  );
};

export default WithMainNav;
