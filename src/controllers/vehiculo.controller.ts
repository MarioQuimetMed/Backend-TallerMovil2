import {Request,Response} from 'express'
import { vehiculo } from '../libs/prisma';

export class VehiculoController{
  constructor(){}

  public async mostrarVehiculos(req:Request,res:Response){
    const userId = req.userId;
    try {
      const [total, vehiculos] = await Promise.all([
        vehiculo.count(),
        vehiculo.findMany({
          where:{
            clienteId: userId
          },
          select:{
            id: true,
            marca: true,
            modelo: true,
            placa: true,
            year: true,
            img: true
          }
        })
      ]);
      return res.status(200).json({
        total,
        vehiculos
      })
    } catch (err) {
      console.log(err);
      return res.status(404).json(err)
    }
  }

}