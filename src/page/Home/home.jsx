import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-primary">
      {/* Header / Hero Section */}
      <div className="bg-accent py-16">
        <div className="container mx-auto px-4 text-center max-w-screen-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to <span className="text-yellow-300">KV Audio</span>
          </h1>
          <p className="text-lg md:text-xl text-secondary mb-8">
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
      <div className="container mx-auto px-4 py-16 max-w-screen-xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
      <div className="bg-accent py-10">
        <div className="container mx-auto px-4 text-center max-w-screen-xl">
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

      {/* Footer / Bottom Section */}
      <div className="bg-gray-800 text-white py-16 ">
        <div className="container mx-auto px-4 text-center max-w-screen-xl ">
          <h3 className="text-xl font-semibold mb-4">KV Audio</h3>
          <p className="mb-8">
            Premium audio equipment rental for professionals and enthusiasts. Quality gear, flexible terms, exceptional service.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-20 relative ">
            <div className="">
              <h4 className="font-semibold">Quick Links</h4>
              <ul className="text-gray-400">
                <li><Link to="/" className="hover:text-yellow-300">Home</Link></li>
                <li><Link to="/items" className="hover:text-yellow-300">Browse Equipment</Link></li>
                <li><Link to="/how-it-works" className="hover:text-yellow-300">How It Works</Link></li>
                <li><Link to="/pricing" className="hover:text-yellow-300">Pricing</Link></li>
                <li><Link to="/faqs" className="hover:text-yellow-300">FAQs</Link></li>
                <li><Link to="/contact" className="hover:text-yellow-300">Contact Us</Link></li>
              </ul>
            </div>
            <div className="md:absolute right-48 left-48">
              <h4 className="font-semibold">Equipment Categories</h4>
              <ul className="text-gray-400">
                <li><Link to="/microphones" className="hover:text-yellow-300">Microphones</Link></li>
                <li><Link to="/dj-equipment" className="hover:text-yellow-300">DJ Equipment</Link></li>
                <li><Link to="/pa-systems" className="hover:text-yellow-300">PA Systems</Link></li>
                <li><Link to="/studio-monitors" className="hover:text-yellow-300">Studio Monitors</Link></li>
                <li><Link to="/audio-interfaces" className="hover:text-yellow-300">Audio Interfaces</Link></li>
                <li><Link to="/headphones" className="hover:text-yellow-300">Headphones</Link></li>
              </ul>
            </div>
            <div className="md:absolute right-10">
              <h4 className="font-semibold">Contact Information</h4>
              <p className="text-gray-400">
                audio Street, kalutar District, 10001
                <br />
                078-45454745
                <br />
                hvpmjayarathna@gmil.com
                <br />
                Mon-Fri: 9AM-6PM
                <br />
                Sat: 10AM-4PM
              </p>
            </div>
          </div>

          <div className="text-gray-400 mb-8">
            <p>&copy; 2025 KV Audio. All rights reserved.</p>
            <div className="flex justify-center  space-x-8 mt-4">
              <Link to="/privacy-policy" className="hover:text-yellow-300">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-yellow-300">Terms of Service</Link>
              <Link to="/cookie-policy" className="hover:text-yellow-300">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
