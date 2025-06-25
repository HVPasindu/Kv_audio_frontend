import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the form data
    console.log("Form submitted", formData);
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-primary py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-accent mb-8">
          Contact Us
        </h1>
        <p className="text-lg md:text-xl text-secondary mb-8">
          Have a question or need help? We're here to assist you.
        </p>

        {/* Contact Form */}
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-left text-lg font-semibold text-accent mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-left text-lg font-semibold text-accent mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-left text-lg font-semibold text-accent mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-highlight hover:bg-red-600 text-blue-900 font-semibold py-3 px-8 rounded-full shadow transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer Section */}
      <div className="text-center mt-16">
        <p className="text-lg text-secondary">
          Or reach out to us through our social media channels.
        </p>
        <div className="mt-4">
          <Link to="/gallery" className="text-accent hover:underline mx-2">
            Gallery
          </Link>
          <Link to="/" className="text-accent hover:underline mx-2">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
