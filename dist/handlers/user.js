"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const middleware_1 = __importDefault(require("../middleware"));
const dotenv_1 = __importDefault(require("dotenv"));
const users = new user_1.Users();
dotenv_1.default.config();
const index = async (_req, res) => {
    const userList = await users.index();
    if (userList.hasOwnProperty('error')) {
        res.status(400);
    }
    res.json(userList);
};
const show = async (req, res) => {
    const user = await users.show(req.params.id);
    if (user.hasOwnProperty('error')) {
        res.status(400);
    }
    res.json(user);
};
const create = async (req, res) => {
    try {
        const user = {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            password: req.body.password,
        };
        const newUser = await users.create(user);
        if (newUser.hasOwnProperty('error')) {
            res.status(400);
        }
        res.json(newUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
//login method
const getToken = async (req, res) => {
    try {
        const firstname = req.body.firstname;
        const password = req.body.password;
        const response = await users.login(firstname, password);
        if (response.hasOwnProperty('error')) {
            res.status(400);
        }
        res.json(response);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const user_routes = (app) => {
    app.get('/api/user', middleware_1.default, index);
    app.get('/api/user/:id', middleware_1.default, show);
    app.post('/api/user', middleware_1.default, create);
    app.get('/api/login', getToken);
};
exports.default = user_routes;
