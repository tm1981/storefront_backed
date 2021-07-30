import client from '../database'

export type Product = {
  id?: number
  title: string
  price: number
  partNumber?: string
}

export class ProductStore {
  async index(): Promise<Object | Product[]> {
    if (client === null) {
      return { error: 'Could not connect to database' }
    }
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      return { error: `Could not get products. ${err}` }
    }
  }

  async show(id: string): Promise<Product | Object> {
    if (client === null) {
      return { error: 'Could not connect to database' }
    }
    try {
      const sql = 'SELECT * FROM Products WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      return { error: `Could not find product ${id}. Error: ${err}` }
    }
  }

  async create(p: Product): Promise<Product | object> {
    if (client === null) {
      return { error: 'Could not connect to database' }
    }
    try {
      const sql =
        'INSERT INTO products (title, price, part_number) VALUES($1, $2, $3) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [p.title, p.price, p.partNumber])

      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      return { error: `Could not add new product ${p.title}. Error: ${err}` }
    }
  }
}
