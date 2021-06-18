const express = require('express');
const route = express.Router();
const ushop = require('./cotrollers/ushopController');
const verifyToken = require('../middleware/verifyToken');

route.get('/most-popular-products', ushop.getMostPopularProducts);
route.get('/categories', ushop.getCategories);
route.get('/most-popular-categories', ushop.getPopularCategories);
route.get('/top-category-product', ushop.getTopCategoryProduct);
route.get('/get-products/:start', ushop.getUshopProducts);
route.get('/get-product-info/:product_id', ushop.getProductInfo);
route.post('/cart-product', ushop.getCartProduct);
route.post('/checkout', verifyToken, ushop.checkout);
module.exports = route;