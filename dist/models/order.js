"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreOrder = void 0;
const database_1 = __importDefault(require("../database"));
class StoreOrder {
    async create(o) {
        if (database_1.default === null) {
            return { error: 'Could not connect to database' };
        }
        try {
            const sql = 'INSERT INTO orders (user_id, order_status) VALUES($1, $2) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [o.userId, o.orderStatus]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            return { error: `Could not add new order. Error: ${err}` };
        }
    }
    async show(userId, orderStatus) {
        if (database_1.default === null) {
            return { error: 'Could not connect to database' };
        }
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1) and order_status=($2)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [userId, orderStatus]);
            conn.release();
            if (result.rowCount === 0) {
                return { error: 'No orders was found for the user' };
            }
            return result.rows;
        }
        catch (err) {
            return { error: `Could not find Orders for ${userId}. Error: ${err}` };
        }
    }
    async addProduct(quantity, orderId, productId) {
        if (database_1.default === null) {
            return { error: 'Could not connect to database' };
        }
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [quantity, orderId, productId]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            return { error: `Could not add product to order Error: ${err}` };
        }
    }
}
exports.StoreOrder = StoreOrder;
