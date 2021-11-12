// @ts-ignore
import Client from '../database'

export type Product = {
  id?: number
  name: string
  price: number
  brand?: string
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products'
      const result = await conn.query(sql)
      conn.release()
      return result.rows

    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  async show(id: string | number): Promise<Product | undefined > {
    try {
        const sql = 'SELECT * FROM products WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()

        const result = await conn.query(sql, [id])

        conn.release()

        return result.rows[0]
    } catch (err) {
        const err_msg = `Could not get products ${id}. Error: ${err}`
        throw new Error(err_msg)
        // return err_msg
    }
  }

  async create(product: Product): Promise<Product> {
    try {
        const sql = 'INSERT INTO products (name, price, brand) VALUES($1, $2, $3) RETURNING *'
        // @ts-ignore
        const conn = await Client.connect()

        const result = await conn.query(sql, [product.name, product.price, product.brand])

        const targetProduct = result.rows[0]

        conn.release()

        return targetProduct
    } catch (err) {
        throw new Error(`Could not add product ${product.name}. Error: ${err}`)
    }
  }

  async update(product: Product): Promise<Product | undefined> {
    try{
      const sql = `
      UPDATE products
      SET name = $2, price = $3, brand = $4
      WHERE id = $1;
      `
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [product.id, product.name, product.price, product.brand])

      conn.release()

      if(result.rowCount){
        const resolvedId = `${product.id}`
        const targetProduct = await this.show(resolvedId)
        return targetProduct
      }

    }catch(err){
      throw new Error(`Could not edit product ${product.name}. Error: ${err}`)
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()

        const result = await conn.query(sql, [id])

        const product = result.rows[0]

        conn.release()

        return product
    } catch (err) {
        throw new Error(`Could not delete product ${id}. Error: ${err}`)
    }
  }
}
