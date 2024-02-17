export const POST = async(req : Request)=>{
    try{
        const {file_name, file_key} = await req.json();
        console.log({
               file_name,
               file_key
        })
        return new Response(JSON.stringify({file_name, file_key}), {status: 200});
    }
    catch(e){
        console.log(`There was an error on the route handler: ${e}`);
    }
}