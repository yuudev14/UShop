const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const verifySeller = require('../middleware/verifyShop');
const sellUshop = require('./cotrollers/sellUshopController');
const route = express.Router();

route.post('/register-shop', verifyToken, sellUshop.registerShop);
route.post('/add-product', verifyToken, verifySeller, sellUshop.addProducts);
route.post('/modify-product/:product_id', verifyToken,verifySeller, sellUshop.modifyProduct);
route.delete('/delete-product/:product_id', verifyToken,verifySeller, sellUshop.deleteProduct);
route.get('/getProduct/:product_id', verifyToken,verifySeller, sellUshop.productInfo);
route.get('/view-product', verifyToken, verifySeller,sellUshop.getProducts);
route.get('/total-products', verifyToken, verifySeller, sellUshop.getSellerProducts_no);
route.post('/filter-products', verifyToken,verifySeller, sellUshop.filterProducts);



module.exports = route;