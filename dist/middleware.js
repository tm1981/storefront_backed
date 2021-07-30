"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateToken = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader === undefined) {
            res.status(401);
            res.json({ error: 'Access denied, invalid token' });
            return;
        }
        else {
            const token = authorizationHeader.split(' ')[1];
            jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
            next();
        }
    }
    catch (err) {
        res.status(401);
        res.json({ error: 'Access denied, invalid token' });
        return;
    }
};
exports.default = validateToken;
