import { MdBluetoothAudio, MdOutlineSpeaker } from "react-icons/md";
import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { BsSpeaker } from "react-icons/bs";


export default function Adminpage(){
    return(
        <div className='h-screen w-full flex'>
        <div className='w-[400px] h-full bg-green-200'>
          <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
            <BsGraphDown/>
            Dashboard
          </button>
          <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
            <FaRegBookmark/>
            Booking
          </button>
           <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
            <MdOutlineSpeaker/>
            Items
          </button>
           <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
            <FaRegUser/>
            Users
          </button>

        </div>
        <div className='w-full bg-red-900'>

        </div>
      </div>
    )
}