import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const validateToken = async (req: Request, res: Response, next: Function) => {
  try {
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader === undefined) {
      res.status(401)
      res.json({ error: 'Access denied, invalid token' })
      return
    } else {
      const token = authorizationHeader.split(' ')[1]
      jwt.verify(token, process.env.TOKEN_SECRET as string)
      next()
    }
  } catch (err) {
    res.status(401)
    res.json({ error: 'Access denied, invalid token' })
    return
  }
}

export default validateToken
