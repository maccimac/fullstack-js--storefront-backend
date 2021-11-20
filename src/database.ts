import dotenv from 'dotenv'
import { Pool, PoolConfig } from 'pg'

dotenv.config()

const {
  HOST, DB, DB_TEST, USER, PASSWORD, ENV, BCRYPT_PW, SALT_ROUNDS, JWT_TOKEN_SECRET
} = process.env


const client = new Pool({
  host: HOST,
  database: ENV == 'dev' ? DB : DB_TEST,
  user: USER,
  password: PASSWORD,
})



export default client
