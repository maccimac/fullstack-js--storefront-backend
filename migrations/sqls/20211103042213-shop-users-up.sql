CREATE TABLE users (
  id SERIAL PRIMARY  KEY,
  username VARCHAR(50),
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  password_digest VARCHAR(150)
);

INSERT INTO users (username, firstname, lastname, password_digest)
VALUES ('maccimac', 'Macci', 'Mac', '$2b$10$zu9CCVtQKn1lWXecmv0zgu1kHF1sxGbuqsfqC5Lu2bW5Q30HH4ABe');
/* password: pw123 */


INSERT INTO users (username, firstname, lastname, password_digest)
VALUES ('sample_user', 'Joshua', 'Bondoc', '$2b$10$8ckiANmMS.Q8ZTKzWBKWReuR06h1ztvMrTmUNv9dREstMXnEH2HzG');
/* password: password456 */

INSERT INTO users (username, firstname, lastname, password_digest)
VALUES ('maccihello', 'Margaret', 'Macaranas', '$2b$10$g9vf0pOoY8jsDSBaG3JDY.NMchwqVL91kEZnKjv8k.fk.2iFMkwRq');
