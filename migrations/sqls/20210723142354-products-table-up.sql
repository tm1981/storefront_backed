CREATE TABLE products (id SERIAL PRIMARY KEY, title VARCHAR(100) NOT NULL, price integer NOT NULL, part_number VARCHAR(100) NOT NULL);

INSERT INTO products (title, price, part_number) VALUES('iPhone 12', 1000, 'iphone-12');
-- INSERT INTO products (title, price, part_number) VALUES('Galaxy S21', 850, 'galaxy-s21');
-- INSERT INTO products (title, price, part_number) VALUES('Macbook', 1200, 'mac-01');
