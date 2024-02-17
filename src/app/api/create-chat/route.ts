import { uploads3toPinecone } from "@/lib/pinecone";

export const POST = async(req : Request) : Promise<Response> =>{
    try{
        const {file_name, file_key} = await req.json();
        console.log({
               file_name,
               file_key
        })
        const pages = await uploads3toPinecone(file_key);
        return new Response(JSON.stringify(pages), {
            status: 200,
        });
    }
    catch(e){
        console.log(`There was an error on the route handler: ${e}`);
        return new Response(JSON.stringify({error: e}), {
            status: 500,
        });
    }
}