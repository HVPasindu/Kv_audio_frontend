import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

export default function Contact() {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  
  const handleSendMessage = async () => {
    if (!message) {
      toast.error('Please enter a message before submitting.'); 
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/inquiry`,
        {
          message: message,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

     
      if (response.data.success) {
        
        toast.success(response.data.message || 'Your inquiry has been sent successfully!');
      } else {
        
        toast.error(response.data.message || 'Failed to send your inquiry. Please try again.');
      }

      setMessage(''); 
    } catch (err) {
     
      toast.error(err?.response?.data?.message || 'An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen flex flex-col">
      
      <header className="p-6 bg-primary text-white flex justify-between items-center">
        <div className="text-2xl font-bold">
          <span className="text-accent">KV Audio</span>
        </div>
       
        <div className="md:hidden flex items-center">
          <button className="text-white">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </header>

      
      <section className="flex flex-col md:flex-row justify-center gap-12 px-6 py-12">
        <div className="w-full md:w-1/2 max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-accent mb-4">Get In Touch</h2>
          <div className="text-gray-700 space-y-2">
            <div>
              <strong>Phone:</strong> 078-45454745
            </div>
            <div>
              <strong>Email:</strong> hvpmjayarathna@gmil.com
            </div>
            <div>
              <strong>Location:</strong> Audio Street, Kalutara District, 10001
            </div>
            <div>
              <strong>Business Hours:</strong> Mon - Fri: 9:00 AM - 6:00 PM
              <br />
              Sat: 10 AM - 4 PM
            </div>
          </div>
        </div>

       
        <div className="w-full md:w-1/2 max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-accent mb-4">Send Us a Message</h2>

         
          <textarea
            className="w-full p-4 border rounded-lg mb-4 text-gray-700"
            rows="6"
            value={message}
            onChange={handleMessageChange}
            placeholder="Your Message"
          />

         
          <button
            onClick={handleSendMessage}
            className="w-full bg-accent text-white p-4 rounded-lg hover:bg-blue-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </section>

      
      <section className="bg-primary py-12 text-center">
        <p className="text-xl font-semibold text-gray-700 mb-4">Share Your Experience</p>
        <p className="text-gray-700 mb-4">We value your feedback! Leave a review about our services.</p>
        <a href="#" className="bg-accent text-white py-3 px-6 rounded-full">
          Write a Review
        </a>
      </section>

      
      <footer className="bg-accent text-white p-4 text-center">
        <p>&copy; 2025 KV Audio. All rights reserved.</p>
      </footer>

      
      <ToastContainer />
    </div>
  );
}
//vomd
//kk