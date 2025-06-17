import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function ProductOverview(){
    const params=useParams();
    console.log(params);
    const key = params.key;
    const [loadingStatus,setLoadingStatus]=useState("loading");//success,error
    const [product,setProduct]=useState({})
    useEffect(()=>{

    },[])

    return(
        <div>
            <h1>Product Overview</h1>
        </div>
    )

}