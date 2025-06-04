import { MdBluetoothAudio, MdOutlineSpeaker } from "react-icons/md";
import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { BsSpeaker } from "react-icons/bs";
import { Link, Route, Routes } from "react-router-dom";


export default function Adminpage(){
    return(
        <div className='h-screen w-full flex'>
        <div className='w-[400px] h-full bg-green-200'>
          <Link to="/admin/dashboard" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
            <BsGraphDown/>
            Dashboard
          </Link>
          <Link to="/admin/booking" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
            <FaRegBookmark/>
            Booking
          </Link>
           <Link to="/admin/items" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
            <MdOutlineSpeaker/>
            Items
          </Link>
           <Link to="/admin/users" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
            <FaRegUser/>
            Users
          </Link>

        </div>
        <div className='w-[calc(100vw-400px)] bg-red-900'>
            <Routes path="/*" >
                <Route path="/booking" element={<h1>booking</h1>}/>
            </Routes>

        </div>
      </div>
    )
}