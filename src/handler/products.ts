import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/products'
import { verifyAuth } from './auth'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
  const products = await store.index()
  res.json(products)
}

const show = async (req: Request, res: Response) => {
   const product = await store.show(req.params.id)
   res.json(product)
}

const create = async (req: Request, res: Response) => {

    try {
        const product: Product = {
            // id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            brand: req.body.brand,
        }

        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const resolvedId = parseInt(req.params.id);
        console.log(resolvedId)
        const product: Product = {
            id: resolvedId,
            name: req.body.name,
            price: req.body.price,
            brand: req.body.brand,
        }

        const newProduct = await store.update(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const productRoutes = (app: express.Application) => {
  app.get('/products', verifyAuth, index)
  app.get('/product/:id', show)
  app.post('/product', verifyAuth, create)
  app.put('/product/:id', verifyAuth, update)
  app.delete('/product', verifyAuth, destroy)

  // app.get('/auth', authenticate)
}

export default productRoutes
