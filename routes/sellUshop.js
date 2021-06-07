const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const sellUshop = require('./cotrollers/sellUshopController');
const route = express.Router();

route.post('/add-product', verifyToken, sellUshop.addProducts);
route.post('/modify-product/:product_id', verifyToken, sellUshop.modifyProduct);
route.delete('/delete-product/:product_id', verifyToken, sellUshop.deleteProduct);
route.get('/getProduct/:product_id', verifyToken, sellUshop.productInfo);
route.get('/view-product', verifyToken, sellUshop.getProducts);
route.get('/total-products', verifyToken, sellUshop.getSellerProducts_no);
route.post('/filter-products', verifyToken, sellUshop.filterProducts);



module.exports = route;