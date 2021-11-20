"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            const err_msg = `Could not get orders ${id}. Error: ${err}`;
            throw new Error(err_msg);
            // return err_msg
        }
    }
    async create(order) {
        try {
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [order.user_id, order.status]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not add ${order.status} order for user ${order.user_id}. Error: ${err}`);
        }
    }
    async update(order) {
        try {
            const sql = `
      UPDATE orders
      SET  user_id = $2, status = $3
      WHERE id = $1;
      `;
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [order.id, order.user_id, order.status]);
            conn.release();
            if (result.rowCount) {
                const resolvedId = `${order.id}`;
                const targetOrder = await this.show(resolvedId);
                return targetOrder;
            }
        }
        catch (err) {
            throw new Error(`Could not edit order ${order.id}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rowCount > 0) {
                return {
                    status: 'success',
                    status_msg: `successfully deleted order no.${id} `
                };
            }
            else {
                return {
                    status: 'error',
                    status_msg: `cannot delete order no.${id} `
                };
            }
        }
        catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
