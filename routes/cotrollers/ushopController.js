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

const getUshopProducts = async(req, res, column, start) => {
    try {
        const products = await db.query(
            `SELECT product_id, product_name, 
                (SELECT image_link from productImages WHERE product_id = products.product_id LIMIT 1) as images,
                sold,
                price
            FROM products
            ORDER BY ${column} DESC
            OFFSET $1 LIMIT 10 `,
            [start]
        )

        res.send(products.rows);
        
    } catch (error) {
        console.log(error);
        
    }
}

const getPopularUshopProducts = (req, res) => {
    getUshopProducts(req, res, 'rating', req.params.start)
}
const getLatestUshopProducts = (req, res) => {
    getUshopProducts(req, res, 'date', req.params.start)
}
const getTopSalesUshopProducts = (req, res) => {
    getUshopProducts(req, res, 'sold', req.params.start)
}

const getShopsProductList = async(req, res, column, start) => {
    try {
        const products = await db.query(
            `SELECT product_id, product_name, 
                (SELECT image_link from productImages WHERE product_id = products.product_id LIMIT 1) as images,
                sold,
                price
            FROM products
            JOIN shops
            ON shops.shop_id = products.shop_id
            WHERE shop_name = $2
            ORDER BY ${column} DESC
            OFFSET $1 LIMIT 10 
            `,
            [start, req.body.shop_name]
        )

        res.send(products.rows);
        
    } catch (error) {
        console.log(error);
        
    }
}

const getShopsPopularProductList = (req, res) => {
    getShopsProductList(req, res, 'rating', req.params.start)
}
const getShopsLatestProductList = (req, res) => {
    getShopsProductList(req, res, 'date', req.params.start)
}
const getShopsTopSalesProductList = (req, res) => {
    getShopsProductList(req, res, 'sold', req.params.start)
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
        const {buyItems}  = req.body;
        

        const buyItems_product_id = buyItems.map(prod => `'${prod.product_id}'`).join(',')

        const products = await db.query(
            `SELECT * FROM PRODUCTS WHERE product_id IN (${buyItems_product_id})`
        )

        const filterProd = (id) => {
            return products.rows.filter(prod => prod.product_id === id)[0];
        }
        const updatedBuyItems = buyItems.map(prod => {
                prod.stock = filterProd(prod.product_id).stock
            return prod
        });

        if(updatedBuyItems.every(prod => prod.stock >= prod.item)){
            const ordernumber = await db.query(
                `INSERT into orders
                (
                    user_id
                ) VALUES (
                    $1
                ) RETURNING order_number`, [req.user]
            )
            updatedBuyItems.forEach(async(prod, i) => {
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

                await db.query(
                    `DELETE FROM cart
                    WHERE product_id = $1
                    AND user_id = $2`,
                    [prod.product_id, req.user]
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
        }else{
            res.status(400).send('one of the items exceeds stock quantity')
        }  
    } catch (error) {
        console.log(error);
        
    }
        
}

module.exports = {
    getMostPopularProducts,
    getPopularCategories,
    getTopCategoryProduct,
    getPopularUshopProducts,
    getProductInfo,
    getCategories,
    checkout,
    getLatestUshopProducts,
    getTopSalesUshopProducts,
    getShopsPopularProductList,
    getShopsLatestProductList,
    getShopsTopSalesProductList
}