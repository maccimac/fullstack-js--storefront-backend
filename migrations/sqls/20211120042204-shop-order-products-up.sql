CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  order_id INTERGER REFERENCES orders(id),
  product_id INTERGER REFERENCES products(id),
  quantity INTEGER,
);


INSERT INTO orders (order_id, product_id, quantity) VALUES (1, 1, 1);

INSERT INTO orders (order_id, product_id, quantity) VALUES (1, 4, 3);

INSERT INTO orders (order_id, product_id, quantity) VALUES (1, 2, 2);

INSERT INTO orders (order_id, product_id, quantity) VALUES (2, 1, 2);

INSERT INTO orders (order_id, product_id, quantity) VALUES (2, 10, 1);

INSERT INTO orders (order_id, product_id, quantity) VALUES (2, 9, 2);

INSERT INTO orders (order_id, product_id, quantity) VALUES (3, 8, 2);
