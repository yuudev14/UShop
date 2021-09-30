CREATE DATABASE "UShop";


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
    CONSTRAINT unique_phone_number UNIQUE (phone_number),
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
INSERT INTO category (
    category_name
) VALUES (
    'Automotive & Powersports'
);
INSERT INTO category (
    category_name
) VALUES (
    'Baby Products'
);
INSERT INTO category (
    category_name
) VALUES (
    'Beauty'
);
INSERT INTO category (
    category_name
) VALUES (
    'Books'
);
INSERT INTO category (
    category_name
) VALUES (
    'Camera & Photo'
);
INSERT INTO category (
    category_name
) VALUES (
    'Cell Phones & Accessories'
);
INSERT INTO category (
    category_name
) VALUES (
    'Collectible Coins'
);
INSERT INTO category (
    category_name
) VALUES (
    'Consumer Electronics'
);
INSERT INTO category (
    category_name
) VALUES (
    'Entertainment Collectibles'
);
INSERT INTO category (
    category_name
) VALUES (
    'Fine Art'
);
INSERT INTO category (
    category_name
) VALUES (
    'Grocery & Gourmet Food'
);
INSERT INTO category (
    category_name
) VALUES (
    'Health & Personal Care'
);
INSERT INTO category (
    category_name
) VALUES (
    'Home & Garden'
);
INSERT INTO category (
    category_name
) VALUES (
    'Independent Design'
);
INSERT INTO category (
    category_name
) VALUES (
    'Industrial & Scientific'
);
INSERT INTO category (
    category_name
) VALUES (
    'Music'
);
INSERT INTO category (
    category_name
) VALUES (
    'Musical Instruments'
);
INSERT INTO category (
    category_name
) VALUES (
    'Outdoors'
);
INSERT INTO category (
    category_name
) VALUES (
    'Personal Computers'
);
INSERT INTO category (
    category_name
) VALUES (
    'Pet Supplies'
);
INSERT INTO category (
    category_name
) VALUES (
    'Software'
);INSERT INTO category (
    category_name
) VALUES (
    'Sports'
);
INSERT INTO category (
    category_name
) VALUES (
    'Sports Collectibles'
);
INSERT INTO category (
    category_name
) VALUES (
    'Tools & Home Improvement'
);
INSERT INTO category (
    category_name
) VALUES (
    'Toys & Games'
);
INSERT INTO category (
    category_name
) VALUES (
    'Video, DVD & Blu-ray'
);
INSERT INTO category (
    category_name
) VALUES (
    'Video Games'
);
INSERT INTO category (
    category_name
) VALUES (
    'Watches'
);

CREATE TABLE shops (
    shop_id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES account(user_id),
    email VARCHAR(100) NOT NULL,
    shop_name VARCHAR(100) NOT NULL,
    logo VARCHAR(200) NOT NULL,
    about TEXT NOT NULL,
    date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
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
    rating INTEGER DEFAULT 0, 
    seen INTEGER DEFAULT 0,
    sold INTEGER DEFAULT 0,
    date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_stock CHECK(stock >= 0)
);

CREATE TABLE cart (
    product_id uuid NOT NULL REFERENCES products(product_id),
    user_id uuid NOT NULL REFERENCES account(user_id),
    items INTEGER DEFAULT 1 NOT NULL
);

CREATE TABLE product_category (
    product_id uuid NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    category_id uuid REFERENCES category(category_id) NOT NULL 
);

CREATE TABLE product_images (
    product_id uuid NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    image_link VARCHAR(200) NOT NULL
);

CREATE TABLE orders (
    order_number uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES account(user_id),
    date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_details (
    order_number uuid REFERENCES orders(order_number),
    product_id uuid NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    status VARCHAR(15) NOT NULL DEFAULT 'PENDING',
    item INTEGER NOT NULL
    
);

CREATE TABLE follow (
    user_id uuid REFERENCES account(user_id),
    shop_id uuid REFERENCES shops(shop_id)
);