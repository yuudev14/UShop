import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import VerifiedSellUShop from "../components/verifiedSellUShop";
import SellerNav from "./nav/seller_nav";

const WithSellerNav = () => {
  return (
    <Router>
      <SellerNav />
      <Switch>
        <Route path="/sell-UShop" component={VerifiedSellUShop} />
      </Switch>
    </Router>
  );
};

export default WithSellerNav;
