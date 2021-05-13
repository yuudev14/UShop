const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.headers.token;
    if(token){
        const payload = jwt.verify(token, process.env.jwtsecret);
        req.user = payload.user;
    }
    
}