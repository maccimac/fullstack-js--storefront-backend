import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { OrderProduct, OrderProductsStore } from '../models/order-products'
import { verifyAuth } from './auth'

const store = new OrderProductsStore()

const index = async (_req: Request, res: Response) => {
  const orderProducts = await store.index()
  res.json(orderProducts)
}

const show = async (req: Request, res: Response) => {
   const orderProduct = await store.show(req.params.id)
   res.json(orderProduct)
}

const create = async (req: Request, res: Response) => {

    try {
        const orderProduct: OrderProduct = {
            order_id: req.body.order_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity,

        }

        const newOrderProducts = await store.create(orderProduct)
        res.json(newOrderProducts)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const resolvedId = parseInt(req.params.id);
        
        const orderProduct: OrderProduct = {
            id: resolvedId,
            order_id: req.body.order_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
        }

        const newOrderProducts = await store.update(orderProduct)
        res.json(newOrderProducts)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}


const orderProductsRoutes = (app: express.Application) => {
  app.get('/orderProducts', index)
  app.get('/orderProduct/:id', verifyAuth, show)
  app.post('/orderProduct', verifyAuth, create)
  app.put('/orderProduct/:id', verifyAuth, update)
  app.delete('/orderProduct', verifyAuth, destroy)

}

export default orderProductsRoutes
