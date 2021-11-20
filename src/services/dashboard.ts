import Client from '../database'
import { Order, OrderStore } from '../models/orders'
import { OrderProduct, OrderProductsStore } from '../models/order-products'
import { Product, ProductStore } from '../models/products'
import { User, UserStore } from '../models/users'

export interface OrderSummary extends Order, Product, User {

}

type OrderProductSummary = {
  order_id: number
  name: string
  price: number
  quantity: number
  status: string
}
type OrderUserSummary = {
  id: number
  username: string
  firstname: string
  lastname: string
  status: string
}

export class DashboardQueries {
  // Get all products that have been included in order
  async productsInOrders(orderId: string): Promise<OrderProductSummary[]> {
    try {
      const conn = await Client.connect()
      const sql = `
          SELECT
            order_id, name, price, quantity, status
          FROM products
          INNER JOIN order_products
            ON order_products.product_id = products.id
          INNER JOIN orders
            ON order_products.order_id = orders.id
            WHERE order_products.order_id = ${orderId}
          ; `
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`)
    }
  }

  async orderUser(orderId: string): Promise<OrderProductSummary[]> {
    try {
      const conn = await Client.connect()
      const sql = `
          SELECT
            orders.id, username, firstname, lastname, status
          FROM users
          INNER JOIN orders
            ON orders.user_id = users.id
            WHERE orders.id = ${orderId}
          ; `
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`)
    }
  }

  async productsByPrice(): Promise<Product[]>{
    const conn = await Client.connect()
    const sql = 'SELECT * FROM products ORDER BY price DESC LIMIT 5'

    const result = await conn.query(sql)

    conn.release()

    return result.rows
  }

}
