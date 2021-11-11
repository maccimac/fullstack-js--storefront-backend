import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import express, { Request, Response, NextFunction } from 'express'
import { Product, ProductStore } from '../models/products'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
  const products = await store.index()
  res.json(products)
}

const show = async (req: Request, res: Response) => {
   const article = await store.show(req.body.id)
   res.json(article)
}

const verifyAuth = async(req: Request, res: Response, next: NextFunction) =>{
  // console.log(req.headers)
  try{
    const authHeader = req.headers.authorization
    // const bodyToken = req.body.token
    // const token = authHeader.split(' ')[1]
    // jwt.verify(token, process.env.JWT_TOKEN_SECRET as string)
    const jwtVerification = jwt.verify(authHeader as string, process.env.JWT_TOKEN_SECRET as string)
    console.log({jwtVerification})
    if(jwtVerification) {
      next()
    }

  } catch(err){
    res.status(401)
    res.json('Access denied, invalid token')
    return
  }
}

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        }

        const newProduct = await store.create(product)
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
  app.get('/products',verifyAuth, index)
  app.get('/products/:id', show)
  app.post('/products', verifyAuth, create)
  app.delete('/products', destroy)

  // app.get('/auth', authenticate)
}

export default productRoutes
