import express,{Router} from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'

interface Options {
  port: number
  routes: Router
}

export class Server {
  private app = express(); 
  private readonly router: Router; 
  private readonly port: number;
  constructor (option: Options){
    const {port,routes} = option;
    this.port = port;
    this.router = routes;
  }

  async start(){

    //middleware
    this.app.use(express.json()) //peticiones json
    this.app.use(express.urlencoded({extended: true})) //perticion form

    this.app.use(cors())  //para que la gente pueda hacer peticiones http

    this.app.use(fileUpload({
      tempFileDir: "./tmp",
      useTempFiles: true
    }))   // para las imagenes de los vehiculos y solicitudes de asistencia

    //rutas
    this.app.use("/api",this.router)


    //puerto y levantar el servidor
    this.app.listen(this.port,()=>{
      console.log(`Server on port ${this.port}`);
      
    })
  }
}