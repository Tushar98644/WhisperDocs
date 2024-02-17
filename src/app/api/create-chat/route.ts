export const GET = async(req : Request)=>{
     const {file_name, file_key} = await req.json();
     console.log({
            file_name,
            file_key
     })
     return new Response(JSON.stringify({file_name, file_key}), {status: 200});
}