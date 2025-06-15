import { useState } from "react"
import meadiaUpload from "../utils/mediaUpload";

export default function Testing(){
    const [file,setFile]=useState(null);

     function upload(){
        console.log(file);
        meadiaUpload(file).then((url)=>{
            console.log(url)
        })
    }
    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">
           <input type="file" multiple onChange={(e)=>{setFile(e.target.files[0])}}/>
           <button className="w-[200px] h-[50px] bg-blue-500 text-white" onClick={upload}>
            Upload
           </button>
        </div>
    )
}