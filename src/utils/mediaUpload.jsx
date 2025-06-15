import { createClient } from "@supabase/supabase-js"

const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjZGJod2Zyamxrb2NpZ3Z2bWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMDU4NTEsImV4cCI6MjA2NTU4MTg1MX0.DE99NaSJHGge6poomspiR-26BLK4eDIJh6Oy8NJ-VPs"

const superbase_url="https://kcdbhwfrjlkocigvvmch.supabase.co"

const superbase = createClient(superbase_url,anon_key);

export default function meadiaUpload(file){
   return new Promise((resolve,reject)=>{
    if(file==null){
        reject("No file selected")
    }

     const timestamp=new Date().getTime();
    const fileName=timestamp+file.name;
    superbase.storage.from("images").upload(fileName,file,{
        cacheControl:`3600`,
        upsert:false,
    }).then(()=>{
        const publicUrl=superbase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
        resolve(publicUrl)
    }).catch(()=>{
        reject("Error uploading file")
    })
   })
}