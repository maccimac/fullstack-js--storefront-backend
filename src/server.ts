import express from 'express'
import bodyParser from 'body-parser'
import productRoutes from './handler/products'
import userRoutes from './handler/users'
import orderRoutes from './handler/orders'
import orderProductsRoutes from './handler/order-products'
import dashboardRoutes from './handler/dashboard'

export const app = express()
export const port = 3000

app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World')
})


productRoutes(app)
userRoutes(app)
orderRoutes(app)
orderProductsRoutes(app)
dashboardRoutes(app)
