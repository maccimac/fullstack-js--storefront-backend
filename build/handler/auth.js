"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const jwtVerification = jsonwebtoken_1.default.verify(authHeader, process.env.JWT_TOKEN_SECRET);
        if (jwtVerification) {
            next();
        }
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
};
exports.verifyAuth = verifyAuth;
