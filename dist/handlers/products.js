"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = __importDefault(require("../middleware"));
const product_1 = require("../models/product");
const productStore = new product_1.ProductStore();
const index = async (_req, res) => {
    const products = await productStore.index();
    res.json(products);
};
const show = async (req, res) => {
    const product = await productStore.show(req.params.id);
    if (product === undefined) {
        res.json({ error: 'product not found' });
    }
    else {
        res.json(product);
    }
};
const create = async (req, res) => {
    try {
        const product = {
            title: req.body.title,
            price: req.body.price,
            partNumber: req.body.part_number,
        };
        const newProduct = await productStore.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const product_routes = (app) => {
    app.get('/api/products', index);
    app.get('/api/products/:id', show);
    app.post('/api/products', middleware_1.default, create);
};
exports.default = product_routes;
