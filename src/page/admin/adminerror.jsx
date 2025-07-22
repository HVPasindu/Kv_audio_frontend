import { Link } from "react-router-dom";

export default function Errorss() {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen flex flex-col justify-center items-center text-center py-8 px-4">
     
      <h1 className="text-5xl font-extrabold text-accent mb-4">Oops! Page Not Found</h1>

      
      <div className="mb-6">
        <img
          src="/myerror.png"
          alt="404 Error"
          className="w-60 h-60 mx-auto org object-cover"
        />
      </div>

      
      <p className="text-xl text-gray-700 mb-6">
        Sorry, we couldn't find the page you were looking for. It might have been moved or deleted.
      </p>

      
      <Link
        to="/"
        className="bg-accent text-white py-3 px-6 rounded-md text-xl font-semibold hover:bg-accent-dark transition duration-300"
      >
        Go Back to Home
      </Link>

      
      <footer className="mt-8 text-sm text-gray-500">
        <p>&copy; 2025 KV Audio. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
