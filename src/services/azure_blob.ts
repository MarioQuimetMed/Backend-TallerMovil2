import {BlobServiceClient,StorageSharedKeyCredential} from '@azure/storage-blob'

import {envs} from '../config/envs'

const storage = new StorageSharedKeyCredential(envs.NAME_STORAGE,envs.KEY_STORAGE)
const blobService = new BlobServiceClient(envs.HOST_STORAGE,storage);


export const postImageBlobStorage = async ( fileName: string, filePath: string,containerName: string) => {
  try {
    const containerClient = blobService.getContainerClient(containerName);
    await containerClient.getBlockBlobClient(fileName).uploadFile(filePath);
    return 'Image uploaded successfully';
  } catch (error) {
    throw new Error(`Error uploading image: ${error}`);
  }
};

export const getFileUrlFromBlobStorage = ( fileName: string,containerName: string) => {
  const containerClient = blobService.getContainerClient(containerName);
  const url = containerClient.getBlockBlobClient(fileName).url;
  return url;
};

export const deleteBlob = async (containerName: string, fileName: string) => {
  try {
    const containerClient = blobService.getContainerClient(containerName);
    await containerClient.deleteBlob(fileName);
    return 'Image deleted successfully';
  } catch (error) {
    throw new Error(`Error deleting image: ${error}`);
  }
};