"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardQueries = void 0;
const database_1 = __importDefault(require("../database"));
class DashboardQueries {
    async fetchProduct(productId, orderStatus = null) {
        const conn = await database_1.default.connect();
        const sql = `
        SELECT
          orders.id,
          name,
          product_id,
          status,
          users.username
        FROM orders
        INNER JOIN products
          ON orders.product_id = products.id
        INNER JOIN users
          ON orders.user_id = users.id
        WHERE
          orders.product_id = ${productId}
        ${orderStatus
            ? ` AND orders.status = '${orderStatus}';`
            : ` ; `}
      `;
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }
    async productsByPrice() {
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM products ORDER BY price DESC LIMIT 5';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }
    // Get all products that have been included in orders
    async productsInOrders() {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT name, price, orders.id FROM products INNER JOIN orders ON products.id = orders.product_id';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`unable get products and orders: ${err}`);
        }
    }
}
exports.DashboardQueries = DashboardQueries;
