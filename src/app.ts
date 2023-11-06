import {envs} from "./config/envs"
import { Server } from './server';
import {Routes} from './routes'

(async()=>{
  main();
})()

function main(){
  const server = new Server({
    port: envs.PORT,
    routes: Routes.routes
  })

  server.start();
}