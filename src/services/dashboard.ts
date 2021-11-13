import Client from '../database'
import { Order, OrderStore } from '../models/orders'
import { Product, ProductStore } from '../models/products'
import { User, UserStore } from '../models/users'

export interface OrderSummary extends Order, Product, User {

}

export class DashboardQueries {
  async fetchProduct(orderId: string | number, orderStatus: string ): Promise<OrderSummary[]>{
    const conn = await Client.connect()
    console.log(orderId)
    const sql = `
        SELECT
          orders.id,
          name,
          product_id,
          status,
          quantity,
          users.username,
          brand
        FROM orders
        JOIN users
          ON orders.user_id = users.id
        JOIN products
          ON products.id = ${orderId}
        WHERE
          orders.status = '${orderStatus}'
    ;`
    const result = await conn.query(sql)
    conn.release()
    return result.rows

  }

  async productsByPrice(): Promise<Product[]>{
    const conn = await Client.connect()
    const sql = 'SELECT * FROM products ORDER BY price DESC LIMIT 5'

    const result = await conn.query(sql)

    conn.release()

    return result.rows
  }

  // Get all products that have been included in orders
  async productsInOrders(): Promise<{name: string, price: number, order_id: string}[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT name, price, orders.id FROM products INNER JOIN orders ON products.id = orders.product_id'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`)
    }
  }
}
