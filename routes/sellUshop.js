const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const verifySeller = require("../middleware/verifyShop");
const sellUshop = require("./cotrollers/sellUshopController");
const route = express.Router();

route.post("/register-shop", verifyToken, sellUshop.registerShop);
route.get("/todo-data", verifyToken, verifySeller, sellUshop.homeTodoInfos);
route.post("/add-product", verifyToken, verifySeller, sellUshop.addProducts);
route.post(
  "/modify-product/:product_id",
  verifyToken,
  verifySeller,
  sellUshop.modifyProduct
);
route.delete(
  "/delete-product/:product_id",
  verifyToken,
  verifySeller,
  sellUshop.deleteProduct
);
route.get(
  "/getProduct/:product_id",
  verifyToken,
  verifySeller,
  sellUshop.productInfo
);
route.get("/view-product", verifyToken, verifySeller, sellUshop.getProducts);
route.get(
  "/total-products",
  verifyToken,
  verifySeller,
  sellUshop.getSellerProducts_no
);
route.get(
  "/pending-orders",
  verifyToken,
  verifySeller,
  sellUshop.pendingOrders
);
route.get("/all-orders", verifyToken, verifySeller, sellUshop.allOrders);
route.get(
  "/out-of-stock-products",
  verifyToken,
  verifySeller,
  sellUshop.getEmptyProducts
);
route.get(
  "/business-insights",
  verifyToken,
  verifySeller,
  sellUshop.businessInsights
);
route.post(
  "/filter-products",
  verifyToken,
  verifySeller,
  sellUshop.filterProducts
);

module.exports = route;
