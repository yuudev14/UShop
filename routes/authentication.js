const express = require('express');
const route = express.Router();
const authentication = require('./cotrollers/authenticationControllers');
const verifyToken = require('../middleware/verifyToken');
const verifySeller = require('../middleware/verifyShop');


route.post('/register',authentication.register);
route.post('/login',authentication.login);
route.post('/verify-token', verifyToken, authentication.verifyAccount);
route.get('/has-shop', verifyToken, verifySeller, authentication.verifyAccount);

module.exports = route;