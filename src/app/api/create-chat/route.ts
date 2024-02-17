import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { uploads3toPinecone } from "@/lib/pinecone";
import { getS3Url } from "@/lib/s3-config";
import { auth } from "@clerk/nextjs";

export const POST = async (req: Request): Promise<Response> => {
  const { userId } = auth();
  try {
    const { file_name, file_key } = await req.json();
    console.log({
      file_name,
      file_key,
    });
    const pages = await uploads3toPinecone(file_key);
    
    // @ts-ignore
    const chat_id = await db
      .insert(chats)
      .values({
        pdfName: file_name,
        pdfUrl: getS3Url(file_key),
        userId,
        fileKey: file_key,
      })
      .returning({
        insertedId: chats.id,
      });

    return new Response(
      JSON.stringify({
        chat_id : chat_id[0].insertedId,
        pdf_url: getS3Url(file_key),
        pages,
      }),
      {
        status: 200,
      }
    );
  } catch (e) {
    console.log(`There was an error on the route handler: ${e}`);
    return new Response(JSON.stringify({ error: e }), {
      status: 500,
    });
  }
};
