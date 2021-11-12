CREATE TABLE products (
  id SERIAL PRIMARY  KEY,
  name VARCHAR(255),
  price integer,
  brand VARCHAR(50)
);

INSERT INTO products (name, price, brand) VALUES ('haloscope', 27, 'glossier');
INSERT INTO products (name, price, brand) VALUES ('stretch concealer', 22, 'glossier');
