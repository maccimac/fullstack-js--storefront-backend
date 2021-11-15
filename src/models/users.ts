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

export type Status = {
  status: string
  status_msg: string
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

  async show(id: string | number): Promise<User> {

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
    // console.log(hash)

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

  async update(username: string, user: User): Promise<User | null> {
    const hash = bcrypt.hashSync( user.password + bcryptPw, saltRounds)

    try{
      const sql = `
      UPDATE users
      SET username = $1, firstname = $2, lastname = $3, password_digest = $4
      WHERE username = '${username}';
      `
      // @ts-ignore
      const conn = await Client.connect()
      const result = await conn.query(sql, [user.username, user.firstname, user.lastname, hash])
      conn.release()

      if(result.rowCount){
        return {
          username: username,
          firstname: user.firstname,
          lastname: user.lastname,
          password_digest: hash
        }
      }else{
        return null
      }

    }catch(err){
      throw new Error(`Could not edit user ${username}. Error: ${err}`)
    }
  }

  async authenticate(username: string, password: string): Promise<User | null >{
    const conn = await Client.connect()
    const sql = 'SELECT * FROM users WHERE username=($1)'
    const result = await conn.query(sql,[username])

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

  async delete(username: string): Promise<Status> {
    try {
      const sql = 'DELETE FROM users WHERE username=($1)'
        const conn = await Client.connect()
        const result = await conn.query(sql, [username])
        // console.log(result)
        conn.release()
        if (result.rowCount > 0 ) {
          return {
            status: 'success',
            status_msg: `successfully deleted user ${username} `
          }
        } else{
          return {
            status: 'error',
            status_msg: `cannot delete user ${username} `
          }
        }
    } catch (err) {
        throw new Error(`Could not delete user ${username}. Error: ${err}`)
    }
  }
}
