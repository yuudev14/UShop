const express = require('express');
const route = express.Router();
const authentication = require('./cotrollers/authenticationControllers');
const verifyToken = require('../middleware/verifyToken');


route.post('/register',authentication.register);
route.post('/login',authentication.login);
route.post('/verify-token', verifyToken, authentication.verifyAccount);

module.exports = route;