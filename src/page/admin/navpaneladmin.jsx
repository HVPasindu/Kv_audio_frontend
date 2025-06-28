
import { IoIosLogIn, IoIosLogOut, IoMdClose } from "react-icons/io";
import { MdPhotoLibrary, MdContacts, MdInfoOutline, MdOutlineSpeaker } from "react-icons/md";
import { FaRegBookmark, FaRegCalendarCheck, FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsGraphDown } from "react-icons/bs";
import { GoCodeReview, GoHome } from "react-icons/go";

export default function MobileNavPaneladmin(props) {
  const token = localStorage.getItem("token")
  const isOpen = props.isOpen;
  const setOpen = props.setOpen;
  const navigate = useNavigate();

  function goTo(route) {
    navigate(route);
    setOpen(false); 
  }

  return (
    <>
      {isOpen && (
        <div className="w-full h-screen bg-[#00000070] fixed top-0 left-0 z-50">
          <div className="h-full bg-white w-[300px] shadow-lg">
          
            <div className="bg-accent w-full h-[70px] flex relative justify-center items-center">
              <img
                src="/logo.png"
                alt="logo"
                className="w-[60px] h-[60px] object-cover border-[3px] absolute left-1 rounded-full"
              />
              <IoMdClose
                className="absolute right-3 text-3xl cursor-pointer"
                onClick={() => {
                  setOpen(false); 
                }}
              />
            </div>

            
            <div
              onClick={() => {
                goTo("/admin/dashboard");
              }}
              className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
            >
              <BsGraphDown className="text-2xl" />
              Dashboard
            </div>

            <div
              onClick={() => {
                goTo("/admin/orders");
              }}
              className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
            >
              < FaRegBookmark className="text-2xl" />
              Orders
            </div>

           

            <div
              onClick={() => {
                goTo("/admin/items");
              }}
              className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
            >
              <MdOutlineSpeaker className="text-2xl" />
              Items
            </div>
             <div
              onClick={() => {
                goTo("/admin/users");
              }}
              className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
            >
              <FaRegUser className="text-2xl" />
              Users
            </div>

           <div
              onClick={() => {
                goTo("/admin//reviews");
              }}
              className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
            >
              <GoCodeReview className="text-2xl" />
              Reviews
            </div>
            <div
              onClick={() => {
                goTo("/");
              }}
              className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
            >
              <GoHome className="text-2xl" />
              GoHome
            </div>
            {token!=null && <div
                          onClick={() => {
                             localStorage.removeItem("token")
                                        window.location.href = "/login"
                          }}
                          className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
                        >
                          <IoIosLogOut className="text-2xl" />
                          Logout
                        </div>}
                        {token==null && <div
                          onClick={() => {
                             window.location.href = "/login"
                          }}
                          className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
                        >
                          <IoIosLogIn className="text-2xl" />
                          Login
                        </div>}
            

          </div>
        </div>
      )}
    </>
  );
}
