// @ts-ignore
import Client from '../database'

export type OrderProduct = {
  id?: number
  order_id: number
  product_id: number
  quantity: number
}

export type Status = {
  status: string
  status_msg: string
}

export class OrderProductsStore {
  async index(): Promise<OrderProduct[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM order_products'
      const result = await conn.query(sql)
      conn.release()
      return result.rows

    } catch (err) {
      throw new Error(`Could not get product orders. Error: ${err}`)
    }
  }

  async show(id: string | number): Promise<OrderProduct | undefined > {
    try {
        const sql = 'SELECT * FROM order_products WHERE id=($1)'
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

  async create(orderProducts: OrderProduct): Promise<OrderProduct> {
    try {
        const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'
        const conn = await Client.connect()

        const result = await conn.query(sql, [orderProducts.order_id, orderProducts.product_id, orderProducts.quantity])
        conn.release()
        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not add product #${orderProducts.product_id} to order #${orderProducts.order_id}. Error: ${err}`)
    }
  }

  async update(orderProducts: OrderProduct): Promise<OrderProduct | undefined> {
    try{
      const sql = `
      UPDATE order_products
      SET  order_id=$2, product_id = $3, quantity = $4
      WHERE id = $1;
      `
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [orderProducts.id, orderProducts.order_id, orderProducts.product_id, orderProducts.quantity])

      conn.release()

      if(result.rowCount){
        const resolvedId = `${orderProducts.id}`
        const targetOrder = await this.show(resolvedId)
        return targetOrder
      }

    }catch(err){
      throw new Error(`Could not edit order ${orderProducts.id}. Error: ${err}`)
    }
  }

  async delete(id: number): Promise<Status> {
    try {
      const sql = 'DELETE FROM order_products WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()

        const result = await conn.query(sql, [id])
        conn.release()

        if (result.rowCount > 0 ) {
          return {
            status: 'success',
            status_msg: `successfully deleted order no.${id} `
          }
        } else{
          return {
            status: 'error',
            status_msg: `cannot delete order no.${id} `
          }
        }
    } catch (err) {
        throw new Error(`Could not delete order ${id}. Error: ${err}`)
    }
  }

}
