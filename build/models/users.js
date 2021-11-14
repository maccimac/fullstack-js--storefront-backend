"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcryptPw = process.env.BCRYPT_PW;
const saltRounds = parseInt(process.env.SALT_ROUNDS);
class UserStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not get user ${id}. Error: ${err}`);
        }
    }
    async create(user) {
        const hash = bcrypt_1.default.hashSync(user.password + bcryptPw, saltRounds);
        // console.log(hash)
        try {
            const sql = 'INSERT INTO users (username, firstname, lastname, password_digest) VALUES($1, $2, $3, $4) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [user.username, user.firstname, user.lastname, hash]);
            const article = result.rows[0];
            conn.release();
            return article;
        }
        catch (err) {
            throw new Error(`Could not add user ${name}. Error: ${err}`);
        }
    }
    async authenticate(username, password) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM users WHERE username=($1)';
        const result = await conn.query(sql, [username]);
        // console.log(password+bcryptPw)
        if (result.rows.length) {
            const targetUser = result.rows[0];
            if (bcrypt_1.default.compareSync(password + bcryptPw, targetUser.password_digest)) {
                return targetUser;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
    async delete(username) {
        try {
            const sql = 'DELETE FROM users WHERE username=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [username]);
            // console.log(result)
            conn.release();
            if (result.rowCount > 0) {
                return {
                    status: 'success',
                    status_msg: `successfully deleted user ${username} `
                };
            }
            else {
                return {
                    status: 'error',
                    status_msg: `cannot delete user ${username} `
                };
            }
        }
        catch (err) {
            throw new Error(`Could not delete user ${username}. Error: ${err}`);
        }
    }
}
exports.UserStore = UserStore;
