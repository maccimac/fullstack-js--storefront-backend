# Storefront Backend Project
Udacity FullStack Javascript NanoDegree Second Project

## Getting Started

##### Setup
* Run on terminal: `npm i`
* Create `.env` :
      HOST=127.0.0.1
      USER=your_username
      PW=your_password
      DB=shop
      DB_TEST=shop_test
      ENV=dev
      BCRYPT_PW=any_password_123
      SALT_ROUNDS=10
      JWT_TOKEN_SECRET=another_secret_123

* Run on terminal: `npm run start`
* Create databases. Run on terminal: `npm run migrate`
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
* Delete - [DESTROY] `/user`
  * Requires body: `{ id: <userid> }`
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
* Delete - [DESTROY] `/product`




## Author
  * Github: [ https://github.com/maccimac ]
  * Portfolio: [ http://webcrafterinc.com ]


## Version History
* 1.1
    * Various bug fixes and optimizations
* 1.0
    * Initial Release

## Acknowledgments
