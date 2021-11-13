// @ts-ignore
import Client from '../database'

export type Order = {
  id?: number
  product_id: number
  user_id: number
  quantity: number
  status?: string
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders'
      const result = await conn.query(sql)
      conn.release()
      return result.rows

    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`)
    }
  }

  async show(id: string | number): Promise<Order | undefined > {
    try {
        const sql = 'SELECT * FROM orders WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()

        const result = await conn.query(sql, [id])

        conn.release()

        return result.rows[0]
    } catch (err) {
        const err_msg = `Could not get orders ${id}. Error: ${err}`
        throw new Error(err_msg)
        // return err_msg
    }
  }

  async create(order: Order): Promise<Order> {
    try {
        const sql = 'INSERT INTO orders (product_id, user_id, quantity, status) VALUES($1, $2, $3, $4) RETURNING *'
        // @ts-ignore
        const conn = await Client.connect()

        const result = await conn.query(sql, [order.product_id, order.user_id, order.quantity, order.status])

        const targetOrder = result.rows[0]

        conn.release()

        return targetOrder
    } catch (err) {
        throw new Error(`Could not add order of ${order.product_id} for ${order.user_id}. Error: ${err}`)
    }
  }

  async update(order: Order): Promise<Order | undefined> {
    try{
      const sql = `
      UPDATE orders
      SET product_id = $2, user_id = $3, quantity = $4, status = $5
      WHERE id = $1;
      `
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [order.id, order.product_id, order.user_id, order.quantity, order.status])

      conn.release()

      if(result.rowCount){
        const resolvedId = `${order.id}`
        const targetOrder = await this.show(resolvedId)
        return targetOrder
      }

    }catch(err){
      throw new Error(`Could not edit order ${order.id}. Error: ${err}`)
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()

        const result = await conn.query(sql, [id])

        const order = result.rows[0]

        conn.release()

        return order
    } catch (err) {
        throw new Error(`Could not delete order ${id}. Error: ${err}`)
    }
  }

}
