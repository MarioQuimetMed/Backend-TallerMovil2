import {
  UploadedFile
} from 'express-fileupload'
import { postImageBlobStorage } from '../services/azure_blob';

 
export async function agregarVehiculo(tmpPath: UploadedFile, nameFile: string):Promise<Error | void> {
  try {
    const extension = tmpPath.name.split('.');
    const validarExtensiones = ['png', 'jpg', 'jpeg'];
    if (!validarExtensiones.includes(extension[1])) {
      throw new Error('file is not image')
    }
     await postImageBlobStorage(`${nameFile}.${extension[1]}`,tmpPath.tempFilePath,"vehiculos");
  } catch (error) {
    console.log(error);
    throw new Error('Has is error')
  }
}