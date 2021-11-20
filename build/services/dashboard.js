"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardQueries = void 0;
const database_1 = __importDefault(require("../database"));
class DashboardQueries {
    // Get all products that have been included in order
    async productsInOrders(orderId) {
        try {
            const conn = await database_1.default.connect();
            const sql = `
          SELECT
            order_id, name, price, quantity, status
          FROM products
          INNER JOIN order_products
            ON order_products.product_id = products.id
          INNER JOIN orders
            ON order_products.order_id = orders.id
            WHERE order_products.order_id = ${orderId}
          ; `;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`unable get products and orders: ${err}`);
        }
    }
    async orderUser(orderId) {
        try {
            const conn = await database_1.default.connect();
            const sql = `
          SELECT
            orders.id, username, firstname, lastname, status
          FROM users
          INNER JOIN orders
            ON orders.user_id = users.id
            WHERE orders.id = ${orderId}
          ; `;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`unable get products and orders: ${err}`);
        }
    }
    async productsByPrice() {
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM products ORDER BY price DESC LIMIT 5';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }
}
exports.DashboardQueries = DashboardQueries;
