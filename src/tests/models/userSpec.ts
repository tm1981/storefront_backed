import { Users } from '../../models/user'
import supertest from 'supertest'
import app from '../../server'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const users = new Users()
dotenv.config()

describe('user model testing', () => {
  let token: string
  let password_digest: string
  const pepper = process.env.BCRYPT_PASSWORD
  const saltRounds = process.env.SALT_ROUNDS as string
  beforeAll(() => {
    token = jwt.sign('test1', process.env.TOKEN_SECRET as string)
    password_digest = bcrypt.hashSync('12345678' + pepper, parseInt(saltRounds))
  })

  it('should have a index method', () => {
    expect(users.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(users.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(users.create).toBeDefined()
  })

  it('should have a login method', () => {
    expect(users.login).toBeDefined()
  })

  it('create method should add a user and return token', async () => {
    const result = await users.create({
      firstName: 'test1',
      lastName: 'test2',
      password: '12345678',
    })
    expect(result).toEqual({
      token: token,
    })
  })

  it('index method should return a list of users', async () => {
    const result = await users.index()
    expect(result).toEqual([
      {
        id: 1,
        firstname: 'test1',
        lastname: 'test2',
      },
    ])
  })

  it('show method should return the user by id', async () => {
    const result = await users.show('1')
    expect(result).toEqual({
      id: 1,
      firstname: 'test1',
      lastname: 'test2',
    })
  })

  it('login method should return token', async () => {
    const result = await users.login('test1', '12345678')
    expect(result).toEqual({
      token: token,
    })
  })
})

const request = supertest(app)

describe('Test User endpoints', () => {
  let token: string
  beforeAll(() => {
    token = jwt.sign('test', process.env.TOKEN_SECRET as string)
  })

  it('GET all users', async () => {
    const response = await request
      .get('/api/user')
      .set('Authorization', 'Bearer ' + token)
    expect(response.status).toBe(200)
  })

  it('GET user by id', async () => {
    const response = await request
      .get('/api/user/1')
      .set('Authorization', 'Bearer ' + token)
    expect(response.status).toBe(200)
  })

  it('add user', async () => {
    const response = await request
      .post('/api/user/')
      .set('Authorization', 'Bearer ' + token)
      .send({
        firstname: 'test3',
        lastname: 'test4',
        password: '12345678',
      })
    expect(response.status).toBe(200)
  })

  it('login in', async () => {
    const response = await request.get('/api/login/').send({
      firstname: 'test3',
      password: '12345678',
    })
    expect(response.status).toBe(200)
  })
})
