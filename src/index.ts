import express from 'express'
import productRoutes from './handler/products'

export const app = express()
export const port = 3000

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World')
})


productRoutes(app)

app.get('/articles', (req: express.Request, res: express.Response) => {
    try {
        res.send('this is the INDEX route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})
