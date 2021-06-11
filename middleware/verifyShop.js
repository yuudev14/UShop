const db = require('../db');

module.exports = async(req, res, next) => {
    try {
        const hasShop = await db.query(
            `SELECT shop_id FROM shops WHERE user_id = $1`,
            [req.user]
        )
        if(hasShop.rowCount === 1){
            req.user = hasShop.rows[0].shop_id;
            next()
        }else{
            res.status(401).send('no shop yet');
        }
    } catch (error) {
        console.log(error);
    }
}