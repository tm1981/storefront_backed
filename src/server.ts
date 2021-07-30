import express, { Request, Response } from 'express'
import order_routes from './handlers/order'
import product_routes from './handlers/products'
import user_routes from './handlers/user'

const app: express.Application = express()
const address: string = '0.0.0.0:3000'

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Nothing here, read the instructions')
})

product_routes(app)
order_routes(app)
user_routes(app)

app.listen(3000, () => {
  console.log(`starting app on: ${address}`)
})

export default app
