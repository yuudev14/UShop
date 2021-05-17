const db = require('../../db');

const addProducts = async(req, res) => {
    try {
        const addProductQuery = await db.query(
            `INSERT INTO products
            (
                user_id,
                product_name,
                category,
                price,
                images,
                status,
                description
            )
            VALUES ($1, $2, $3 $4, $5, $6, $7) `,
            [
                req.user,
                ...Object.values(req.body)

            ]
        )

        res.send(true);
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {
    addProducts,
}