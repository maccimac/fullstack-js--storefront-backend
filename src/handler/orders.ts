import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/orders'
import { verifyAuth } from './auth'

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
  const orders = await store.index()
  res.json(orders)
}

const show = async (req: Request, res: Response) => {
   const order = await store.show(req.params.id)
   res.json(order)
}

const create = async (req: Request, res: Response) => {

    try {
        const order: Order = {
            user_id: req.body.user_id,
            status: req.body.status
        }

        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const resolvedId = parseInt(req.params.id);
        console.log(resolvedId)
        const order: Order = {
            id: resolvedId,
            user_id: req.body.user_id,
            status: req.body.status
        }

        const newOrder = await store.update(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}


const orderRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuth, index)
  app.get('/order/:id', verifyAuth, show)
  app.post('/order', verifyAuth, create)
  app.put('/order/:id', verifyAuth, update)
  app.delete('/order', verifyAuth, destroy)

}

export default orderRoutes
