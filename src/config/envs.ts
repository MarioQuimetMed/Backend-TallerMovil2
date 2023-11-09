import 'dotenv/config'
import {get} from 'env-var'

export const envs = {
  PORT : get('PORT').required().asPortNumber(),
  KEY_JWT: get('SECRET_KEY_JWT').required().asString(),
  NAME_STORAGE: get('NOMBRE_CUENTA_STORAGE').required().asString(),
  KEY_STORAGE: get('KEY_CUENTA_STORAGE').required().asString(),
  HOST_STORAGE: get('HOST_CUENTA_STORAGE').required().asUrlString()
}