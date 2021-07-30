import express, { Request, Response } from 'express'
import { User, Users } from '../models/user'
import validateToken from '../middleware'
import dotenv from 'dotenv'

const users = new Users()
dotenv.config()

const index = async (_req: Request, res: Response) => {
  const userList = await users.index()
  if (userList.hasOwnProperty('error')) {
    res.status(400)
  }
  res.json(userList)
}

const show = async (req: Request, res: Response) => {
  const user = await users.show(req.params.id)
  if (user.hasOwnProperty('error')) {
    res.status(400)
  }
  res.json(user)
}

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      password: req.body.password,
    }

    const newUser = await users.create(user)
    if (newUser.hasOwnProperty('error')) {
      res.status(400)
    }
    res.json(newUser)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
//login method
const getToken = async (req: Request, res: Response) => {
  try {
    const firstname = req.body.firstname
    const password = req.body.password
    const response = await users.login(firstname, password)
    if (response.hasOwnProperty('error')) {
      res.status(400)
    }
    res.json(response)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const user_routes = (app: express.Application) => {
  app.get('/api/user', validateToken, index)
  app.get('/api/user/:id', validateToken, show)
  app.post('/api/user', validateToken, create)
  app.get('/api/login', getToken)
}

export default user_routes
