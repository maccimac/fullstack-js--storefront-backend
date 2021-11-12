import Client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const bcryptPw: string = process.env.BCRYPT_PW as string
const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string)

export type User = {
  id?: number
  username: string
  firstname?: string
  lastname?: string
  password_digest?: string
  password?: string

}

export type UserLogin = {
  username: string
  password: string
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: string): Promise<User> {
    console.log(id)
    try {
        const sql = 'SELECT * FROM users WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()

        const result = await conn.query(sql, [id])

        conn.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not get user ${id}. Error: ${err}`)
    }
  }

  async create(user: User): Promise<User> {
    const hash = bcrypt.hashSync( user.password + bcryptPw, saltRounds)
    console.log(hash)

    try {
        const sql = 'INSERT INTO users (username, firstname, lastname, password_digest) VALUES($1, $2, $3, $4) RETURNING *'
        // @ts-ignore
        const conn = await Client.connect()

        const result = await conn.query(sql, [user.username, user.firstname, user.lastname, hash])

        const article = result.rows[0]

        conn.release()

        return article
    } catch (err) {
        throw new Error(`Could not add user ${name}. Error: ${err}`)
    }
  }

  async authenticate(username: string, password: string): Promise<User | null >{
    const conn = await Client.connect()
    const sql = 'SELECT * FROM users WHERE username=($1)'
    const result = await conn.query(sql,[username])
    console.log(password+bcryptPw)
    console.log(result)

    if(result.rows.length){
      const targetUser = result.rows[0]

      if(bcrypt.compareSync(password+bcryptPw, targetUser.password_digest)){

        return targetUser
      }else{
        return null
      }
    } else {
      return null
    }

  }

  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()

        const result = await conn.query(sql, [id])

        const targetUser = result.rows[0]

        conn.release()

        return targetUser
    } catch (err) {
        throw new Error(`Could not delete user ${id}. Error: ${err}`)
    }
  }
}
