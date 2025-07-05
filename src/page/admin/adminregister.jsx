import { useState } from "react";
import "./register.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import meadiaUpload from "../../utils/mediaUpload";

export default function AdminRegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  
  const role = "admin";

  async function handleOnSubmit() {
     let imageUrl = '';  

  
  try {
    imageUrl = await meadiaUpload(image); 
    console.log(imageUrl);
  } catch (err) {
    toast.error("Image not uploaded correctly...");
    console.log(err);
    return;  
  }


    
    const token = localStorage.getItem("token");

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/admin/register`,
        {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          role: role,  
          address: address,
          phoneNumber: phoneNumber,
          profilePicture:imageUrl
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "An error occurred..");
      });
  }

  return (
    <div className="bg-picture h-screen flex justify-center items-center">
      <div className="w-[400px] h-[650px] backdrop-blur-sm rounded-2xl flex flex-col items-center overflow-y-auto py-4">
        <img
          src="/kv_logo.png"
          alt="logo"
          className="object-cover mb-6 bg-amber-100 rounded-full mx-auto w-[80px] h-[80px] border-[3px]"
        />
        <input
          type="text"
          placeholder="First Name"
          className="mt-3 w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white text-xl outline-none"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="mt-3 w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white text-xl outline-none"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="mt-3 w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white text-xl outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
        <input
          type="password"
          id="pwd"
          placeholder="Password"
          className="mt-3 w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white text-xl outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="checkbox"
          onClick={() => {
          const pwdField = document.getElementById("pwd");
          pwdField.type = pwdField.type === "password" ? "text" : "password";
        }}
       />
        </div>
        <input
          type="text"
          placeholder="Address"
          className="mt-3 w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white text-xl outline-none"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="mt-3 w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white text-xl outline-none"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label className="mt-3 w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white text-xl outline-none cursor-pointer">
           {image ? 'Uploaded Photo' : 'Add Photo'}
            <input
              type="file"
              className="hidden"
              onChange={(e) => setImage(e.target.files[0])} 
            />
        </label>
        <button
          className="w-[300px] h-[45px] text-xl text-white rounded-lg bg-[#efac38] mt-6"
          onClick={handleOnSubmit}
        >
          Register as Admin
        </button>
        <button
          className="mt-4 text-white bg-blue-600 hover:bg-blue-700 w-[300px] h-[45px] rounded-lg"
          onClick={() => navigate("/login")}
        >
          Go to Login Page
        </button>
         <button
          className="mt-4 text-white bg-red-600 hover:bg-red-900 w-[300px] h-[45px] rounded-lg"
          onClick={() => navigate("/admin/dashboard")}
        >
          Back
        </button>
      </div>
    </div>
  );
}
