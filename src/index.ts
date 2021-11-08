import express from 'express'
import bodyParser from 'body-parser'
import productRoutes from './handler/products'
import userRoutes from './handler/users'

export const app = express()
export const port = 3000

// app.configure(function(){
//
// });
// app.use(bodyParser());
app.use(express.json());



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World')
})


productRoutes(app)

app.get('/products', (req: express.Request, res: express.Response) => {
    try {
        res.send('this is the INDEX route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

userRoutes(app)

app.get('/user/:id', (req: express.Request, res: express.Response) => {
    try {
       res.send('this is the SHOW route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})

// app.get('/users', (req: express.Request, res: express.Response) => {
//     try {
//         res.send('this is the INDEX route')
//     } catch (err) {
//         res.status(400)
//         res.json(err)
//     }
// })
