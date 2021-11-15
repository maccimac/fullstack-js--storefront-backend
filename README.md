# Storefront Backend Project
Udacity FullStack Javascript NanoDegree Second Project

## Getting Started

##### Setup
* Run on terminal: `npm i`
* Create `.env` :
      HOST=127.0.0.1
      USER=udacity_user
      PW=password123
      DB=shop
      DB_TEST=shop_test
      ENV=dev
      BCRYPT_PW=anypassword123
      SALT_ROUNDS=10
      JWT_TOKEN_SECRET=647coquitlam

* Run on terminal `yarn`
* Create databases. Run on terminal: `npm run migrate`
* Run on terminal: `npm run start` or `yarn watch` or `npm run watch`
* Run on browser:  `localhost:3000`
* To get a JWT Token, run on Postman: `localhost:3000/auth?username=maccimac&password=pw123`
  * Copy returned auth token. Pass token on request.headers.authorization for secure requests
* To run tests. Run in terminal: `npm run tests`

##### Sample Users Credentials
* Username: `maccimac` / Password: `pw123`
* Username: `sample_user` / Password: `password456`  


## Endpoints
 Example: `htttp://localhost:3000/orders/product/1`

##### Users
* Index - [GET] `/users`
* Show - [GET] `/user/:id`
  * Returns User
* Create - [POST] `/user`
  * Required body
    ```
    {   "username": <new username>,
        "firstname" : <firstname>,
        "lastname": <lastname>,
        "password": <unique password>  }
    ```
* Update - [PUT] `/user/:username`
  * Required body
    ```
    {   "username": <new username>,
        "firstname" : <new firstname>,
        "lastname": <new lastname>,
        "password": <new unique password>  }
    ```    
* Delete - [DESTROY] `/user/:username`
  * Requires JWT Token on headers.authentication
* Authenticate - [GET]
  ```
  /auth?username=<username>&password=<password>
  ```
  * Returns User and JWT Token

  ### Products
  Product requests requires JWT Token passed to headers.authorization
  * Index - [GET] `/products`
  * Show - [GET] `/product/:id`
    * Does not require JWT Token
  * Create - [POST] `/product`
    * Required body:
      ```
      {   "name": <product name>,
          "price" : <price>,
          "brand": <brand name>   }
      ```
  * Update - [PUT] `/product/:id`
    * Required body:
      ```
      {   "name": <update or retain name>,
          "price" : <update or retain price>,
          "brand": <update or retain brand>   }
      ```

### Orders
Product requests requires JWT Token passed to headers.authorization
* Index - [GET] `/orders`
* Show - [GET] `/order/:id`
* Create - [POST] `/order`
  * Required body:
    ```
    {   "product_id": <1-14>,
        "user_id" : <1-3>,
        "quantity": <any number>,
        "status" : <pending / active / complete>  }
    ```
* Update - [PUT] `/product/:id`
  * Required body:
    ```
    {   "product_id": <1-14>,
        "user_id" : <1-3>,
        "quantity": <any number>,
        "status" : <pending / active / complete>  }
    ```


### Dashboard
* Index / Products in orders- [GET] `/orders/products`
* Products in order id - [GET] `/orders/product/:productId`
* Products in order id with status filter - [GET] `/orders/product/:productId/:orderStatus`
* Products by price - [GET] `/products/byPrice`



## Author
  * Github: [ https://github.com/maccimac ]
  * Portfolio: [ http://webcrafterinc.com ]


## Version History
* v2.0
    * Recommendations if any
* v1.0
    * Initial submit

## Acknowledgments
Thanks Udacity!
