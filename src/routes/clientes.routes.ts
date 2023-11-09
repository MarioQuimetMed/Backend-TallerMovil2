import { Router } from "express";


import {ClienteController} from '../controllers'


export class ClientesRoute{
  constructor(){}

  static get router():Router{
    const route = Router();
    
    //controlador de clientes
    const clienteController = new ClienteController();

    //mostrar clientes
    route.get("/",clienteController.mostarCliente)



    return route;
  }
}