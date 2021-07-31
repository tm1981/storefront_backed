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

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      userId: req.body.user_id,
      orderStatus: req.body.order_status,
    }
    const newOrder = await storeOrder.create(order)
    res.json(newOrder)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const addProduct = async (req: Request, res: Response) => {
  const orderId: number = parseInt(req.params.id)
  const productId: number = parseInt(req.body.product_id)
  const quantity: number = parseInt(req.body.quantity)
  try {
    const addProduct = await storeOrder.addProduct(quantity, orderId, productId)
    res.json(addProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const order_routes = (app: express.Application) => {
  app.get('/api/orders/active', validateToken, activeOrders)
  app.get('/api/orders/complete', validateToken, completeOrders)
  app.post('/api/orders/', validateToken, create)
  app.post('/api/orders/:id/products', validateToken, addProduct)
}

export default order_routes
