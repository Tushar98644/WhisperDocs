import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

// @ts-ignore
export const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadToS3 = async (
  file: File
): Promise<{ file_key: string; file_name: string }> => {
  return new Promise(async (resolve, reject) => {
  try {
    const file_key =
      "uploads/" + Date.now().toString() + file.name.replace("", "_");
    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: file_key,
      Body: file,
      ContentType: file.type,
    };

    const command = new PutObjectCommand(params);
    const upload = await s3Client.send(command);

    console.log("upload success", upload);

    return resolve( {
      file_name: file.name,
      file_key,
    });
  } catch (e: any) {
    console.error(`There was an error uploading the file to S3: ${e}`);
    reject(e);
  }
  })
};

export const getS3Url = (file_key: any) => {
  const url = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${file_key}`;
  return url;
};