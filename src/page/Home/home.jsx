import React from "react";
import { Link } from "react-router-dom";

export default function Home(){
return(
    <div className="min-h-screen bg-gray-50">
      {/* Header / Hero Section */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to <span className="text-yellow-300">Mix Audio</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            Your one-stop solution for renting top-quality audio and lighting equipment.
          </p>
          <Link
            to="/items"
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold py-3 px-8 rounded-full shadow transition"
          >
            Browse Items
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
              alt="Audio Equipment"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Premium Audio Gear</h3>
            <p className="text-gray-600">
              Rent mixers, microphones, speakers, and more from top brands.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
              alt="Lighting"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Dynamic Lighting</h3>
            <p className="text-gray-600">
              Enhance your events with professional-grade lighting equipment.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/929/929426.png"
              alt="Easy Booking"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p className="text-gray-600">
              Simple and fast online booking process. Reserve your items in minutes!
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to make your event unforgettable?
          </h2>
          <Link
            to="/contact"
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold py-3 px-8 rounded-full shadow transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
)

}