import {PrismaClient} from '@prisma/client'


export const {
  cliente,
  tecnico,
  vehiculo  
} = new PrismaClient();