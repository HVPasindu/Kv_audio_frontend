import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import ImageSlider from "../../Component/imageSlider";
import { addToCart, loadCart } from "../../utils/cart";
import toast from "react-hot-toast";

export default function ProductOverview(){
    const params=useParams();
    //console.log(params);
    const key = params.key;
    const [loadingStatus,setLoadingStatus]=useState("loading");//success,error
    const [product,setProduct]=useState({})
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${key}`).then((res)=>{
            setProduct(res.data);
            setLoadingStatus("loaded")
            console.log(res.data);
        }).catch((err)=>{
            console.error(err);
            setLoadingStatus("error")
        })
    },[])

    return(
        <div className="w-full   flex justify-center ">
            {
                loadingStatus=="loading" && 
                <div className="w-full h-full flex justify-center items-center"> 
                    <div className="w-[70px] h-[70px] border-b-2  rounded-full border-t-green-500 animate-spin">

                    </div>

                </div>
            }
            {
                loadingStatus=="loaded"&&
                <div className="w-full h-full flex justify-center md:flex-row items-center flex-col ">
                         <h1 className="text-3xl  font-bold my-6 md:hidden text-accent">{product.name} </h1>
                        <div className="w-full  md:w-[35%] mt-2">
                             <ImageSlider images={product.image}/> 
                        </div>
                        <div className="w-full md:w-[49%] p-2  flex flex-col items-center">
                           <h1 className="hidden md:block text-3xl font-bold text-accent">{product.name}</h1>
                            <h2 className="text-xl font-semibold text-gray-800">{product.category} (category)</h2>
                            <p className="text-gray-700 mt-4 text-center">{product.description}</p>
                            <p className="text-lg  text-green-500">Rs.{product.price.toFixed(2)}</p>
                            <div className="mt-4 text-sm text-gray-600">
                                <span className="font-medium">Dimentions:</span>{product.dimensions}
                            </div>
                            <button className="mt-4 bg-accent text-white px-4 py-2 rounded-md" onClick={()=>{
                                addToCart(product.key,1);
                                toast.success("Added to cart");
                                console.log(loadCart())
                            }}>Add to Cart</button>
                            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md" onClick={()=>{
                               navigate("/items")
                                
                            }}>Back</button>
                            
                        </div>

                </div>

            }
            {
                loadingStatus=="error" && <div className="w-full h-full flex justify-center items-center">
                    <h1 className="text-3xl font-bold text-accent">Error Occured</h1>
                </div>
            }
        </div>
    )

}