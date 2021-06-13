const db = require('../../db');

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
            const product = await db.query(
                `INSERT INTO products
                (
                    shop_id,
                    product_name,
                    price,
                    description,
                    stock
                )
                VALUES ($1, $2, $3, $4, $5) RETURNING product_id`,
                [
                    req.user,
                    productName,
                    Number(price),
                    description,
                    stock
                ]
            )

            for(let i in newImages){
                await db.query(
                    `INSERT INTO productImages
                    (
                        product_id,
                        image_link
                    )
                    VALUES (
                        $1, $2
                    )`, [product.rows[0].product_id,newImages[i]]
                )
            }

            await db.query(
                `INSERT INTO productCategory
                (
                    product_id,
                    category_id
                )
                VALUES (
                    $1, $2
                )`, [product.rows[0].product_id, category]
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
            WHERE shop_id = $1 
            GROUP BY shop_id `,
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
            AND shop_id = $1`,
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
            `SELECT *, 
                (SELECT image_link from productImages WHERE product_id = products.product_id LIMIT 1) as image 
            FROM products 
            WHERE shop_id = $1 
            ORDER BY date DESC`,
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
            `DELETE FROM products WHERE shop_id = $1 AND product_id = $2`,
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
            `SELECT * from products WHERE shop_id = $1 AND product_id = $2`,
            [req.user, product_id]
        );
        const images = await db.query(
            `SELECT * from productImages WHERE product_id = $1`,
            [product_id]
        );
        const category = await db.query(
            `SELECT category_id from productCategory WHERE product_id = $1`,
            [product_id]
        );
        if(products.rowCount === 0){
            res.status(404).send(false)

        }else{
            res.send({
                ...products.rows[0],
                images : images.rows,
                category : category.rows[0].category_id || null
            });
        }
        
        
    } catch (error) {
        console.log(error);
        res.status(404).send('product not found')
        
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

        console.log(newImages);
        await db.query(
            `UPDATE products
            SET product_name = $1,
                price = $2,
                description = $3,
                stock = $4
            WHERE product_id = $5
            AND shop_id = $6`,
            [
                productName,
                price,
                description,
                stock,
                product_id,
                req.user
            ]
        );

        await db.query(
            `DELETE FROM productImages
            WHERE product_id = $1`,
            [product_id]
        )

        await db.query(
            `DELETE FROM productCategory
            WHERE product_id = $1`,
            [product_id]
        )

        for(let i in newImages){
            await db.query(
                `INSERT INTO productImages
                (
                    product_id,
                    image_link
                )
                VALUES (
                    $1, $2
                )`, [product_id,newImages[i]]
            )
        }

        await db.query(
            `INSERT INTO productCategory
            (
                product_id,
                category_id
            )
            VALUES (
                $1, $2
            )`, [product_id, category]
        )
        
        res.send(true);
    } catch (error) {
        console.log(error);
    }
}

const registerShop = async(req, res) => {
    try {
        const {shop_name, email} = req.body;
        await db.query(
            `INSERT INTO shops
            (
                shop_name,
                email,
                user_id
            )
            VALUES (
                $1, $2, $3
            )`,
            [shop_name, email, req.user]

        )
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
    getSellerProducts_no,
    registerShop
}