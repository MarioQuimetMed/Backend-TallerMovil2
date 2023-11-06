import {Router} from 'express'

import {ClientesRoute} from './clientes.routes'
import {AuthRoute} from './auth.routes'


export class Routes {
  constructor(){}

  static get routes():Router{
    const route = Router();
    //rutas de clientes
    route.use("/cliente",ClientesRoute.router);

    //rutas del auth
    route.use("/auth", AuthRoute.router)

    return route;
  }
}