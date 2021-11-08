import dotenv from 'dotenv'
import { Pool, PoolConfig } from 'pg'

dotenv.config()

export const {
  HOST, DB, DB_TEST, USER, PASSWORD, ENV, BCRYPT_PW, SALT_ROUNDS
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

/*if(ENV === 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
}

if(ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
}*/

export default client
