import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { OrderSummary, DashboardQueries } from '../services/dashboard'
import { verifyAuth } from './auth'

const dashboard = new DashboardQueries()

const productsInOrders = async (_req: Request, res: Response) => {
  const products = await dashboard.productsInOrders()
  res.json(products)
}
const productsByPrice = async (_req: Request, res: Response) => {
  const products = await dashboard.productsByPrice()
  res.json(products)
}

const fetchProductOrder = async (req: Request, res: Response) => {
  console.log(req.params)
  const resolvedOrderStatus = req.params.orderStatus ? req.params.orderStatus : false
  const orders = await dashboard.fetchProduct(req.params.productId, resolvedOrderStatus)
   res.json(orders)
}


const dashboardRoutes = (app: express.Application) => {
  app.get('/orders/products', productsInOrders)
  app.get('/orders/product/:productId', fetchProductOrder)
  app.get('/orders/product/:productId/:orderStatus', fetchProductOrder)
  app.get('/products/byPrice', productsByPrice)
}

export default dashboardRoutes
