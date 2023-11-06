import {Request,Response} from 'express'


export class ClienteController {

  constructor(){}


  public mostarCliente(_:Request,res:Response){
    res.json("uwu cliente")
  }

}