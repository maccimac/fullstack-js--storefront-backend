import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

export const verifyAuth = async(req: Request, res: Response, next: NextFunction) =>{
  try{
    const authHeader = req.headers.authorization
    const jwtVerification = jwt.verify(authHeader as string, process.env.JWT_TOKEN_SECRET as string)
  
    if(jwtVerification) {
      next()
    }

  } catch(err){
    res.status(401)
    res.json('Access denied, invalid token')
    return
  }
}
