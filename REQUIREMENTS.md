# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

- Token : when token is required header should contain a key value pair
key - Authorization
value - Bearer here_goes_the_token

#### Products
- Index :[GET] http://localhost:3000/api/products - return all products
- Show : [GET] http://localhost:3000/api/products/:product_id - return product by ID
- Create [token required] [POST] http://localhost:3000/api/products - return the created product, product data should be in the body of the request like this example
Body {
    "title": "product name",
    "price": 1500,
    "part_number": "product-1"
}

#### Users
- Index [token required] [GET] http://localhost:3000/api/user - return list of users
- Show [token required] [GET] http://localhost:3000/api/user/:user_id - return user information by ID
- Create N[token required] [POST] http://localhost:3000/api/user - return a token, user data should be in the body, for exmaple 
Body {
    "firstname": "john",
    "lastname": doe,
    "partNumber": "supersecretpassword"
}
- Login [token required] [GET] http://localhost:3000/login - return a token, user data should be in the body of the request, for exmaple 
Body {
    "firstname": "john",
    "partNumber": "supersecretpassword"
}

#### Orders
- Current Order by user (args: user id)[token required] - [GET] http://localhost:3000/api/orders/current
- [OPTIONAL] Completed Orders by user (args: user id)[token required] [GET] http://localhost:3000/api/orders/complete
user_id value should be in the body
{
    "user_id" : "1"
}

## Data Shapes
#### Product
-  id
- title
- price
- partNumber

#### User
- id
- firstname
- lastname
- password

#### Orders
- id
- order_id - id of each product in the order
- quantity - quantity of each product in the order
- user_id
- order_status - status of order (active or complete)

## Schema

#### Products
id SERIAL PRIMARY KEY, 
title VARCHAR(100), 
price integer, 
partNumber VARCHAR(100)

#### User
id SERIAL PRIMARY KEY,
firstname VARCHAR(100),
lastname VARCHAR(100),
password_digest VARCHAR

#### Order
id SERIAL PRIMARY KEY,
product_id integer,
quantity integer,
user_id integer,
order_status VARCHAR(10)