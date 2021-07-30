"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = __importDefault(require("./handlers/order"));
const products_1 = __importDefault(require("./handlers/products"));
const user_1 = __importDefault(require("./handlers/user"));
const app = express_1.default();
const address = '0.0.0.0:3000';
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Nothing here, read the instructions');
});
products_1.default(app);
order_1.default(app);
user_1.default(app);
app.listen(3000, () => {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
