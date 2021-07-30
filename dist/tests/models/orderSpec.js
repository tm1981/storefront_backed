"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const orders = new order_1.StoreOrder();
dotenv_1.default.config();
describe('order model testing', () => {
    it('should have a index method', () => {
        expect(orders.show).toBeDefined();
    });
    it('show method should return active orders', async () => {
        const result = await orders.show('1', 'active');
        expect(result).toEqual([
            {
                id: 1,
                product_id: 1,
                quantity: 1,
                user_id: 1,
                order_status: 'active',
            },
        ]);
    });
    it('show method should return complete orders', async () => {
        const result = await orders.show('1', 'complete');
        expect(result).toEqual([
            {
                id: 2,
                product_id: 2,
                quantity: 1,
                user_id: 1,
                order_status: 'complete',
            },
        ]);
    });
});
const request = supertest_1.default(server_1.default);
describe('Test Order endpoints', () => {
    let token;
    beforeAll(() => {
        token = jsonwebtoken_1.default.sign('test1', process.env.TOKEN_SECRET);
    });
    it('GET active orders', async () => {
        const response = await request
            .get('/api/orders/active')
            .set('Authorization', 'Bearer ' + token)
            .send({
            userid: 1,
        });
        expect(response.status).toBe(200);
    });
    it('GET complete orders', async () => {
        const response = await request
            .get('/api/orders/complete')
            .set('Authorization', 'Bearer ' + token)
            .send({
            userid: 1,
        });
        expect(response.status).toBe(200);
    });
});
