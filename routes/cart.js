const express = require("express");

const route = express.Router();
const verifyToken = require("../middleware/verifyToken");
const cart = require("../routes/cotrollers/cartController");

route.post("/add-cart", verifyToken, cart.addCart);
route.get("/get-cart", verifyToken, cart.viewCartProducts);
route.delete("/delete-cart/:product_id", verifyToken, cart.deleteCart);

module.exports = route;
