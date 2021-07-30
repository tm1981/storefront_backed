import { StoreOrder } from '../../models/order'
import supertest from 'supertest'
import app from '../../server'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

const orders = new StoreOrder()
dotenv.config()

describe('order model testing', () => {
  it('should have a index method', () => {
    expect(orders.show).toBeDefined()
  })

  it('show method should return active orders', async () => {
    const result = await orders.show('1', 'active')
    expect(result).toEqual([
      {
        id: 1,
        product_id: 1,
        quantity: 1,
        user_id: 1,
        order_status: 'active',
      },
    ])
  })

  it('show method should return complete orders', async () => {
    const result = await orders.show('1', 'complete')
    expect(result).toEqual([
      {
        id: 2,
        product_id: 2,
        quantity: 1,
        user_id: 1,
        order_status: 'complete',
      },
    ])
  })
})

const request = supertest(app)

describe('Test Order endpoints', () => {
  let token: string
  beforeAll(() => {
    token = jwt.sign('test1', process.env.TOKEN_SECRET as string)
  })

  it('GET active orders', async () => {
    const response = await request
      .get('/api/orders/active')
      .set('Authorization', 'Bearer ' + token)
      .send({
        userid: 1,
      })
    expect(response.status).toBe(200)
  })

  it('GET complete orders', async () => {
    const response = await request
      .get('/api/orders/complete')
      .set('Authorization', 'Bearer ' + token)
      .send({
        userid: 1,
      })
    expect(response.status).toBe(200)
  })
})
