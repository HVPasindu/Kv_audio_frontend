import { useEffect, useState } from "react";
import { formatDate, loadCart } from "../../utils/cart";
import BookingItem from "../../Component/bookingitem";
import axios from "axios";
import toast from "react-hot-toast";

export default function BookingPage() {
  const [cart, setCart] = useState(loadCart());

  const today = formatDate(new Date());
  const tomorrow = formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000));

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);
  const [total,setTotal] =useState(0);

  function realoadCart() {
    setCart(loadCart());
    calculateToatal();
    
  }

  function calculateToatal(){
    const cartInfo = loadCart();
    cartInfo.startingDate=startDate;
    cartInfo.endingDate=endDate;
    cartInfo.days=calculateDays();
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`,
      cartInfo
    ).then((res)=>{
      console.log(res.data)
      setTotal(res.data.total);
    }).catch((err)=>{
      console.error(err);
    })
  }

  useEffect(()=>{
    calculateToatal();
  },[startDate,endDate])

  // Calculate number of days between start and end date
  const calculateDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const totalDays = calculateDays();

  function handleBookingCreation(){


    const cart=loadCart();
    if (cart.orderedItems.length === 0) {
    toast.error("Your cart is empty. Please add items before booking.");
    return;
  }
    cart.startingDate = startDate;
    cart.endingDate = endDate;
    cart.days=calculateDays();

    const token=localStorage.getItem("token");
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`,cart,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((res)=>{
        console.log(res.data);
        localStorage.removeItem("cart");
        toast.success("Booking Created")
        setCart(loadCart());
        location.reload();
    }).catch((err)=>{
        console.error(err);
        toast.error(err.response.data.message)
        
    })
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="text-accent text-2xl font-bold mb-4">Create Booking</h1>

      <div className="w-full max-w-[500px] flex flex-col gap-4 p-4 bg-[var(--color-secondary)] rounded-xl mb-6">
        <label className="flex flex-col">
          <span className="text-[var(--color-accent)] font-medium mb-1">Start Date:</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-[var(--color-accent)] p-2 rounded"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-[var(--color-accent)] font-medium mb-1">End Date:</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-[var(--color-accent)] p-2 rounded"
          />
        </label>

        <div className="text-[var(--color-accent)] font-semibold">
          📆 Number of Days: <span className="text-[var(--color-highlight)]">{totalDays}</span>
        </div>
      </div>

      <div className="w-full flex flex-col items-center ">
        {cart.orderedItems.map((item) => (
          <BookingItem
            key={item.key}
            itemKey={item.key}
            qty={item.qty}
            refresh={realoadCart}
          />
        ))}
      </div>
      <div className="w-full flex justify-center mt-4">
        <p className="text-accent font-semibold">Total:{total.toFixed(2)}</p>
      </div>
      <div className="w-full flex justify-center mt-4 ">
        <button className="bg-accent text-white px-4 py-2 rounded-md" onClick={handleBookingCreation}>Create Booking</button>
      </div>
    </div>
  );
}
