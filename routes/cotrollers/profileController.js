const db = require("../../db");
const getUserFollowProducts = async (req, res, column, start) => {
  try {
    const products = await db.query(
      `SELECT
                product_id, product_name, 
                (SELECT image_link from product_images WHERE product_id = products.product_id LIMIT 1) as images,
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
    );
    res.send(products.rows);
  } catch (error) {
    console.log(error);
  }
};
const getPopularUserFollowProducts = (req, res) => {
  getUserFollowProducts(req, res, "rating", req.params.start);
};
const getLatestUserFollowProducts = (req, res) => {
  getUserFollowProducts(req, res, "date", req.params.start);
};
const getTopSalesUserFollowProducts = (req, res) => {
  getUserFollowProducts(req, res, "sold", req.params.start);
};

const followedShops = async (req, res) => {
  try {
    const shops = await db.query(
      `SELECT logo, shop_name 
            FROM shops
            JOIN follow
            ON shops.shop_id = follow.shop_id
            WHERE follow.user_id = $1
            LIMIT 10`,
      [req.user]
    );

    res.send(shops.rows);
  } catch (error) {
    console.log(error);
  }
};

const allFollowedShops = async (req, res) => {
  try {
    const shops = await db.query(
      `SELECT logo, shop_name 
            FROM shops
            JOIN follow
            ON shops.shop_id = follow.shop_id
            WHERE follow.user_id = $1`,
      [req.user]
    );

    res.send(shops.rows);
  } catch (error) {
    console.log(error);
  }
};

const getOrders = async (req, res) => {
  try {
    let order_number = await db.query(
      `SELECT order_number, date
            FROM orders WHERE user_id = $1
            ORDER BY date DESC`,
      [req.user]
    );

    let orders = order_number.rows;

    order_number.rows.forEach(async (order, i) => {
      try {
        const products = await db.query(
          `SELECT order_details.product_id,
                            product_name,
                            price,
                            item,
                            (SELECT image_link from product_images WHERE product_id = products.product_id LIMIT 1) as images,
                            (SELECT shop_name from shops WHERE shop_id = products.shop_id) as shop_name
                    FROM order_details
                    JOIN products
                    ON products.product_id = order_details.product_id
                    WHERE order_number = $1`,
          [order.order_number]
        );

        orders[i].productOrders = products.rows;
        if (i === orders.length - 1) {
          res.send(orders);
        }
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const toShipOrders = async (req, res) => {
  try {
    let order_number = await db.query(
      `SELECT order_number, date
            FROM orders WHERE user_id = $1
            ORDER BY date DESC`,
      [req.user]
    );

    let orders = order_number.rows;

    order_number.rows.forEach(async (order, i) => {
      try {
        const products = await db.query(
          `SELECT order_details.product_id,
                            product_name,
                            price,
                            item,
                            (SELECT image_link from product_images WHERE product_id = products.product_id LIMIT 1) as images,
                            (SELECT shop_name from shops WHERE shop_id = products.shop_id) as shop_name
                    FROM order_details
                    JOIN products
                    ON products.product_id = order_details.product_id
                    WHERE order_number = $1
                    AND (SELECT COUNT(*) FROM order_details
                    WHERE order_number = $1
                    AND status = 'PENDING') > 0`,
          [order.order_number]
        );

        orders[i].productOrders = products.rows;
        if (i === orders.length - 1) {
          res.send(orders);
        }
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getPopularUserFollowProducts,
  getLatestUserFollowProducts,
  getTopSalesUserFollowProducts,
  followedShops,
  getOrders,
  toShipOrders,
  allFollowedShops,
};
