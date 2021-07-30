import express, { Request, Response } from 'express'
import validateToken from '../middleware'
import { Order, StoreOrder } from '../models/order'

const storeOrder = new StoreOrder()

const activeOrders = async (req: Request, res: Response) => {
  const orders = await storeOrder.show(req.body.userid, 'active')
  res.json(orders)
}

const completeOrders = async (req: Request, res: Response) => {
  const orders = await storeOrder.show(req.body.userid, 'complete')
  res.json(orders)
}

const order_routes = (app: express.Application) => {
  app.get('/api/orders/active', validateToken, activeOrders)
  app.get('/api/orders/complete', validateToken, completeOrders)
}

export default order_routes
