import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3-config";
import fs from 'fs';

const streamToBuffer = (stream: any): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      stream.on('data', (chunk: Uint8Array) => {
        chunks.push(chunk);
      });
      stream.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
      stream.on('error', (error: any) => {
        reject(error);
      });
    });
  };
  
  
export const getObjectfroms3 = async (file_key: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        const params = {
          Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
          Key: file_key,
        };
  
        const command = new GetObjectCommand(params);
        const response = await s3Client.send(command);
        const file_name = "/tmp/pdf" + Date.now().toString() + ".pdf";
        const buffer = await streamToBuffer(response.Body);
        fs.writeFileSync(file_name, buffer);
        return resolve(file_name);
      } catch (e: any) {
        console.error(`There was an error getting the file from S3: ${e}`);
        reject(e);
      }
    });
  };