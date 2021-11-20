import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { OrderSummary, DashboardQueries } from '../services/dashboard'
import { verifyAuth } from './auth'

const dashboard = new DashboardQueries()

const productsInOrders = async (req: Request, res: Response) => {
  const orderId = req.params.id
  const products = await dashboard.productsInOrders(orderId)
  res.json(products)
}

const userInOrder = async (req: Request, res: Response) => {
  const userId = req.params.id
  const products = await dashboard.orderUser(userId)
  res.json(products)
}

const productsByPrice = async (_req: Request, res: Response) => {
  const products = await dashboard.productsByPrice()
  res.json(products)
}

const dashboardRoutes = (app: express.Application) => {
  app.get('/order/:id/products', verifyAuth, productsInOrders)
  app.get('/order/:id/user', verifyAuth, userInOrder)
  app.get('/products/byPrice', productsByPrice)
}


export default dashboardRoutes
