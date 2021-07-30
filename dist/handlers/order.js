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
const order_routes = (app) => {
    app.get('/api/orders/active', middleware_1.default, activeOrders);
    app.get('/api/orders/complete', middleware_1.default, completeOrders);
};
exports.default = order_routes;
