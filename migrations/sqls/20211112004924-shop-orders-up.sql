CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  user_id INTEGER,
  quantity INTEGER,
  status VARCHAR(20)
);

INSERT INTO orders (user_id, product_id, quantity, status) VALUES (2, 1, 2, 'pending');

INSERT INTO orders (user_id, product_id, quantity, status) VALUES (1, 4, 3, 'complete');

INSERT INTO orders (user_id, product_id, quantity, status) VALUES (2, 2, 2, 'active');

INSERT INTO orders (user_id, product_id, quantity, status) VALUES (1, 10, 1, 'active');

INSERT INTO orders (user_id, product_id, quantity, status) VALUES (1, 9, 2, 'complete');

INSERT INTO orders (user_id, product_id, quantity, status) VALUES (1, 1, 1, 'complete');

INSERT INTO orders (user_id, product_id, quantity, status) VALUES (2, 8, 2, 'complete');
