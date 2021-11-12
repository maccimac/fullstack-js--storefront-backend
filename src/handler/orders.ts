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
            product_id: req.body.product_id,
            user_id: req.body.user_id,
            quantity: req.body.quantity,
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
            product_id: req.body.product_id,
            user_id: req.body.user_id,
            quantity: req.body.quantity,
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
  app.get('/order/:id', show)
  app.post('/order', verifyAuth, create)
  app.put('/order/:id', verifyAuth, update)
  app.delete('/order', destroy)

  // app.get('/auth', authenticate)
}

export default orderRoutes
