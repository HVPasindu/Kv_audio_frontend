import { useState } from "react";

export default function ImageSlider(props){
    const images=props.images;
    console.log(images);
    const [selectedImage,setSelectedImage]=useState(images[0]);
    return(
        <div className="w-full  flex flex-col items-center">
            <img src={selectedImage} alt="product" className="w-full h-[300px] md:h-[500px] object-cover"/>
            <div className="w-full h-[90px] flex  justify-center items-center mt-[20px]">
                {
                    images.map((image,index)=>{
                    return <img key={index} alt="product" src={image} className={`w-[70px] h-[70px] object-center cursor-pointer mr-[4px] ${image==selectedImage && "border border-accent"}`} onClick={
                        ()=>{
                            setSelectedImage(image)
                        }
                    }/>
                    })
                }
            </div>
        </div>
    )
}