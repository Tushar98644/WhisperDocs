'use client'
import { useDropzone } from "react-dropzone";
import { Inbox, Loader2 } from "lucide-react";
import { uploadToS3 } from "@/lib/s3-config";
import { useMutation } from "react-query";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Dropzone = () => {
    const router = useRouter();
    const [uploading, setuploading] = useState(false);
    const { mutate, isLoading } = useMutation({
        mutationFn: async ({ file_name, file_key }: { file_name: string, file_key: string }) => {
            const response = await axios.post('/api/create-chat', {
                file_name,
                file_key
            })

            return response.data;
        }
    })

    const { getInputProps, getRootProps } = useDropzone({
        accept: {
            "application/pdf": [".pdf"],
        },
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file.size > 100 * 1024 * 1024) {
                alert("File is too large. Please upload a file less than 10MB.");
                return;
            }

            try {
                setuploading(true);
                const data = await uploadToS3(file)
                if (!data?.file_name || !data?.file_key) {
                    console.log("The file data is not correct");
                }
                console.log(`The file was uploaded to S3: ${data}`);
                mutate(data, {
                    onSuccess: (data) => {
                        console.log(data);
                        router.push(`/chat/${data.chat_id}`); 
                    },
                    onError: (error) => {
                        console.log(error);
                    }
                })
            }
            catch (e) {
                console.log("There was an error uploading the file to S3: ", e);
                setuploading(false);
            }
            finally {
                setuploading(false);
            }
        },
    });

    return (
        <div className="bg-white p-4 flex justify-center items-center rounded-xl">
            <div {...getRootProps({ className: 'bg-gray-100 py-20 px-48 rounded-xl border-dashed border-2 flex flex-col justify-center items-center' })}>
                <input {...getInputProps({
                    multiple: false,
                    accept: "application/pdf",
                    className: "p-4"
                })} />
                { uploading || isLoading ? (
                    <>
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                        <p>Please wait while your request is being processed ...</p>
                    </>
                ) : (
                    <>
                        <Inbox className="w-10 h-10 text-blue-500" />
                        <p className="text-slate-400">Drop your files here</p>
                    </>
                )

                }
            </div>

        </div>
    );
}

export default Dropzone;