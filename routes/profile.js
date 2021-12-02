const express = require("express");
const route = express.Router();
const verifyToken = require("../middleware/verifyToken");
const profile = require("./cotrollers/profileController");

route.get(
  "/popular-follow-products/:start",
  verifyToken,
  profile.getPopularUserFollowProducts
);
route.get(
  "/latest-follow-products/:start",
  verifyToken,
  profile.getLatestUserFollowProducts
);
route.get(
  "/top-sales-follow-products/:start",
  verifyToken,
  profile.getTopSalesUserFollowProducts
);
route.get("/followed-shops", verifyToken, profile.followedShops);
route.get("/all-followed-shops", verifyToken, profile.allFollowedShops);
route.get("/all-orders", verifyToken, profile.getOrders);
route.get("/to-ship-orders", verifyToken, profile.toShipOrders);

module.exports = route;
