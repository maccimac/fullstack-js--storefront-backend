// @ts-ignore
import Client from '../database'

export type Order = {
  id?: number
  user_id: number
  status?: string
}

export type Status = {
  status: string
  status_msg: string
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
        const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *'
        const conn = await Client.connect()
        const result = await conn.query(sql, [order.user_id, order.status])
        conn.release()
        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not add ${order.status} order for user ${order.user_id}. Error: ${err}`)
    }
  }

  async update(order: Order): Promise<Order | undefined> {
    try{
      const sql = `
      UPDATE orders
      SET  user_id = $2, status = $3
      WHERE id = $1;
      `
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [order.id, order.user_id, order.status])

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


}
