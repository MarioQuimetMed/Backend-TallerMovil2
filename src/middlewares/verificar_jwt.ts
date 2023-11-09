import jwt,{JwtPayload} from 'jsonwebtoken';
import { Response, Request,  NextFunction } from "express";

import {envs} from '../config/envs'

export const tokenValidation = (req: Request, res: Response, next: NextFunction)=>{
  const token = req.header('auth-token');
  if(!token) return res.status(401).json('Access denied');
  if (!envs.KEY_JWT) {
    return res.status(500).json("Server error");
  }
  const payload = jwt.verify(token, envs.KEY_JWT) as JwtPayload;
  req.userId = Number(payload.Uid);
  next();
}