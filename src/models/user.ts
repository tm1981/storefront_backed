import client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

export type User = {
  id?: number
  firstName: string //first name is the username
  lastName: string
  password: string
}

dotenv.config()
const pepper = process.env.BCRYPT_PASSWORD
const saltRounds = process.env.SALT_ROUNDS as string

export class Users {
  async index(): Promise<Object | User[]> {
    if (client === null) {
      return { error: 'Could not connect to database' }
    }
    try {
      const conn = await client.connect()
      const sql = 'SELECT id,firstname,lastname FROM users'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      return { error: `Could not get users. ${err}` }
    }
  }

  async show(id: string): Promise<User | Object> {
    if (client === null) {
      return { error: 'Could not connect to database' }
    }
    try {
      const sql = 'SELECT id,firstname,lastname FROM users WHERE id=($1)'

      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      if (result.rowCount === 0) {
        return { error: `Could not find user with id ${id}` }
      }
      return result.rows[0]
    } catch (err) {
      return { error: `Could not find user with id ${id}. Error: ${err}` }
    }
  }

  async create(u: User): Promise<Object> {
    if (client === null) {
      return { error: 'Could not connect to database' }
    }
    try {
      const sql =
        'INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *'
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds))
      const conn = await client.connect()
      if (
        u.firstName === undefined ||
        u.lastName === undefined ||
        u.password === undefined
      ) {
        return { error: 'all field are required' }
      }

      if (u.password.length < 4) {
        return { error: 'Invalid password, minimum 4 charcters required' }
      }

      const result = await conn.query(sql, [u.firstName, u.lastName, hash])
      const id = result.rows[0].id
      conn.release()
      if (id > 0) {
        //user added to db, return token
        const token = jwt.sign(u.firstName, process.env.TOKEN_SECRET as string)
        return { token: token }
      } else {
        return { error: 'unknown error' }
      }
    } catch (err) {
      return {
        error: `Could not add new user: ${u.firstName} ${u.lastName}. Error: ${err}`,
      }
    }
  }

  async login(username: string, password: string): Promise<Object> {
    if (client === null) {
      return { error: 'Could not connect to database' }
    }
    const conn = await client.connect()
    const sql = 'SELECT * FROM users WHERE firstname=($1)'
    const result = await conn.query(sql, [username])

    if (result.rows.length) {
      const user = result.rows[0]
      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        const token = jwt.sign(
          user.firstname,
          process.env.TOKEN_SECRET as string
        )
        return { token: token }
      } else {
        return { error: 'Invalid username or password, please try again' }
      }
    } else {
      return { error: 'Unkown error' }
    }
  }
}
