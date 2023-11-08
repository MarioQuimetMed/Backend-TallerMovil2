import {Router} from 'express'

import {ClientesRoute} from './clientes.routes'
import {AuthRoute} from './auth.routes'
import { VehiculoRoutes } from './vehiculo.routes';


export class Routes {
  constructor(){}

  static get routes():Router{
    //para manejar todas las rutas de las otras rutas
    const route = Router();
    //rutas de clientes
    route.use("/cliente",ClientesRoute.router);

    //rutas del auth
    route.use("/auth", AuthRoute.router)


    //rutas de los vehiculos de cada cliente
    route.use("/vehiculo",VehiculoRoutes.router)

    //retorna todas las rutas para el server
    return route;
  }
}