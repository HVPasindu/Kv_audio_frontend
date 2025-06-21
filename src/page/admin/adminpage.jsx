import { MdBluetoothAudio, MdOutlineSpeaker } from "react-icons/md";
import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { BsSpeaker } from "react-icons/bs";
import { Link, Route, Routes } from "react-router-dom";
import AdminItempage from "./adminItempage";
import Additempage from "./additempage";
import UpdateItemPage from "./updateItem";
import AdminUserssPage from "./adminUsersPage";


export default function Adminpage(){
    return(
        <div className='h-screen w-full flex'>
        <div className='w-[400px] h-full bg-accent'>
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
        <div className='w-[calc(100vw-400px)] bg-primary'>
            <Routes path="/*" >
                <Route path="/booking" element={<h1>booking</h1>}/>
                <Route path="/users" element={<AdminUserssPage/>}/>
                <Route path="/items" element={<AdminItempage/>}/>
                <Route path="/item/add" element={<Additempage/>}/>
                <Route path="/item/edit" element={<UpdateItemPage/>}/>
            </Routes>

        </div>
      </div>
    )
}