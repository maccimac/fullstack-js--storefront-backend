"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            const err_msg = `Could not get products ${id}. Error: ${err}`;
            throw new Error(err_msg);
            // return err_msg
        }
    }
    async create(product) {
        try {
            const sql = 'INSERT INTO products (name, price, brand) VALUES($1, $2, $3) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [product.name, product.price, product.brand]);
            const targetProduct = result.rows[0];
            conn.release();
            return targetProduct;
        }
        catch (err) {
            throw new Error(`Could not add product ${product.name}. Error: ${err}`);
        }
    }
    async update(product) {
        try {
            const sql = `
      UPDATE products
      SET name = $2, price = $3, brand = $4
      WHERE id = $1;
      `;
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [product.id, product.name, product.price, product.brand]);
            conn.release();
            if (result.rowCount) {
                const resolvedId = `${product.id}`;
                const targetProduct = await this.show(resolvedId);
                return targetProduct;
            }
        }
        catch (err) {
            throw new Error(`Could not edit product ${product.name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
