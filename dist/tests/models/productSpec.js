"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const products = new product_1.ProductStore();
dotenv_1.default.config();
describe('product model testing', () => {
    it('should have a index method', () => {
        expect(products.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(products.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(products.create).toBeDefined();
    });
    it('create method should add a product', async () => {
        const result = await products.create({
            title: 'iPhone 12',
            price: 1000,
            partNumber: 'iphone-12',
        });
        expect(result).toEqual({
            id: 2,
            title: 'iPhone 12',
            part_number: 'iphone-12',
            price: 1000,
        });
    });
    it('index method should return a list of products', async () => {
        const result = await products.index();
        expect(result).toEqual([
            {
                id: 1,
                title: 'iPhone 12',
                part_number: 'iphone-12',
                price: 1000,
            },
            {
                id: 2,
                title: 'iPhone 12',
                part_number: 'iphone-12',
                price: 1000,
            }
        ]);
    });
    it('show method should return the correct product', async () => {
        const result = await products.show('1');
        expect(result).toEqual({
            id: 1,
            title: 'iPhone 12',
            part_number: 'iphone-12',
            price: 1000,
        });
    });
});
const request = supertest_1.default(server_1.default);
describe('Test Product endpoints', () => {
    let token;
    beforeAll(() => {
        token = jsonwebtoken_1.default.sign('test1', process.env.TOKEN_SECRET);
    });
    it('GET all products', async () => {
        const response = await request.get('/api/products');
        expect(response.status).toBe(200);
    });
    it('GET product by id', async () => {
        const response = await request.get('/api/products/1');
        expect(response.status).toBe(200);
    });
    it('add product', async () => {
        const response = await request
            .post('/api/products/')
            .set('Authorization', 'Bearer ' + token)
            .send({
            name: 'playstation',
            price: '1000',
            part_number: 'playstation-1',
        });
        expect(response.status).toBe(200);
    });
    it('trying to add product without token', async () => {
        const response = await request.post('/api/products/').send({
            name: 'playstation',
            price: '1000',
            part_number: 'playstation-1',
        });
        expect(response.status).toBe(401);
    });
});
