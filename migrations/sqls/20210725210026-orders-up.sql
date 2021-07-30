CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id integer,
    quantity integer,
    user_id integer,
    order_status VARCHAR(10)
);

INSERT INTO orders (product_id, quantity, user_id, order_status) VALUES(1, 1, 1, 'active');
INSERT INTO orders (product_id, quantity, user_id, order_status) VALUES(2, 1, 1, 'complete');