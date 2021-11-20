"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, HOST = _a.HOST, DB = _a.DB, DB_TEST = _a.DB_TEST, USER = _a.USER, PASSWORD = _a.PASSWORD, ENV = _a.ENV, BCRYPT_PW = _a.BCRYPT_PW, SALT_ROUNDS = _a.SALT_ROUNDS, JWT_TOKEN_SECRET = _a.JWT_TOKEN_SECRET;
// export const BCRYPT_PW: string = process.env.BCRYPT_PW
// export const SALT_ROUNDS: string = process.env.SALT_ROUNDS
console.log(ENV);
var client = new pg_1.Pool({
    host: HOST,
    database: ENV == 'dev' ? DB : DB_TEST,
    user: USER,
    password: PASSWORD
});
exports["default"] = client;
