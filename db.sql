CREATE DATABASE UShop;


CREATE EXTENSION "uuid-ossp";

CREATE TABLE sellers_accounts
(
    seller_id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    shop_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    password VARCHAR(100) NOT NULL,
    shop_category VARCHAR(100)[],
    UNIQUE (shop_name, email),
    CHECK (length(password) > 7)
);