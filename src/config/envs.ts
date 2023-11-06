import 'dotenv/config'
import {get} from 'env-var'

export const envs = {
  PORT : get('PORT').required().asPortNumber(),
  KEY_JWT: get('SECRET_KEY_JWT').required().asString()
}