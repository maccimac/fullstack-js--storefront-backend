import express, { Request, Response } from 'express'
import { ProductStore } from '../models/products'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
  const products = await store.index()
  res.json(products)
}

/*const show = async (req: Request, res: Response) => {
   const article = await store.show(req.body.id)
   res.json(article)
}

const create = async (req: Request, res: Response) => {
    try {
        const article: Article = {
            title: req.body.title,
            content: req.body.content,
        }

        const newArticle = await store.create(article)
        res.json(newArticle)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}*/

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  /*app.get('/articles/:id', show)
  app.post('/articles', create)
  app.delete('/articles', destroy)*/
}

export default productRoutes
