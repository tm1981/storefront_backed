import express, { Request, Response } from 'express'
import validateToken from '../middleware'
import { Product, ProductStore } from '../models/product'

const productStore = new ProductStore()

const index = async (_req: Request, res: Response) => {
  const products = await productStore.index()
  res.json(products)
}

const show = async (req: Request, res: Response) => {
  const product = await productStore.show(req.params.id)
  if (product === undefined) {
    res.json({ error: 'product not found' })
  } else {
    res.json(product)
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      title: req.body.title,
      price: req.body.price,
      partNumber: req.body.part_number,
    }

    const newProduct = await productStore.create(product)
    res.json(newProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const product_routes = (app: express.Application) => {
  app.get('/api/products', index)
  app.get('/api/products/:id', show)
  app.post('/api/products', validateToken, create)
}

export default product_routes
