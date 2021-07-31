"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = __importDefault(require("../middleware"));
const order_1 = require("../models/order");
const storeOrder = new order_1.StoreOrder();
const activeOrders = async (req, res) => {
    const orders = await storeOrder.show(req.body.userid, 'active');
    res.json(orders);
};
const completeOrders = async (req, res) => {
    const orders = await storeOrder.show(req.body.userid, 'complete');
    res.json(orders);
};
const create = async (req, res) => {
    try {
        const order = {
            userId: req.body.user_id,
            orderStatus: req.body.order_status
        };
        const newOrder = await storeOrder.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const addProduct = async (req, res) => {
    const orderId = parseInt(req.params.id);
    const productId = parseInt(req.body.product_id);
    const quantity = parseInt(req.body.quantity);
    try {
        const addProduct = await storeOrder.addProduct(quantity, orderId, productId);
        res.json(addProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const order_routes = (app) => {
    app.get('/api/orders/active', middleware_1.default, activeOrders);
    app.get('/api/orders/complete', middleware_1.default, completeOrders);
    app.post('/api/orders/', middleware_1.default, create);
    app.post('/api/orders/:id/products', middleware_1.default, addProduct);
};
exports.default = order_routes;
