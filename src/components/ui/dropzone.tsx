'use client'
import { useDropzone } from "react-dropzone";
import { Inbox } from "lucide-react";
import { uploadToS3 } from "@/lib/s3-config";
import { useMutation } from "react-query"; 
import axios from "axios"; 

const Dropzone = () => {
    const {mutate} = useMutation({
       mutationFn: async ({file_name,file_key}:{file_name:string,file_key:string}) => {
           const response = await axios.post('/api/creat-chat',{
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
            console.log(acceptedFiles);
            const file = acceptedFiles[0];

            if (file.size > 100 * 1024 * 1024) {
                alert("File is too large. Please upload a file less than 10MB.");
                return;
            }

            try {
                const data = await uploadToS3(file)
                if (!data?.file_name || !data?.file_key) {    
                    console.log("The file data is not correct");
                    return;
                }
                mutate(data,{
                    onSuccess: (data) => {  
                        console.log(data);
                    },
                    onError: (error) => {
                        console.log(error);
                    }
                })
            }
            catch (e) {
                console.log("There was an error uploading the file to S3: ", e);
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
                <Inbox className="w-10 h-10 text-blue-500"/> 
                <p className="text-slate-400">Drop your files here</p>
            </div>

        </div>
    );
}

export default Dropzone;