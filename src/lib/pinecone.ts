import { Pinecone } from '@pinecone-database/pinecone'
import { getObjectfroms3 } from './s3-pincecone';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import {
    Document,
    RecursiveCharacterTextSplitter,
  } from "@pinecone-database/doc-splitter";

interface PdfPage {
    pageContent: string;
    metadata: {
        loc: {
            pageNumber: number;
        }
    }
}
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

const embedDocument =async(doc: Document) => {
    try {
      const embeddings = await getEmbeddings(doc.pageContent);
      const hash = md5(doc.pageContent);
  
      return {
        id: hash,
        values: embeddings,
        metadata: {
          text: doc.metadata.text,
          pageNumber: doc.metadata.pageNumber,
        },
      } as PineconeRecord;
    } catch (error) {
      console.log("error embedding document", error);
      throw error;
    }
  }
  
   const truncateStringByBytes = (str: string, bytes: number) => {
    const enc = new TextEncoder();
    return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
  };
  
  const  prepareDocument =async(page: PdfPage) => {
    let { pageContent, metadata } = page;
    pageContent = pageContent.replace(/\n/g, "");
    // split the docs
    const splitter = new RecursiveCharacterTextSplitter();
    const docs = await splitter.splitDocuments([
      new Document({
        pageContent,
        metadata: {
          pageNumber: metadata.loc.pageNumber,
          text: truncateStringByBytes(pageContent, 36000),
        },
      }),
    ]);
    return docs;
  }