CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    order_status VARCHAR(10) NOT NULL
);

INSERT INTO orders (user_id, order_status) VALUES(1, 'active');
INSERT INTO orders (user_id, order_status) VALUES(1, 'complete');