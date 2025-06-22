import { useState } from "react"
import"./login.css"
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function LoginPage(){
    const [email,setEmail] = useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    function login(){
        console.log(email,password);
        const backendUrl = import.meta.env.VITE_BACKEND_URL
        axios.post(`${backendUrl}/api/user/login`,{
            email:email,
            password:password
        }).then((res)=>{
            console.log(res);
            toast.success("Login Success")
            const user=res.data.user;
            localStorage.setItem("token",res.data.token);
            if(user.role=="admin"){
                navigate("/admin/")
            }else{
                navigate("/");
            }
        }).catch((err)=>{
            console.log(err)
              // Show error message
      let errorMessage = "An error occurred during login.";

      // Check for a 403 error and display the block message
      if (err.response && err.response.status === 403) {
        errorMessage = err.response.data.error || "Your account is blocked. Please contact the admin.";
      } else if (err.response && err.response.data && err.response.data.message) {
        // Default error message from the backend
        errorMessage = err.response.data.message;
      }

      toast.error(errorMessage)
        })
    }

    return(
    <div className="w-full h-screen bg-picture flex justify-center items-center">
        <div className="w-[400px] h-[400px] backdrop-blur-sm rounded-2xl flex flex-col items-center   ">
            <img src="/logo.png" alt="logo" className="w-[200px] h-[200px] object-cover "/>

            <input type="email" placeholder="Email" className="mt-6 w-[300px] h-[50px] bg-transparent border-b-2 border-white text-white text-2xl outline-none " onChange={(e)=>{
                setEmail(e.target.value)

            }}/>
            <input type="password" placeholder="Password" className="mt-6 w-[300px] h-[50px] bg-transparent border-b-2 border-white text-white text-2xl outline-none " onChange={(e)=>{
                setPassword(e.target.value)

            }} />

            <button className="w-[300px] h-[50px] text-2xl text-white rounded-lg bg-[#efac38] my-8" onClick={login}>
                Login
            </button>
        </div>
     </div>)
}