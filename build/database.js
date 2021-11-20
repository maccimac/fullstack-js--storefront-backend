"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { HOST, DB, DB_TEST, USER, PASSWORD, ENV, BCRYPT_PW, SALT_ROUNDS, JWT_TOKEN_SECRET } = process.env;
const client = new pg_1.Pool({
    host: HOST,
    database: ENV == 'dev' ? DB : DB_TEST,
    user: USER,
    password: PASSWORD,
});
exports.default = client;
