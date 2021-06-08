const express = require('express');
const route = express.Router();
const ushop = require('./cotrollers/ushopController');

route.get('/most-popular-products', ushop.getMostPopularProducts);
route.get('/most-popular-categories', ushop.getPopularCategories);
route.get('/top-category-product', ushop.getTopCategoryProduct);
route.get('/get-products', ushop.getUshopProducts);

module.exports = route;