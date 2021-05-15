const express = require('express');
const route = express.Router();
const sellerAuthentication = require('./cotrollers/sellerAuthenticationControllers');
const verifyToken = require('../middleware/verifyToken');


route.post('/register',sellerAuthentication.register);
route.post('/login',sellerAuthentication.login);
route.post('/verify-seller', verifyToken, sellerAuthentication.verifySeller);

module.exports = route;