const  express = require('express');
const route = express.Router();
const verifyToken = require('../middleware/verifyToken');
const profile = require('./cotrollers/profileController');

route.get('/popular-follow-products/:start', verifyToken, profile.getPopularUserFollowProducts);
route.get('/latest-follow-products/:start', verifyToken, profile.getLatestUserFollowProducts);
route.get('/top-sales-follow-products/:start', verifyToken, profile.getTopSalesUserFollowProducts);
route.get('/followed-shops', verifyToken, profile.followedShops);

module.exports = route;