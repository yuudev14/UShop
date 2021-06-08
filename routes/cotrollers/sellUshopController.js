const db = require('../../db');
const cloudinary = require('../../utils/cloudinarySetup');

const addProducts = async(req, res) => {
        let {
            productName,
            category,
            price,
            newImages,
            description,
            stock
        } = req.body;
        try {
            const addProductQuery = await db.query(
                `INSERT INTO products
                (
                    user_id,
                    product_name,
                    category,
                    price,
                    images,
                    description,
                    stock
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7) `,
                [
                    req.user,
                    productName,
                    category,
                    Number(price),
                    newImages,
                    description,
                    stock
                ]
            )
            res.send(true);
        }catch (error) {
            console.log(error);
            
        }       
}

const getSellerProducts_no = async(req, res) => {
    try {
        const number = await db.query(
            `SELECT COUNT(*) as totalProd FROM products 
            WHERE user_id = $1 
            GROUP BY user_id `,
            [req.user]
        );

        res.send(number.rows[0].totalprod)
        
    } catch (error) {
        cpnsole.log(error)
        
    }
}

const filterProducts = async(req, res) => {
    try {
        const {
            productName,
            category,
            minStock,
            maxStock,
            minPrice,
            maxPrice
        } = req.body;
        const products = await db.query(
            `SELECT * from products 
            WHERE product_name ILIKE '%${productName}%'
            AND category ILIKE '%${category}%'
            AND price BETWEEN ${minPrice} AND ${maxPrice} 
            AND stock BETWEEN ${minStock} AND ${maxStock}
            AND user_id = $1`,
            [
                req.user
            ]
        )

        res.send(products.rows)
        
    } catch (error) {
        console.log(error)
        
    }
}

const getProducts = async(req, res) => {
    try {
        const products = await db.query(
            `SELECT * from products WHERE user_id = $1 ORDER BY date DESC`,
            [req.user]
        );
        res.send(products.rows);
        
    } catch (error) {
        console.log(error)
        
    }
}

const deleteProduct = async(req,res) => {
    try {
        const product_id = req.params.product_id;
        await db.query(
            `DELETE FROM products WHERE user_id = $1 AND product_id = $2`,
            [req.user, product_id]
        );
        res.send(true)
    } catch (error) {
        console.log(error);
        
    }
}

const productInfo = async(req, res) => {
    try {
        const product_id = req.params.product_id;
        const products = await db.query(
            `SELECT * from products WHERE user_id = $1 AND product_id = $2`,
            [req.user, product_id]
        );
        if(products.rowCount === 0){
            res.status(404).send(false)

        }else{
            res.send(products.rows[0]);
        }
        
        
    } catch (error) {
        console.log(error)
        
    }
}

const modifyProduct = async(req, res) => {
    try {
        const product_id = req.params.product_id;
        const {
            productName,
            category,
            price,
            newImages,
            description,
            stock,
        } = req.body;
        await db.query(
            `UPDATE products
            SET product_name = $1,
                category = $2,
                price = $3,
                images = $4,
                description = $5,
                stock = $6
            WHERE product_id = $7
            AND user_id = $8`,
            [
                productName,
                category,
                price,
                newImages,
                description,
                stock,
                product_id,
                req.user
            ]
        );
        
        res.send(true);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addProducts,
    getProducts,
    deleteProduct,
    productInfo,
    modifyProduct,
    filterProducts,
    getSellerProducts_no
}