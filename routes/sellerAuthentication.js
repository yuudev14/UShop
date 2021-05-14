const express = require('express');
const route = express.Router();
const sellerAuthentication = require('./cotrollers/sellerAuthenticationControllers');

route.post('/register',sellerAuthentication.register);

module.exports = route;