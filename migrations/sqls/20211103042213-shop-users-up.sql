CREATE TABLE users (
  id SERIAL PRIMARY  KEY,
  username VARCHAR(50),
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  password_digest VARCHAR(150)
);

INSERT INTO users (username, firstname, lastname, password_digest)
VALUES ('maccimac', 'Margaret', 'Macaranas', '2b$10$XWsMKPzGc2McEhFW/ebd3e02HHOkwPt3eqBJDJ9wEgSW0K6PcVZwi');

INSERT INTO users (username, firstname, lastname, password_digest)
VALUES ('jkrbondoc', 'Joshua', 'Bondoc', '$2b$10$9aR7zsMQBtid4gtxMtzwgeyxR2eZlfa.xQcEFkDQc5aPjmT9kc3qW');
