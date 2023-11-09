declare namespace Express {
  export interface Request {
    userId: number,
    imgVehiculo: UploadedFile
  }
}