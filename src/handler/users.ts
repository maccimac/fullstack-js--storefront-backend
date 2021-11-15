import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

import { User, UserStore } from '../models/users'
dotenv.config()

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
    try {
        const user: User = req.body

        const newUser = await store.create(user)
        const token = jwt.sign({user: newUser}, process.env.JWT_TOKEN_SECRET as string)
        res.json({
          user: newUser,
          token,
        })

    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const username = req.params.username
        const newUserCred: User = req.body

        const updatedUser = await store.update(username, newUserCred)
        const token = jwt.sign({user: updatedUser}, process.env.JWT_TOKEN_SECRET as string)

        if(Boolean(updatedUser)){
          res.json({
            user: updatedUser,
            token,
          })

        }else{
          res.json(`cannot update user ${username}`)
        }

    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const authenticate = async (req: Request, res: Response) => {
    const user = await store.authenticate(req.query.username as string, req.query.password as string)

    if (user){
      const token = jwt.sign({user: user}, process.env.JWT_TOKEN_SECRET as string)
      res.json({
        token,
        user,
      })
    }else{
      res.json(null)
    }


}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.username)
    res.json(deleted)
}

const userRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/user/:username', show)
  app.put('/user/:username', update)
  app.post('/user', create)
  app.delete('/user', destroy)
  app.get('/auth', authenticate)
}

export default userRoutes
