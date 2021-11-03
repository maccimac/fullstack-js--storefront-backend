import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
  HOST, DB, DB_TEST, USER, PASSWORD, ENV
} = process.env

let client
console.log(ENV)

client = new Pool({
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
