import jwt from 'jsonwebtoken';

import {envs} from '../config/envs'


export const generateToken = (Uid: string): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    //verifico que la llave secreta exista
    if (!envs.KEY_JWT) {
      reject(new Error('La clave secreta no está configurada.'));
      return;
    }
    //payload y configuracion del jwt
    const payload = {
      Uid
    };
    const options = {
      expiresIn: '4h',
    };
    //genera el jwt
    jwt.sign(payload, envs.KEY_JWT, options, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};