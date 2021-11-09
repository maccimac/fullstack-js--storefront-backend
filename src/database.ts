import dotenv from 'dotenv'
import { Pool, PoolConfig } from 'pg'

dotenv.config()

const {
  HOST, DB, DB_TEST, USER, PASSWORD, ENV, BCRYPT_PW, SALT_ROUNDS, JWT_TOKEN_SECRET
} = process.env

// export const BCRYPT_PW: string = process.env.BCRYPT_PW
// export const SALT_ROUNDS: string = process.env.SALT_ROUNDS

console.log(ENV)

const client = new Pool({
  host: HOST,
  database: ENV == 'dev' ? DB : DB_TEST,
  user: USER,
  password: PASSWORD,
})



export default client
