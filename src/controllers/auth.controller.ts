import {Request,Response} from 'express'
import bcrypt from 'bcryptjs'
import { cliente } from '../libs/prisma';
import { IAuthBodyCliente,IAuth } from '../interface';
import { generateToken } from '../libs/generate_token';


export class AuthController {
  constructor(){}

  public async registrarCliente(req: Request, res: Response){
    const {nombre, correo,password,telefono}: IAuthBodyCliente = req.body
    console.log(req.body);
    try {
      // verifico si ya existen con datos parecidos
      const clienteDB = await cliente.findFirst({
        where:{
          OR:[
            {
              correo
            },
            {
              telefono
            }
          ]
        }
      })
      if(clienteDB) return res.status(400).json({msg: "El cliente ya se encuentra en el sistema"})
      //hasheo el password
      const passwordCliente = await bcrypt.hash(password,bcrypt.genSaltSync(10));
      // creo al cliente Cliente
      const clienteCreate = await cliente.create({
        data: {
          nombre,
          correo,
          password: passwordCliente,
          telefono
        }
      })

      return res.status(201).json({
        msg: "Cliente creado",
        cliente: clienteCreate
      })

    } catch (err) {
      console.log(err);
      return res.status(404).json(err)
    }
  
  }

  public async loginCliente(req: Request, res: Response){
    const {correo,password}:IAuth = req.body;
    try {
      //verifico si existe el correo del cliente
      const clienteDB = await cliente.findFirst({
        where:{
          correo
        }
      })
      if(!clienteDB) return res.status(400).json({msg: "Ingrese un correo que pertenezca a algun cliente."})
      //verifico ahora el password
      const verificarPassword: boolean = await bcrypt.compare(password,clienteDB.password);
      if(!verificarPassword) return res.status(400).json({msg:"Ingrese el password correctamente."})
      //ahora si devuelvo un token si todo resulta bien
      const token = await generateToken(`${clienteDB.id}`);
      return res.status(202).header({
        "auth-token": token!
      }).json({
        msg: "Ha ingresado correctamente al sistema",
        cliente: clienteDB
      })
      

    } catch (err) {
      console.log(err);
      return res.status(404).json(err)
    }

  }
}