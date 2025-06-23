import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import MobileNavPanel from "./mobileNavPanel";

export default function Header(){
    const [navPanelOpen,setnavPanelOpen]=useState(false);
    return(
         <header className="w-full h-[70px] shadow-xl flex justify-center items-center relative bg-accent text-white">
                <img src="/kv_logo.png" alt="logo" className="w-[60px] h-[60px] object-cover border-[3px] bg-amber-100 items-center absolute left-1 rounded-full"/>
                
                <Link to="/" className="text-[25px] font-bold m-1 hidden ">
                    Home
                </Link>
                <Link to="/contact" className="text-[25px] font-bold m-1 hidden">
                    Contact
                </Link>
                <Link to="/gallery" className="text-[25px] font-bold m-1 hidden">
                    Gallery
                </Link>
                <Link to="/items" className="text-[25px] font-bold m-1 hidden">
                    Items
                </Link>
                <Link to="/booking" className="text-[25px] font-bold m-1 absolute right-3 hidden">
                    <FaCartShopping/>
                </Link>
                <GiHamburgerMenu className="absolute right-5 text-[24px] " onClick={()=>{
                    setnavPanelOpen(true)
                }}/>
                <MobileNavPanel isOpen={navPanelOpen} setOpen={setnavPanelOpen}/>
         </header>
    )
}