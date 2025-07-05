import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

export default function AdminItempage() {
  const [items, setItem] = useState([]);
  const [itemLoaded,setItemLoded]=useState(false);
  const navigate=useNavigate();
  
  useEffect(() => {
    if(!itemLoaded){
    const token = localStorage.getItem("token");
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((res) => {
      setItem(res.data);
      setItemLoded(true);
    })
    .catch((err) => {
      console.error(err.response?.data?.message || "Failed to fetch products.");
    });
        }
  }, [itemLoaded]);

  function handleDelete(key) {
  if (window.confirm("Are you sure you want to delete this product?")) {
    const token = localStorage.getItem("token");

    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/product/${key}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((res) => {
      toast.success(res.data.message)
      //window.location.reload();
      setItemLoded(false);
      
    })
    .catch((err) => {
      alert("Failed to delete product: " + (err.response?.data?.message || err.message));
    });
  }
}


  return (
    <div className="w-full h-full p-6 bg-gray-50 relative flex flex-col items-center">
      <div className="flex justify-between items-center mb-6 ">
        <h1 className="text-2xl font-bold text-gray-700">Item Management</h1>
        {!itemLoaded && <div className="border-4 my-4 border-b-green-500 rounded-full animate-spin w-[100px] h-[100px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "></div>}
        <Link to="/admin/item/add">
          <CiCirclePlus className="text-[40px] text-green-600 hover:text-green-800  absolute right-2 bottom-2 " title="Add Item" />
        </Link>
      </div>

      {itemLoaded && <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-700 text-sm uppercase">
            <tr>
              <th className="py-3 px-4 border">Key</th>
              <th className="py-3 px-4 border">Name</th>
              <th className="py-3 px-4 border">Price</th>
              <th className="py-3 px-4 border">Category</th>
              <th className="py-3 px-4 border">Dimensions</th>
              <th className="py-3 px-4 border">Availability</th>
              <th className="py-3 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((product) => (
              <tr key={product.key} className="text-center hover:bg-gray-50">
                <td className="py-2 px-4 border">{product.key}</td>
                <td className="py-2 px-4 border">{product.name}</td>
                <td className="py-2 px-4 border">Rs. {product.price}</td>
                <td className="py-2 px-4 border capitalize">{product.category}</td>
                <td className="py-2 px-4 border">{product.dimentions}</td>
                <td className="py-2 px-4 border">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {product.availability ? "Available" : "Not Available"}
                  </span>
                </td>
                <td className="py-2 px-4 border space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm" onClick={()=>{navigate("/admin/item/edit",{state:product})}}>Edit</button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm" onClick={() => handleDelete(product.key)}>Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>}
    </div>
  );
}
