import { Pinecone } from '@pinecone-database/pinecone'
import { getObjectfroms3 } from './s3-pincecone';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';

let PinceconeClient : Pinecone ;

export const getPinceconeClient = () => {
    if (!PinceconeClient) {
        PinceconeClient = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY as string,
        });
    }
    return PinceconeClient;
}

export const uploads3toPinecone = async (file_key: string) => {
    try{
        const file_path = await getObjectfroms3(file_key);
        if (!file_path) {
            throw new Error("File not found");
        }
        const loader = new PDFLoader(file_path);
        const pages = await loader.load();
        return pages;
    } 
    catch(e){
        console.log(`There was an error uploading the file to Pinecone: ${e}`);
    }
}