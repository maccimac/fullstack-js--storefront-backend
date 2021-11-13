import Client from '../database'
import { Order, OrderStore } from './orders'
import { Product, ProductStore } from './products'
import { User, UserStore } from './users'

export interface OrderSummary extends Order, Product, User {

}

export class ProductOrderStore {
  async fetchProduct(orderId: string | number): Promise<OrderSummary[]>{
    const conn = await Client.connect()
    console.log(orderId)
    const sql =`
    SELECT
      orders.id,
      name,
      product_id,
      users.username,
      status,
      quantity
    FROM orders
    JOIN users
      ON orders.user_id = users.id
    JOIN products
      ON products.id = ${orderId}
    WHERE
      orders.status = 'complete'
    ;`
    const result = await conn.query(sql)
    conn.release()
    return result.rows

  }
  fetchProductByStatus(status: string):
}

/*SELECT * FROM products
  INNER JOIN
    orders ON products.id = orders.product_id
    ;*/

/*SELECT
  student.first_name,
  student.last_name,
  course.name
FROM student
JOIN student_course
  ON student.id = student_course.student_id
JOIN course
  ON course.id = student_course.course_id;*/
