import { Router } from "express";
import { check } from "express-validator";


import {AuthController} from '../controllers'
import { validateFields } from "../middlewares/validate_fields";


export class AuthRoute{
  constructor(){}

  static get router():Router{
    const route = Router();
    
    //controlador del auth
    const authController = new AuthController();

    //registrar clientes
    route.post("/register/cliente",[
      check("nombre","Ingrese un nombre valido.").notEmpty().isString().isLength({min: 8}),
      check("correo","Envie un email correctamente.").notEmpty().isEmail(),
      check("password","Ingrese un password valido.").notEmpty().isString().isLength({min: 8}),
      check("telefono","Ingrese un telefono valido.").notEmpty().isString().isLength({min: 8,max: 8}),
      validateFields
    ],authController.registrarCliente)

    //iniciar sesion
    route.post("/cliente",[
      check("correo","Envie un email correctamente.").notEmpty().isEmail(),
      check("password","Ingrese un password valido.").notEmpty().isString().isLength({min: 8}),
      validateFields
    ], authController.loginCliente)

    return route;
  }
}