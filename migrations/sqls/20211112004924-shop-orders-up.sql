CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  status VARCHAR(20)
);

INSERT INTO orders (user_id, status) VALUES (1, 'pending');
INSERT INTO orders (user_id, status) VALUES (2, 'active');
INSERT INTO orders (user_id, status) VALUES (3, 'complete');
