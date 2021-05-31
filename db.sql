CREATE DATABASE UShop;


CREATE EXTENSION "uuid-ossp";

CREATE TABLE account
(
    user_id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    shop_name VARCHAR(100),
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    password VARCHAR(100) NOT NULL,
    shop_category VARCHAR(100)[],
    CONSTRAINT unique_shopname UNIQUE (shop_name),
    CONSTRAINT unique_email UNIQUE (email),
    CONSTRAINT password_length CHECK (length(password) > 7)
);

CREATE TABLE products (
    product_id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES account(user_id),
    product_name VARCHAR(200) NOT NULL,
    category VARCHAR(50),
    price INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL,
    images VARCHAR(200)[] NOT NULL,
    description TEXT,
    stock INTEGER DEFAULT 0,
    heart INTEGER DEFAULT 0, 
    seen INTEGER DEFAULT 0
);