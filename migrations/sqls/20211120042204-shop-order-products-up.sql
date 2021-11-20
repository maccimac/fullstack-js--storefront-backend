CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER
);

INSERT INTO order_products (order_id, product_id, quantity) VALUES (1, 1, 1);

INSERT INTO order_products (order_id, product_id, quantity) VALUES (1, 4, 3);

INSERT INTO order_products (order_id, product_id, quantity) VALUES (1, 2, 2);

INSERT INTO order_products (order_id, product_id, quantity) VALUES (2, 1, 2);

INSERT INTO order_products (order_id, product_id, quantity) VALUES (2, 10, 1);

INSERT INTO order_products (order_id, product_id, quantity) VALUES (2, 9, 2);

INSERT INTO order_products (order_id, product_id, quantity) VALUES (3, 8, 2);
