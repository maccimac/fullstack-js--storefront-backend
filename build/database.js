"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SALT_ROUNDS = exports.BCRYPT_PW = exports.ENV = exports.PASSWORD = exports.USER = exports.DB_TEST = exports.DB = exports.HOST = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
exports.HOST = (_a = process.env, _a.HOST), exports.DB = _a.DB, exports.DB_TEST = _a.DB_TEST, exports.USER = _a.USER, exports.PASSWORD = _a.PASSWORD, exports.ENV = _a.ENV, exports.BCRYPT_PW = _a.BCRYPT_PW, exports.SALT_ROUNDS = _a.SALT_ROUNDS;
// export const BCRYPT_PW: string = process.env.BCRYPT_PW
// export const SALT_ROUNDS: string = process.env.SALT_ROUNDS
console.log(exports.ENV);
var client = new pg_1.Pool({
    host: exports.HOST,
    database: exports.ENV == 'dev' ? exports.DB : exports.DB_TEST,
    user: exports.USER,
    password: exports.PASSWORD,
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
