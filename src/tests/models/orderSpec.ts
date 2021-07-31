import { ProductStore } from './../../models/product'
import { StoreOrder } from '../../models/order'
import supertest from 'supertest'
import app from '../../server'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

const orders = new StoreOrder()
const products = new ProductStore()
dotenv.config()

describe('order model testing', () => {
  it('should have a index method', () => {
    expect(orders.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(orders.create).toBeDefined()
  })

  it('should have a addProduct method', () => {
    expect(orders.addProduct).toBeDefined()
  })

  it('show method should return active orders', async () => {
    const result = await orders.show('1', 'active')
    expect(result).toEqual([
      {
        id: 1,
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
        user_id: 1,
        order_status: 'complete',
      },
    ])
  })

  it('create method should return order', async () => {
    const result = await orders.create({
      userId: 1,
      orderStatus: 'active',
    })
    expect(result).toEqual({
      id: 3,
      user_id: 1,
      order_status: 'active',
    })
  })

  it('addProduct method should return order-products', async () => {
    const result = await orders.addProduct(100, 1, 1)
    expect(result).toEqual({
      id: 1,
      product_id: '1',
      order_id: '1',
      quantity: 100,
    })
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

  it('POST create new order', async () => {
    const response = await request
      .post('/api/orders')
      .set('Authorization', 'Bearer ' + token)
      .send({
        user_id: 1,
        order_status: 'active',
      })
    expect(response.status).toBe(200)
  })

  it('POST add product to order', async () => {
    const response = await request
      .post('/api/orders')
      .set('Authorization', 'Bearer ' + token)
      .send({
        product_id: 3,
        user_id: 1,
        order_status: 'active',
      })
    expect(response.status).toBe(200)
  })

  it('POST add product to order with quantity', async () => {
    const response = await request
      .post('/api/orders/1/products')
      .set('Authorization', 'Bearer ' + token)
      .send({
        product_id: 1,
        quantity: 100,
      })
    expect(response.status).toBe(200)
  })
})
