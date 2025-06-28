import { MdBluetoothAudio, MdOutlineSpeaker } from "react-icons/md";
import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { BsSpeaker } from "react-icons/bs";
import { Link, Route, Routes } from "react-router-dom";
import AdminItempage from "./adminItempage";
import Additempage from "./additempage";
import UpdateItemPage from "./updateItem";
import AdminUserssPage from "./adminUsersPage";

import AdminOrdersPage from "./adminorderspage";
import { useEffect, useState } from "react";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import ReviwConroller from "./admine_review";
import { GoCodeReview, GoHome } from "react-icons/go";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import MobileNavPaneladmin from "./MobileNavPaneladmin";


export default function Adminpage(){
  const [userValidated,setUserValidated]=useState(false);
  const [navPanelOpen,setnavPanelOpen]=useState(false);
  const token = localStorage.getItem("token")
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      window.location.href="/login";
    }
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/validate`,{
         headers: {
            Authorization: `Bearer ${token}`,
          },
    }).then((res)=>{
      console.log(res.data);
      const user=res.data;
      if(user.role=="admin"){
        setUserValidated(true)
        
      }else{
        window.location.href="/";
      }
      
    }).catch((err)=>{
      console.error(err);
      setUserValidated(false)
    })

  },[])
    return(
        <div className='h-screen w-full flex'>
        <div className='w-[400px] h-full bg-accent hidden  md:block'>
          <Link to="/admin/dashboard" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
            <BsGraphDown/>
            Dashboard
          </Link>
          <Link to="/admin/orders" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
            <FaRegBookmark/>
            Orders
          </Link>
           <Link to="/admin/items" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
            <MdOutlineSpeaker/>
            Items
          </Link>
           <Link to="/admin/users" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
            <FaRegUser/>
            Users
          </Link>
           <Link to="/admin/reviews" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
            <GoCodeReview/>
            Reviews
          </Link>
           <Link to="/" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
            <GoHome/>
            GoHome
          </Link>
          {token!=null && <button  className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center' onClick={()=>{
                        localStorage.removeItem("token")
                         window.location.href = "/login"
                    }}>
                        <IoIosLogOut className="text-2xl" />
                        Logout
                </button>}
          {token==null && <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center' onClick={()=>{
                        
                         window.location.href = "/login"
                    }}>
                        <IoIosLogIn className="text-2xl" />
                        Login
                </button>}

        </div>
        <div className="w-full h-[70px] shadow-xl flex justify-center items-center relative bg-accent text-white md:hidden "  >
          <img src="/kv_logo.png" alt="logo" className="w-[60px] h-[60px] object-cover border-[3px] bg-amber-100 items-center absolute left-1 rounded-full"/>
         
        <GiHamburgerMenu className="absolute right-5 text-[24px] md:hidden " onClick={()=>{
                              setnavPanelOpen(true)
                          }}/>
        </div >
         <MobileNavPaneladmin isOpen={navPanelOpen} setOpen={setnavPanelOpen}/>                 
        <div className='w-[calc(100vw-400px)] bg-primary'>
          {userValidated &&  <Routes path="/*" >
                <Route path="/orders" element={<AdminOrdersPage/>}/>
                <Route path="/users" element={<AdminUserssPage/>}/>
                <Route path="/items" element={<AdminItempage/>}/>
                <Route path="/item/add" element={<Additempage/>}/>
                <Route path="/item/edit" element={<UpdateItemPage/>}/>
                <Route path="/reviews" element={<ReviwConroller/>}/>
            </Routes>}

        </div>
      </div>
    )
}