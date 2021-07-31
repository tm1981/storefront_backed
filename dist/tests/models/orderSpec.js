"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("./../../models/product");
const order_1 = require("../../models/order");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const orders = new order_1.StoreOrder();
const products = new product_1.ProductStore();
dotenv_1.default.config();
describe('order model testing', () => {
    it('should have a index method', () => {
        expect(orders.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(orders.create).toBeDefined();
    });
    it('should have a addProduct method', () => {
        expect(orders.addProduct).toBeDefined();
    });
    it('show method should return active orders', async () => {
        const result = await orders.show('1', 'active');
        expect(result).toEqual([
            {
                id: 1,
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
                user_id: 1,
                order_status: 'complete',
            },
        ]);
    });
    it('create method should return order', async () => {
        const result = await orders.create({
            'userId': 1,
            'orderStatus': 'active'
        });
        expect(result).toEqual({
            id: 3,
            user_id: 1,
            order_status: 'active',
        });
    });
    it('addProduct method should return order-products', async () => {
        const result = await orders.addProduct(100, 1, 1);
        expect(result).toEqual({
            id: 1,
            product_id: '1',
            order_id: '1',
            quantity: 100
        });
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
    it('POST create new order', async () => {
        const response = await request
            .post('/api/orders')
            .set('Authorization', 'Bearer ' + token)
            .send({
            user_id: 1,
            order_status: 'active'
        });
        expect(response.status).toBe(200);
    });
    it('POST add product to order', async () => {
        const response = await request
            .post('/api/orders')
            .set('Authorization', 'Bearer ' + token)
            .send({
            product_id: 3,
            user_id: 1,
            order_status: 'active'
        });
        expect(response.status).toBe(200);
    });
    it('POST add product to order with quantity', async () => {
        const response = await request
            .post('/api/orders/1/products')
            .set('Authorization', 'Bearer ' + token)
            .send({
            product_id: 1,
            quantity: 100
        });
        expect(response.status).toBe(200);
    });
});
