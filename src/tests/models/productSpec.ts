import { ProductStore } from '../../models/product'
import supertest from 'supertest'
import app from '../../server'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

const products = new ProductStore()
dotenv.config()

describe('product model testing', () => {
  it('should have a index method', () => {
    expect(products.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(products.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(products.create).toBeDefined()
  })

  it('create method should add a product', async () => {
    const result = await products.create({
      title: 'iPhone 12',
      price: 1000,
      partNumber: 'iphone-12',
    })
    expect(result).toEqual({
      id: 1,
      title: 'iPhone 12',
      part_number: 'iphone-12',
      price: 1000,
    })
  })

  it('index method should return a list of products', async () => {
    const result = await products.index()
    expect(result).toEqual([
      {
        id: 1,
        title: 'iPhone 12',
        part_number: 'iphone-12',
        price: 1000,
      },
    ])
  })

  it('show method should return the correct product', async () => {
    const result = await products.show('1')
    expect(result).toEqual({
      id: 1,
      title: 'iPhone 12',
      part_number: 'iphone-12',
      price: 1000,
    })
  })
})

const request = supertest(app)

describe('Test Product endpoints', () => {
  let token: string
  beforeAll(() => {
    token = jwt.sign('test1', process.env.TOKEN_SECRET as string)
  })

  it('GET all products', async () => {
    const response = await request.get('/api/products')
    expect(response.status).toBe(200)
  })

  it('GET product by id', async () => {
    const response = await request.get('/api/products/1')
    expect(response.status).toBe(200)
  })

  it('add product', async () => {
    const response = await request
      .post('/api/products/')
      .set('Authorization', 'Bearer ' + token)
      .send({
        name: 'playstation',
        price: '1000',
        part_number: 'playstation-1',
      })
    expect(response.status).toBe(200)
  })

  it('trying to add product without token', async () => {
    const response = await request.post('/api/products/').send({
      name: 'playstation',
      price: '1000',
      part_number: 'playstation-1',
    })
    expect(response.status).toBe(401)
  })
})
