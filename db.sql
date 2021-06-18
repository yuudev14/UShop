CREATE DATABASE UShop;


CREATE EXTENSION "uuid-ossp";

CREATE TABLE account
(
    user_id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    password VARCHAR(100) NOT NULL,
    CONSTRAINT unique_email UNIQUE (email),
    CONSTRAINT password_length CHECK (length(password) > 7)
);

CREATE TABLE category (
    category_id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

INSERT INTO category (
    category_name
) VALUES (
    'Appliances'
);

INSERT INTO category (
    category_name
) VALUES (
    'Games'
);

CREATE TABLE shops (
    shop_id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES account(user_id),
    email VARCHAR(100) NOT NULL,
    shop_name VARCHAR(100),
    CONSTRAINT unique_shopname UNIQUE (shop_name),
    CONSTRAINT unique_seller UNIQUE (user_id),
    CONSTRAINT unique_shop_email UNIQUE (email)
);


CREATE TABLE products (
    product_id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    shop_id uuid NOT NULL REFERENCES shops(shop_id),
    product_name VARCHAR(200) NOT NULL,
    price FLOAT NOT NULL,
    description TEXT,
    stock INTEGER DEFAULT 0,
    heart INTEGER DEFAULT 0, 
    seen INTEGER DEFAULT 0,
    sold INTEGER DEFAULT 0,
    date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_stock CHECK(stock >= 0)
);

CREATE TABLE productCategory (
    product_id uuid NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    category_id uuid REFERENCES category(category_id) NOT NULL 
);

CREATE TABLE productImages (
    product_id uuid NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    image_link VARCHAR(200) NOT NULL
);

CREATE TABLE orders (
    order_number uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES account(user_id),
    date timestamp with time zone
);

CREATE TABLE orderDetails (
    order_number uuid REFERENCES orders(order_number),
    product_id uuid NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    status VARCHAR(15) NOT NULL DEFAULT 'PENDING',
    item INTEGER NOT NULL

);