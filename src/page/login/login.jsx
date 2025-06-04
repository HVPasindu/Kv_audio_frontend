import"./login.css"
export default function LoginPage(){

    function login(){
        
    }

    return(
    <div className="w-full h-screen bg-picture flex justify-center items-center">
        <div className="w-[400px] h-[400px] backdrop-blur-sm rounded-2xl flex flex-col items-center   ">
            <img src="/logo.png" alt="logo" className="w-[200px] h-[200px] object-cover "/>

            <input type="email" placeholder="Email" className="mt-6 w-[300px] h-[50px] bg-transparent border-b-2 border-white text-white text-2xl outline-none "/>
            <input type="password" placeholder="Password" className="mt-6 w-[300px] h-[50px] bg-transparent border-b-2 border-white text-white text-2xl outline-none "/>

            <button className="w-[300px] h-[50px] text-2xl text-white rounded-lg bg-[#efac38] my-8">
                Login
            </button>
        </div>
     </div>)
}