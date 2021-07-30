"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
class Users {
    async index() {
        if (database_1.default === null) {
            return { error: 'Could not connect to database' };
        }
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT id,firstname,lastname FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            return { error: `Could not get users. ${err}` };
        }
    }
    async show(id) {
        if (database_1.default === null) {
            return { error: 'Could not connect to database' };
        }
        try {
            const sql = 'SELECT id,firstname,lastname FROM users WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rowCount === 0) {
                return { error: `Could not find user with id ${id}` };
            }
            return result.rows[0];
        }
        catch (err) {
            return { error: `Could not find user with id ${id}. Error: ${err}` };
        }
    }
    async create(u) {
        if (database_1.default === null) {
            return { error: 'Could not connect to database' };
        }
        try {
            const sql = 'INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *';
            const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
            const conn = await database_1.default.connect();
            if (u.firstName === undefined ||
                u.lastName === undefined ||
                u.password === undefined) {
                return { error: 'all field are required' };
            }
            if (u.password.length < 4) {
                return { error: 'Invalid password, minimum 4 charcters required' };
            }
            const result = await conn.query(sql, [u.firstName, u.lastName, hash]);
            const id = result.rows[0].id;
            conn.release();
            if (id > 0) {
                //user added to db, return token
                const token = jsonwebtoken_1.default.sign(u.firstName, process.env.TOKEN_SECRET);
                return { token: token };
            }
            else {
                return { error: 'unknown error' };
            }
        }
        catch (err) {
            return {
                error: `Could not add new user: ${u.firstName} ${u.lastName}. Error: ${err}`,
            };
        }
    }
    async login(username, password) {
        if (database_1.default === null) {
            return { error: 'Could not connect to database' };
        }
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM users WHERE firstname=($1)';
        const result = await conn.query(sql, [username]);
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(password + pepper, user.password_digest)) {
                const token = jsonwebtoken_1.default.sign(user.firstname, process.env.TOKEN_SECRET);
                return { token: token };
            }
            else {
                return { error: 'Invalid username or password, please try again' };
            }
        }
        else {
            return { error: 'Unkown error' };
        }
    }
}
exports.Users = Users;
