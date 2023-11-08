import {Request,Response} from 'express'
import {PrismaClient,} from '@prisma/client'
import {v4} from 'uuid'
import { UploadedFile } from "express-fileupload";

import { vehiculo } from '../libs/prisma';
import { IBodyVehiculo } from '../interface';
import { agregarVehiculo } from '../libs/agregar_vehiculo';



const prismaCliente = new PrismaClient();
export class VehiculoController{
  constructor(){}

  //muestra los vehiculos del cliente
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

  //crea un vehiculo de algun cliente
  public async crearVehiculo(req:Request,res:Response) {
    const imgVehiculo = req.imgVehiculo as UploadedFile;
    const userId = req.userId;
    const {marca,modelo,placa,year}: IBodyVehiculo = req.body; 
    try {
      //verifico que no existan placas iguales
      const vehiculoDB = await vehiculo.findFirst({
        where: {
          clienteId: userId,
          placa
        }
      })
      if(vehiculoDB) return res.status(400).json({
        msg: "Ingrese una nueva placa."
      })
      //si no existen entonces procedo a agregar el vehiculo al cliente
      const response = await prismaCliente.$transaction(async(tx)=>{
        //pongo el nombre de la imagen
        const imgName = `${v4()}.${imgVehiculo.name.split(".")[1]}`;
        const vehiculoCreate = await tx.vehiculo.create({
          data:{
            img: imgName,
            marca,
            modelo,
            placa,
            year,
            clienteId: userId
          }
        });
        //inserto la imagen a mi blob de azure
        await agregarVehiculo(imgVehiculo,imgName.split(".")[0]);
        return vehiculoCreate;
      })
      return res.status(201).json({
        msg:"Se ha agregado un vehiculo a su cuenta",
        vehiculo: response
      });
    } catch (err) {
      console.log(err);
      return res.status(404).json(err)
    }
  }
}