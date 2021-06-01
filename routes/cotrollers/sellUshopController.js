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

module.exports = {
    addProducts,
}