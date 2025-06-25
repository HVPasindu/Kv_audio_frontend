import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import MobileNavPanel from "./mobileNavPanel";

export default function Header(){
    const [navPanelOpen,setnavPanelOpen]=useState(false);
    const token = localStorage.getItem("token")
    return(
         <header className="w-full h-[70px] shadow-xl flex justify-center items-center relative bg-accent text-white">
                <img src="/kv_logo.png" alt="logo" className="w-[60px] h-[60px] object-cover border-[3px] bg-amber-100 items-center absolute left-1 rounded-full"/>
                <div className="hidden w-[450px] md:flex justify-evenly items-center">
                <Link to="/" className="text-[25px]  m-1 hidden  md:block">
                    Home
                </Link>
                <Link to="/contact" className="text-[22px]  m-1 hidden md:block">
                    Contact
                </Link>
                <Link to="/gallery" className="text-[22px]  m-1 hidden md:block">
                    Gallery
                </Link>
                <Link to="/items" className="text-[22px] m-1 hidden md:block">
                    Items
                </Link>
                <Link to="/booking" className="text-[22px]  m-1 absolute right-24 hidden md:block">
                    <FaCartShopping/>
                </Link>
                </div>
                <GiHamburgerMenu className="absolute right-5 text-[24px] md:hidden " onClick={()=>{
                    setnavPanelOpen(true)
                }}/>

               {token!=null && <button className="hidden md:block absolute right-5 text-[24px]" onClick={()=>{
                        localStorage.removeItem("token")
                         window.location.href = "/login"
                    }}>
                        Logout
                </button>}
                <MobileNavPanel isOpen={navPanelOpen} setOpen={setnavPanelOpen}/>
         </header>
    )
}