const db = require('../../db');

const getMostPopularProducts = async(req, res) => {
    try {
        const popularProducts = await db.query(
            `SELECT product_id, product_name, images[1] FROM products
             ORDER BY sold LIMIT 10`
        )

        res.send(popularProducts.rows);
        
    } catch (error) {
        console.log(error);
        
    }
}

const getUshopProducts = async(req, res) => {
    try {
        const products = await db.query(
            `SELECT product_name, product_id, sold, price, images[1] FROM products ORDER BY date DESC`
        )

        res.send(products.rows);
        
    } catch (error) {
        console.log(error);
        
    }
}

const getTopCategoryProduct = async(req, res) => {
    try {
        const product = await db.query(
            `SELECT product_id, product_name, images[1], category FROM products 
            WHERE category = (SELECT category FROM products 
                              GROUP BY category 
                              ORDER BY COUNT(*) 
                              DESC LIMIT 1)
            ORDER BY sold`
        );

        res.send(product.rows);
        
    } catch (error) {
        console.log(error);
        
    }
}
const getPopularCategories = async(req, res) => {
    try {
        const categories = await db.query(
            `SELECT category, COUNT(*) as products FROM products
            GROUP BY category
            ORDER BY products DESC
            LIMIT 9`
        );
        res.send(categories.rows);
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {
    getMostPopularProducts,
    getPopularCategories,
    getTopCategoryProduct,
    getUshopProducts
}