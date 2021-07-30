"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreOrder = void 0;
const database_1 = __importDefault(require("../database"));
class StoreOrder {
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
}
exports.StoreOrder = StoreOrder;
