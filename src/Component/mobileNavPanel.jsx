import { CiHome, CiSpeaker } from "react-icons/ci";
import { IoIosLogIn, IoIosLogOut, IoMdClose } from "react-icons/io";
import { MdPhotoLibrary, MdContacts, MdInfoOutline } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { GrUserAdmin } from "react-icons/gr";

export default function MobileNavPanel(props) {
	const token = localStorage.getItem("token")
	const isOpen = props.isOpen;
	const setOpen = props.setOpen;
	const navigate = useNavigate();

	const [isAdmin,setisAdmin]=useState(false);
	
		useEffect(() => {
		if (token) {
			axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/admincheck`,{}, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then((res) => {
				setisAdmin(res.data.isAdmin);
			})
			.catch((err) => {
				console.error(err); 
			});
		}
	}, [token]);

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
								className="w-[60px] h-[60px] object-cover border-[3px] bg-amber-100 items-center absolute left-1 rounded-full"
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
								goTo("/");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<CiHome className="text-2xl" />
							Home
						</div>
                        <div
							onClick={() => {
								goTo("/items");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<CiSpeaker className="text-2xl" />
							Items
						</div>

						<div
							onClick={() => {
								goTo("/gallery");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<MdPhotoLibrary className="text-2xl" />
							Gallery
						</div>                        

						<div
							onClick={() => {
								goTo("/booking");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<FaRegCalendarCheck className="text-2xl" />
							Booking
						</div>

						<div
							onClick={() => {
								goTo("/contact");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<MdContacts className="text-2xl" />
							Contact
						</div>

						{/* <div
							onClick={() => {
								goTo("/about");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<MdInfoOutline className="text-2xl" />
							About
						</div> */}
						{isAdmin&&<div
							onClick={() => {
								goTo('/admin/dashboard');
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<GrUserAdmin className="text-2xl" />
							AdminPage
						</div>}
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
