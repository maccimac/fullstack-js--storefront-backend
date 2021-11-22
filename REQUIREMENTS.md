# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.


## Data Shapes / Models
#### Product
- id [SERIAL PRIMAL KEY]
- name [VARCHAR(255)]
- price [INTEGER]
-  brand [VARCHAR(100)] <optional>

#### User
- id [SERIAL PRIMAL KEY]
- firstname [VARCHAR(50)]
- lastname [VARCHAR(50)]
- password_digest [VARCHAR(150)]

#### Orders
- id [SERIAL PRIMAL KEY]
- user_id [INTEGER REFERENCES users(id)]
- status [VARCHAR(20)] <pending / active / completed>

#### Order_Products
- id [SERIAL PRIMAL KEY]
- order_id [INTEGER REFERENCES orders(id)]
- product_id [INTEGER REFERENCES products(id)]
- quantity [INTEGER]
