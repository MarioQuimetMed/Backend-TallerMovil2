import { Router } from "express";
import { VehiculoController } from "../controllers";
import { tokenValidation, validarVehiculo, validateFields } from "../middlewares";
import { check } from "express-validator";


export class VehiculoRoutes{
  
  static get router():Router{
    //para manejar las rutas del vehiculo
    const route = Router();
    //controller del vehiculo
    const vehiculoController = new VehiculoController();
    
    //muestra los vehiculos de un cliente
    route.get("/",[
      tokenValidation
    ],vehiculoController.mostrarVehiculos);

    //para crear un vehiculo nuevo al cliente
    route.post("/",[
      check("marca","Inserte una marca valida.").notEmpty().isString().isLength({min:5}),
      check("modelo","Inserte una modelo valido.").notEmpty().isString().isLength({min:5}),
      check("placa","Inserte una placa valido.").notEmpty().isString().isLength({min:5}),
      check("year","Agregue un anho valido.").notEmpty().isString().isLength({max:4}),
      validateFields,
      tokenValidation,
      validarVehiculo
    ] ,vehiculoController.crearVehiculo)
    //para retornar las rutas
    return route;
  }
}