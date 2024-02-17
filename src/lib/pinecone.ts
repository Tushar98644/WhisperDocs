import { Pinecone } from '@pinecone-database/pinecone'

let PinceconeClient : Pinecone ;

export const getPinceconeClient = () => {
    if (!PinceconeClient) {
        PinceconeClient = new Pinecone({
            apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY as string,
        });
    }
    return PinceconeClient;
}