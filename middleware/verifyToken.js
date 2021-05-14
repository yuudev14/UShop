const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.headers.token;
    if(token){
        try {
            const payload = jwt.verify(token, process.env.jwtsecret);
            req.user = payload.user;
            next();
        } catch (error) {
            res.status(402).send('token unavailable')
        }
        
    }else{
        res.status(402).send('token is not available')
    }
    
}