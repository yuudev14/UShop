const express = require('express');
const route = express.Router();
const ushop = require('./cotrollers/ushopController');

route.get('/most-popular-products', ushop.getMostPopularProducts);
route.get('/most-popular-categories', ushop.getPopularCategories);
route.get('/top-category-product', ushop.getTopCategoryProduct);
route.get('/get-products/:start', ushop.getUshopProducts);
route.get('/get-product-info/:product_id', ushop.getProductInfo);

module.exports = route;