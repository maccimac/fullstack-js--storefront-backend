## Your task is to build an API for a shopping application.

Draft a database schema that covers all the data requirements.
Draft a map of endpoints to expose for the frontend.

# Environment Setup
Included in the Repository
- Express
- Node/Typescript
- TSC Watch

Express is already installed with a basic server file provided. Typescript is installed with a .tsconfig file as well as a watcher library called tsc-watch.

Run yarn in your terminal to install these packages and create the node modules folder.

To start the server initially, run `yarn watch`. This will kick off the watcher library and start running the application on the port specified in `server.ts`.


# Database Setup
Create a connection to a Postgres database from the provided Node application.
Add tables and columns according to the database schema doc from step 1.

# Create Models
Create models that facilitate CRUD operations on the database tables.
Create a test suite for each model in Jasmine.

# Create API Endpoints
Create handler files for each model.
In each handler file, create RESTful endpoints for each model method.
Create a test suite that covers each endpoint with Jasmine.


-------------------------

# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints
#### Products
- Index
- Show (args: product id)
- Create (args: Product)[token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by brand (args: product brand)

#### Users
- Index [token required]
- Show (args: id)[token required]
- Create (args: User)[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id ()
- name
- price
- [OPTIONAL] brand

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- user_id
- status (pending / active / completed)

#### Order_Products
- id
- order_id
- product_id
- quantity
