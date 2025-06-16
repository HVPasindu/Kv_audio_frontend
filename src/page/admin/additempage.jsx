import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import meadiaUpload from "../../utils/mediaUpload";

export default function AddItemPage() {
  const [productKey, setProductKey] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("audio");
  const [productDimension, setProductDimension] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages,setProductImages]=useState([])
  const navigate=useNavigate();

  async function handleAddItem(){
    const promises=[]

    for(let i=0;i<productImages.length;i++){
       //console.log(productImages[i]);
       const promise= meadiaUpload(productImages[i])
       promises.push(promise);
    }

    
    //console.log(productKey,productName,productPrice,productCategory,productDimension,productDescription);
   
    const token=localStorage.getItem("token");
    if(token){
        try{
              // Promise.all(promises).then((result)=>{
              // console.log(result)
              //  }).catch((err)=>{
              //   toast.error(err)
              //  })
        const imageUrls=await Promise.all(promises)
        console.log(imageUrls)
       const result= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/product/` ,
          { key:productKey,
            name:productName,
            price:productPrice,
            category:productCategory,
            dimentions:productDimension,
            description:productDescription,
            image:imageUrls
          },{
            headers:{
                Authorization:"Bearer " + token
            }
          }
        )
        toast.success(result.data.message);
        navigate("/admin/items")
    }catch(err){
        toast.error(err.response.data.error);
    }
        //console.log(result);
    }else{
        toast.error("You are not authorize to add items")
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">Add Item</h1>
      <div className="w-[400px] border p-4 flex flex-col gap-3 items-center rounded-lg shadow">
        <input
          type="text"
          placeholder="Product Key"
          value={productKey}
          onChange={(e) => setProductKey(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="audio">Audio</option>
          <option value="lights">Lights</option>
        </select>
        <input
          type="text"
          placeholder="Product Dimension"
          value={productDimension}
          onChange={(e) => setProductDimension(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <textarea
          type="text"
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="file"
          multiple
          onChange={(e)=>{setProductImages(e.target.files)}} className=" w-full p-2 border rounded "
        />

        <button onClick={handleAddItem} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Add
        </button>
        <button onClick={()=>{navigate("/admin/items")}} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 w-full">Cancel</button>
      </div>
    </div>
  );
}
