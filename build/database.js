"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var _a = process.env, HOST = _a.HOST, DB = _a.DB, DB_TEST = _a.DB_TEST, USER = _a.USER, PASSWORD = _a.PASSWORD, ENV = _a.ENV;
var client;
console.log(ENV);
client = new pg_1.Pool({
    host: HOST,
    database: ENV == 'dev' ? DB : DB_TEST,
    user: USER,
    password: PASSWORD,
});
/*if(ENV === 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
}

if(ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
}*/
exports.default = client;
