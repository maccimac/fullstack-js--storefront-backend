CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  user_id INTEGER,
  quantity INTEGER,
  status VARCHAR(20)
);

INSERT INTO orders (user_id, product_id, quantity, status) VALUES (2, 1, 3, 'pending');
