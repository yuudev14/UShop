# UShop 🛒🛍

1. [About　💁](#about-)
2. [Features　✨](#features-)
3. [Live Application 🌈](#live-application-)
4. [Requirements　🙏](#requirements-)
5. [Getting Started　🎬](#getting-started-)
6. [Tech Stack　🤖](#tech-stack-)

# About 💁
An ecommerse full-stack application that lets you choose what products to add in the cart for you to buy, follow shops that you are interested in and find products that are popular and hit now.
You can also sell your own products and create a brand for yourself in this application. You can add your own shop and manage your products that you want to sell.

# Features ✨
#### 1. Authentication
User can register an account. After register they will be directed to the page where there's a section of popular categories and popular products as well as all new products.
#### 2. Cart
You can choose products and add them to your cart. You can then decide if how many of that product you want to buy or what products should remain in the cart for the time being.
#### 3. View Products
You can view products and see some of their descriptions in their page. You can also view some images depending on how many pictures the seller uploads.
#### 4. View Shop
You can also view the shop where the product is being sold. You can follow the shop and if you have done that then you can see some recommnedations in your profile page on what products are you interested with depending on the shops that you followed.
#### 5. Create a shop
You can create your shop/brand of your own and you can start selling if you want
#### 6. Manage products
You can manage your own products, add products, delete some products an add stocks in your inventory. you can also filter your products in many different ways.
#### 4. Sold Products Logs
You can see some pending requests in your dashboard as well
# Live Application 🌈
You can try the live application [here](https://yu-ushop.herokuapp.com/#/).  
# Requirements 🙏
To use this application, 
Just logged in or register to the application and you can start using it
# Getting Started 🎬
#### 1. Install Dependencies
To install all dependencies, run this code in your terminal.
```
npm install
```
note:
also install dependencie in the client side by going to the client directory.
#### 2. Set Up Environment Variables
To set up environment variables, create ```.env``` file and set up your own environment variables in the file.
```
jwtsecret = anything
PG_USER = your_username
PG_PASSWORD = your_password
PG_HOST = your_localhost
PG_PORT = your_port
PG_DATABASE = your_database
CLOUDINARY_NAME = your_cloudinary_name
CLOUDINARY_API_KEY = your_cloudinary_key
CLOUDINARY_API_SECRET = your_cloudinary_secret
```

#### 3. Create your own database and run the sql commands in db.sql  
#### 4. Run the server and client
To start the server, run this code in your terminal.
```
npm run dev
```
#### 5. Let's get started!

# Tech Stack 🤖  
|<img src="https://user-images.githubusercontent.com/83794734/143388086-2f543482-4c32-4d1b-9c10-00ea95769c8c.png" alt="React image" width="100">|<img src="https://user-images.githubusercontent.com/83794734/143385316-257a292f-799f-493e-967e-d721a2771734.png" alt="Redux image" width="100">|<img src="https://user-images.githubusercontent.com/83794734/143388023-1728a310-6365-4572-8dd3-8b3e29b7c99e.png" alt="Bulma image" width="100">|<img src="https://user-images.githubusercontent.com/83794734/143400683-4ad4938b-6696-43b3-929c-95d3f4d4d7cf.png" alt="Netlify image" width="100">|
|---|---|---|---|
|[React](https://reactjs.org/)|[Redux](https://redux-toolkit.js.org/)|[Postgres](https://www.postgresql.org/)|[NodeJS](https://nodejs.org/en/)|[ExpressJS](https://expressjs.com/)|
