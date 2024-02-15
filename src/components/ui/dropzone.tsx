'use client'
import { useDropzone } from "react-dropzone";
import { Inbox } from "lucide-react";

const Dropzone = () => {
    const { getInputProps, getRootProps } = useDropzone({
        accept: {
            "application/pdf": [".pdf"],
        },
        onDrop: (acceptedFiles) => {
            console.log(acceptedFiles);
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