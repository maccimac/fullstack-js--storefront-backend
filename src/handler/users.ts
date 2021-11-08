import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/users'
import bodyParser from 'body-parser'

// var jsonParser = bodyParser.json()
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
  const users = await store.index()
  res.json(users)
}

const show = async (req: Request, res: Response) => {

   const user = await store.show(req.params.id)
   res.json(user)
}

const create = async (req: Request, res: Response) => {
    console.log(req)
    try {
        const user: User = req.body
        console.log(user)

        const newUser = await store.create(user)
        res.json(newUser)

    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const authenticate = async (req: Request, res: Response) => {
    console.log(req)
    const user = await store.authenticate(req.query.username as string, req.query.password as string)
    res.json(user)
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const productRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', create)
  app.delete('/users', destroy)

  app.get('/auth', authenticate)
}

export default productRoutes
