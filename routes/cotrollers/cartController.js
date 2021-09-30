const db = require('../../db');

const addCart = async(req, res) => {
    try {
        const {product_id} = req.body;
        const doesExist = await db.query(
            `SELECT * FROM cart WHERE product_id = $1 AND user_id = $2`, [product_id, req.user]
        )
        if(!doesExist.rowCount){
            await db.query(
                `INSERT INTO cart (
                    product_id,
                    user_id
                ) VALUES (
                    $1, $2
                )`, [product_id, req.user]
            );
            
        }
        else{
            await db.query(
                `UPDATE cart
                SET items = cart.items + 1
                WHERE product_id = $1 AND user_id = $2
                `, [product_id, req.user]

            )
        }
        const product = await db.query(
            `SELECT products.product_id, product_name, price, stock, items, (
                SELECT image_link FROM product_images WHERE product_id = products.product_id LIMIT 1
            ) as image
            FROM products
            JOIN cart
            ON cart.product_id = products.product_id
            WHERE cart.user_id = $1
            `, [req.user]
        );
        res.send(product.rows);
        
        
    } catch (error) {
        console.log(error);
        
    }
}

const deleteCart = async(req, res) => {
    try {
        await db.query(
            `DELETE FROM cart
            WHERE product_id = $1
            AND user_id = $2`,
            [req.params.product_id, req.user]
        );

        const product = await db.query(
            `SELECT products.product_id, product_name, price, stock, items, (
                SELECT image_link FROM product_images WHERE product_id = products.product_id LIMIT 1
            ) as image
            FROM products
            JOIN cart
            ON cart.product_id = products.product_id
            WHERE cart.user_id = $1`, [req.user]
        );
        res.send(product.rows);
    } catch (error) {
        console.log(error);
        
    }
}

const viewCartProducts = async(req, res) => {
    try {
        const product = await db.query(
            `SELECT products.product_id, product_name, price, stock, items, (
                SELECT image_link FROM product_images WHERE product_id = products.product_id LIMIT 1
            ) as image
            FROM products
            JOIN cart
            ON cart.product_id = products.product_id
            WHERE cart.user_id = $1`, [req.user]
        );
        res.send(product.rows);
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports ={
    viewCartProducts,
    addCart,
    deleteCart
}