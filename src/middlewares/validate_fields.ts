import { 
  Request,
  Response,
  NextFunction } from "express";

import { 
  validationResult
} from 'express-validator'


export const validateFields = (req: Request, res: Response,next: NextFunction) =>{
  const errores = validationResult(req).array();
  if(errores.length > 0){
    return res.status(400).json({
      errores
    });
  }
  next();
}