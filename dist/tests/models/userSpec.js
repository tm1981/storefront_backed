"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const users = new user_1.Users();
dotenv_1.default.config();
describe('user model testing', () => {
    let token;
    let password_digest;
    const pepper = process.env.BCRYPT_PASSWORD;
    const saltRounds = process.env.SALT_ROUNDS;
    beforeAll(() => {
        token = jsonwebtoken_1.default.sign('test1', process.env.TOKEN_SECRET);
        password_digest = bcrypt_1.default.hashSync('12345678' + pepper, parseInt(saltRounds));
    });
    it('should have a index method', () => {
        expect(users.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(users.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(users.create).toBeDefined();
    });
    it('should have a login method', () => {
        expect(users.login).toBeDefined();
    });
    it('create method should add a user and return token', async () => {
        const result = await users.create({
            firstName: 'test1',
            lastName: 'test2',
            password: '12345678',
        });
        expect(result).toEqual({
            token: token,
        });
    });
    it('index method should return a list of users', async () => {
        const result = await users.index();
        expect(result).toEqual([
            {
                id: 1,
                firstname: 'test1',
                lastname: 'test2',
            },
        ]);
    });
    it('show method should return the user by id', async () => {
        const result = await users.show('1');
        expect(result).toEqual({
            id: 1,
            firstname: 'test1',
            lastname: 'test2',
        });
    });
    it('login method should return token', async () => {
        const result = await users.login('test1', '12345678');
        expect(result).toEqual({
            token: token,
        });
    });
});
const request = supertest_1.default(server_1.default);
describe('Test User endpoints', () => {
    let token;
    beforeAll(() => {
        token = jsonwebtoken_1.default.sign('test', process.env.TOKEN_SECRET);
    });
    it('GET all users', async () => {
        const response = await request
            .get('/api/user')
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });
    it('GET user by id', async () => {
        const response = await request
            .get('/api/user/1')
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });
    it('add user', async () => {
        const response = await request
            .post('/api/user/')
            .set('Authorization', 'Bearer ' + token)
            .send({
            firstname: 'test3',
            lastname: 'test4',
            password: '12345678',
        });
        expect(response.status).toBe(200);
    });
    it('login in', async () => {
        const response = await request.get('/api/login/').send({
            firstname: 'test3',
            password: '12345678',
        });
        expect(response.status).toBe(200);
    });
});
