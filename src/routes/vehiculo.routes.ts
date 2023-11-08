import { Router } from "express";
import { VehiculoController } from "../controllers";
import { tokenValidation } from "../middlewares";


export class VehiculoRoutes{
  
  static get router():Router{
    const route = Router();
    const vehiculoController = new VehiculoController();
    
    route.get("/",[
      tokenValidation
    ],vehiculoController.mostrarVehiculos);


    return route;
  }
}