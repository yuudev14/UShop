const db = require('../../db');

const getMostPopularProducts = async(req, res) => {
    try {
        const popularProducts = await db.query(
            `SELECT product_id, product_name, 
                (SELECT image_link from productImages WHERE product_id = products.product_id LIMIT 1) as images  
            FROM products
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
            `SELECT product_id, product_name, 
                (SELECT image_link from productImages WHERE product_id = products.product_id LIMIT 1) as images  
            FROM products
            ORDER BY date DESC
            OFFSET $1 LIMIT 20 `,
            [req.params.start]
        )

        res.send(products.rows);
        
    } catch (error) {
        console.log(error);
        
    }
}

const getTopCategoryProduct = async(req, res) => {
    try {
        const product = await db.query(
            `SELECT 
                products.product_id, 
                products.product_name, 
                (SELECT image_link from productImages WHERE product_id = products.product_id LIMIT 1) as images   
            FROM productCategory
            JOIN products ON products.product_id = productCategory.product_id
            WHERE category_id = (
                SELECT category.category_id FROM (
                    SELECT productCategory.category_id, category_name, productCategory.product_id FROM productCategory 
                    JOIN category ON category.category_id = productCategory.category_id
                ) as category
                GROUP BY category.category_id
                ORDER BY COUNT(*) DESC
                LIMIT 1
            ) 
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
            `SELECT category.category_name, COUNT(*) as products FROM (
                SELECT productCategory.category_id, category_name FROM productCategory 
                JOIN category ON category.category_id = productCategory.category_id
            ) as category
            GROUP BY category.category_name
            ORDER BY products DESC
            LIMIT 9`
        );
        res.send(categories.rows);
        
    } catch (error) {
        console.log(error);
        
    }
}

const getCartProduct = async(req, res) => {
    try {
        const {cart} = req.body;

        const numExecute = (arr) => {
            let str  = '';
            for(let x in arr){
                str += `$${Number(x)+1},`
            }

            return str.slice(0, -1);
        }
        if(cart.length){
            const products = await db.query(
                `SELECT product_id, product_name, price, stock, (
                    SELECT image_link FROM productImages WHERE product_id = products.product_id LIMIT 1
                ) as image
                FROM products WHERE product_id IN (${numExecute(cart)})`,
                cart
            )
    
            res.send(products.rows);

        }else{
            res.send([]);
        }

        
        
        
    } catch (error) {
        console.log(error);
        console.log(1)
        
    }
}

const getProductInfo = async(req, res) => {
    try {
        const product_id = req.params.product_id;
        const products = await db.query(
            `SELECT * from products 
            JOIN shops
            ON products.shop_id = shops.shop_id
            WHERE product_id = $1`,
            [product_id]
        );
        if(products.rowCount === 0){
            res.status(404).send(false)

        }else{

            const images = await db.query(
                `SELECT image_link from productImages WHERE product_id = $1`,
                [product_id]
            )
            res.send({...products.rows[0], images : images.rows});
        }
        
        
    } catch (error) {
        console.log(error);
        res.status(404).send('product not found')
        
    }
}

const getCategories = async(req, res) => {
    try {
        const categories = await db.query(
            `SELECT * FROM category`
        )
        res.send(categories.rows);
        
    } catch (error) {
        console.log(error);
        
    }
}

const checkout = async(req, res) => {
    try {
        const buyItems  = req.body;
        const ordernumber = await db.query(
            `INSERT into orders
            (
                user_id
            ) VALUES (
                $1
            ) RETURNING order_number`, [req.user]
        )

        buyItems.forEach(async(prod, i) => {
            try {
                await db.query(
                    `UPDATE products
                    SET sold = products.sold + 1,
                        stock = products.stock - $1
                    WHERE product_id = $2`,
                    [prod.item, prod.product_id],
                )
                await db.query(
                    `INSERT INTO orderDetails (
                        order_number,
                        product_id,
                        item
                    ) VALUES (
                        $1, $2,$3
                    )`, [ordernumber.rows[0].order_number, prod.product_id, Number(prod.item)]
                )
                if(i === buyItems.length - 1){
                    res.send(true);
                }
                
            } catch (error) {
                console.log(error);
                
                if(error.constraint === 'check_stock'){
                    const product = buyItems.filter(prod => error.detail.includes(prod.product_id))[0]
                    res.status(400).send(`${product.product_name} items exceeds product's stocks`)
                }
                
            }
            

        });
        
    } catch (error) {
        console.log(error);
        
    }
        
}

module.exports = {
    getMostPopularProducts,
    getPopularCategories,
    getTopCategoryProduct,
    getUshopProducts,
    getProductInfo,
    getCategories,
    getCartProduct,
    checkout
}