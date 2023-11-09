import { Response, Request,  NextFunction } from "express";
import { UploadedFile } from "express-fileupload";

export const validarVehiculo = (req:Request,res:Response,next: NextFunction)=>{
  const img = req.files?.img as UploadedFile;
  if(!img) return res.status(400).json({
    msg: "Ingrese alguna imagen para su vehiculo"
  }); 
  req.imgVehiculo = img;
  next();
}