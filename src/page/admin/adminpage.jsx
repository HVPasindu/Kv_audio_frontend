import { MdBluetoothAudio, MdOutlineSpeaker } from "react-icons/md";
import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";
import AdminItempage from "./adminItempage";
import Additempage from "./additempage";
import UpdateItemPage from "./updateItem";
import AdminUserssPage from "./adminUsersPage";
import AdminOrdersPage from "./adminorderspage";
import { useEffect, useState } from "react";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";

import { GoCodeReview, GoHome } from "react-icons/go";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import MobileNavPaneladmin from "./navpaneladmin";
import ReviewController from "./admine_review";

export default function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);
  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/validate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const user = res.data;
        if (user.role === "admin") {
          setUserValidated(true);
        } else {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.error(err);
        setUserValidated(false);
      });
  }, []);

  return (
    <div className="h-screen w-full flex">
      {/* Sidebar */}
      <div className="w-[250px] h-full bg-accent hidden md:block px-4 py-6">
        <div className="text-center mb-8">
          <img src="/kv_logo.png" alt="Logo" className="w-[60px] h-[60px] object-cover bg-amber-100 rounded-full mx-auto" />
        </div>
        <nav className="space-y-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center space-x-2 text-black text-lg font-medium hover:bg-yellow-500 rounded-lg px-4 py-2"
          >
            <BsGraphDown />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center space-x-2 text-black text-lg font-medium hover:bg-yellow-500 rounded-lg px-4 py-2"
          >
            <FaRegBookmark />
            <span>Orders</span>
          </Link>
          <Link
            to="/admin/items"
            className="flex items-center space-x-2 text-black text-lg font-medium hover:bg-yellow-500 rounded-lg px-4 py-2"
          >
            <MdOutlineSpeaker />
            <span>Items</span>
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center space-x-2 text-black text-lg font-medium hover:bg-yellow-500 rounded-lg px-4 py-2"
          >
            <FaRegUser />
            <span>Users</span>
          </Link>
          <Link
            to="/admin/reviews"
            className="flex items-center space-x-2 text-black text-lg font-medium hover:bg-yellow-500 rounded-lg px-4 py-2"
          >
            <GoCodeReview />
            <span>Reviews</span>
          </Link>
          <Link
            to="/"
            className="flex items-center space-x-2 text-black text-lg font-medium hover:bg-yellow-500 rounded-lg px-4 py-2"
          >
            <GoHome />
            <span>Go Home</span>
          </Link>
          {token != null && (
            <button
              className="flex items-center space-x-2 text-black text-lg font-medium hover:bg-yellow-500 rounded-lg px-4 py-2 w-full mt-4"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              <IoIosLogOut className="text-2xl" />
              <span>Logout</span>
            </button>
          )}
          {token == null && (
            <button
              className="flex items-center space-x-2 text-white text-lg font-medium hover:bg-primary rounded-lg px-4 py-2 w-full mt-4"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              <IoIosLogIn className="text-2xl" />
              <span>Login</span>
            </button>
          )}
        </nav>
      </div>

      {/* Mobile Nav */}
      <div className="w-full h-[70px] shadow-xl flex justify-between items-center relative bg-accent text-white md:hidden">
        <GiHamburgerMenu
          className="absolute right-5 text-[24px] md:hidden "
          onClick={() => {
            setNavPanelOpen(true);
          }}
        />
        <img
          src="/kv_logo.png"
          alt="Logo"
          className="w-[60px] h-[60px] object-cover border-[3px] bg-amber-100 items-center absolute left-1 rounded-full"
        />
      </div>

      {/* Mobile Navigation Panel */}
      <MobileNavPaneladmin isOpen={navPanelOpen} setOpen={setNavPanelOpen} />

      {/* Main Content */}
      <div className="w-[calc(100vw-250px)] bg-primary p-6">
        {userValidated && (
          <Routes>
            <Route path="/orders" element={<AdminOrdersPage />} />
            <Route path="/users" element={<AdminUserssPage />} />
            <Route path="/items" element={<AdminItempage />} />
            <Route path="/item/add" element={<Additempage />} />
            <Route path="/item/edit" element={<UpdateItemPage />} />
            <Route path="/reviews" element={<ReviewController />} />
          </Routes>
        )}
      </div>
    </div>
  );
}
