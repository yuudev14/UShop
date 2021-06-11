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
    category_id uuid NOT NULL DEFAULT uuid_generate_v4(),
    category_name VARCHAR(100) NOT NULL
);

CREATE TABLE seller_account (
    seller_account_id NOT NULL REFERENCES account(user_id),
    email VARCHAR(100) NOT NULL,
    shop_name VARCHAR(100),
    CONSTRAINT unique_shopname UNIQUE (shop_name),
    CONSTRAINT unique_email UNIQUE (email)
);

CREATE TABLE shopCategory (
    seller_account_id uuid REFERENCES seller_account(seller_account_id) NOT NULL,
    category_id uuid REFERENCES category(category_id) NOT NULL
);

CREATE TABLE products (
    product_id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES seller_account(seller_account_id),
    product_name VARCHAR(200) NOT NULL,
    price FLOAT NOT NULL,
    description TEXT,
    stock INTEGER DEFAULT 0,
    heart INTEGER DEFAULT 0, 
    seen INTEGER DEFAULT 0,
    sold INTEGER DEFAULT 0,
    date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE productCategory (
    product_id uuid NOT NULL REFERENCES products(product_id),
    category_id uuid REFERENCES category(category_id) NOT NULL 
);

CREATE TABLE productImage (
    product_id uuid NOT NULL REFERENCES products(product_id),
    image_link VARCHAR(200) NOT NULL
);

CREATE TABLE orders (
    order_id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id uuid NOT NULL REFERENCES products(product_id),
    status VARCHAR(15) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    user_id uuid NOT NULL REFERENCES account(user_id),
    date timestamp with time zone
);