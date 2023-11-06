import {PrismaClient} from '@prisma/client'


export const {
  cliente,
  tecnico
} = new PrismaClient();