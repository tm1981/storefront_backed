"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        if (database_1.default === null) {
            return { error: 'Could not connect to database' };
        }
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            return { error: `Could not get products. ${err}` };
        }
    }
    async show(id) {
        if (database_1.default === null) {
            return { error: 'Could not connect to database' };
        }
        try {
            const sql = 'SELECT * FROM Products WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            return { error: `Could not find product ${id}. Error: ${err}` };
        }
    }
    async create(p) {
        if (database_1.default === null) {
            return { error: 'Could not connect to database' };
        }
        try {
            const sql = 'INSERT INTO products (title, price, part_number) VALUES($1, $2, $3) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [p.title, p.price, p.partNumber]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            return { error: `Could not add new product ${p.title}. Error: ${err}` };
        }
    }
}
exports.ProductStore = ProductStore;
