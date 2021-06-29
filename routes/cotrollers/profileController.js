const db = require('../../db');
const getUserFollowProducts = async(req, res, column, start) => {
    try {
        const products = await db.query(
            `SELECT
                product_id, product_name, 
                (SELECT image_link from productImages WHERE product_id = products.product_id LIMIT 1) as images,
                sold,
                price
            FROM products 
            JOIN follow 
            ON follow.shop_id = products.shop_id
            WHERE user_id = $1
            ORDER BY ${column} DESC
            OFFSET $2 LIMIT 10 
            `,
            [req.user, start]
        )
        res.send(products.rows);
        
    } catch (error) {
        console.log(error);
        
    }
}
const getPopularUserFollowProducts = (req, res) => {
    getUserFollowProducts(req, res, 'rating', req.params.start)
}
const getLatestUserFollowProducts = (req, res) => {
    getUserFollowProducts(req, res, 'date', req.params.start)
}
const getTopSalesUserFollowProducts = (req, res) => {
    getUserFollowProducts(req, res, 'sold', req.params.start)
}


const followedShops = async(req, res) => {
    try {
        const shops = await db.query(
            `SELECT logo, shop_name 
            FROM shops
            JOIN follow
            ON shops.shop_id = follow.shop_id
            WHERE follow.user_id = $1`, [req.user]
        );

        res.send(shops.rows);
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports = {
    getPopularUserFollowProducts,
    getLatestUserFollowProducts,
    getTopSalesUserFollowProducts,
    followedShops
}