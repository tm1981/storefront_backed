import client from '../database'

export type Order = {
  id?: number
  productId: number
  quantity: number
  userId: string
  orderStatus: string
}

export class StoreOrder {
  async show(userId: string, orderStatus: string): Promise<Order[] | Object> {
    if (client === null) {
      return { error: 'Could not connect to database' }
    }
    try {
      const sql =
        'SELECT * FROM orders WHERE user_id=($1) and order_status=($2)'
      const conn = await client.connect()
      const result = await conn.query(sql, [userId, orderStatus])
      conn.release()
      if (result.rowCount === 0) {
        return { error: 'No orders was found for the user' }
      }
      return result.rows
    } catch (err) {
      return { error: `Could not find Orders for ${userId}. Error: ${err}` }
    }
  }
}
