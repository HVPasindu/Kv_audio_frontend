import axios from "axios";
import { useEffect, useState } from "react";
import { addToCart, removeFromeCart } from "../utils/cart";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa6";

export default function BookingItem({ itemKey, qty, refresh }) {
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("loading"); // loading, success, error

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${itemKey}`)
        .then((res) => {
          setItem(res.data);
          setStatus("success");
        })
        .catch((err) => {
          console.error(err);
          setStatus("error");
          removeFromeCart(itemKey);
          refresh();
        });
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="w-full max-w-[500px] p-4 bg-[var(--color-secondary)] rounded-xl shadow flex items-center justify-center text-[var(--color-accent)]">
        Loading item...
      </div>
    );
  }

  if (status === "error") {
    return null;
  }

  return (
    <div className="w-full max-w-[500px] p-4 bg-[var(--color-primary)] rounded-2xl shadow flex flex-row items-center gap-4 border border-[var(--color-secondary)] mb-4 relative">
        <div className="absolute right-[-45px] text-red-500 cursor-pointer hover:text-white hover:bg-red-500 p-[10px] rounded-full">
        <FaTrash onClick={()=>{
            removeFromeCart(itemKey);
            refresh();
        }} />
        </div>
      <img
        src={item.image[0]}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-xl border border-[var(--color-secondary)]"
      />
      <div className="flex flex-col flex-1">
        <h2 className="text-lg font-semibold text-[var(--color-accent)]">{item.name}</h2>
        
        <div className="flex flex-row justify-between items-center mt-2">
          <span className="text-[var(--color-highlight)] font-bold">Rs. {item.price.toFixed(2)}</span>
          <p className="relative">Qty:
            <button className="absolute top-[-10px] left-[30px] hover:text-accent" onClick={()=>{
                addToCart(itemKey,1);
                refresh();
            }}> <FaArrowUp/> </button> {qty}
            <button className="absolute bottom-[-15px] left-[30px] hover:text-accent" onClick={()=>{
                
                    if(qty==1){
                        removeFromeCart(itemKey);
                        refresh();
                    }else{
                        addToCart(itemKey,-1);
                        refresh();
                    }
                    
                
            }}> <FaArrowDown/> </button>

            </p>
          <span className="text-[var(--color-accent)]">Rs.{(item.price * qty).toFixed(2)}</span>
        </div>
      </div>
      
    </div>
  );
}
//comment