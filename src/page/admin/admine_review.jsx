import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ReviewController() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');

  // Fetch all reviews
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/review`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReviews(response.data); // Set reviews state
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
        toast.error('Failed to fetch reviews.');
      })
      .finally(() => {
        setIsLoading(false); // Stop the loading spinner after fetching data
      });
  }, [token]);

  // Approve review
  const handleApprove = (email) => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/review/approve/${email}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setReviews(reviews.map((review) =>
          review.email === email ? { ...review, isApproved: true } : review
        ));
        toast.success('Review approved successfully!');
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || 'Failed to approve review.');
        console.error(error);
      });
  };

  // Reject review
  const handleReject = (email) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/review/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setReviews(reviews.filter((review) => review.email !== email)); // Remove rejected review from the list
        toast.success('Review rejected successfully!');
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || 'Failed to reject review.');
        console.error(error);
      });
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen flex flex-col">
      <header className="p-6 bg-accent text-white flex justify-between items-center">
        <div className="text-2xl font-bold">
          <span className="text-primary">KV Audio</span>
        </div>
      </header>

      {/* Main Content Section */}
      <section className="px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-accent mb-6">Review Management</h2>
        {isLoading ? (
          <div className="flex justify-center">
            <div className="loader"></div> {/* Use a simple loader or spinner */}
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.length === 0 ? (
              <p className="text-center text-lg text-gray-600">No reviews pending approval.</p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review.email}
                  className="p-6 bg-white shadow-lg rounded-lg flex justify-between items-center"
                >
                  <div className="flex flex-col space-y-2">
                    <h3 className="text-xl font-semibold text-accent">{review.name}</h3>
                    <p className="text-gray-700">{review.comment}</p>
                    <div className="flex gap-2">
                      <span className="text-yellow-500">
                        {Array.from({ length: review.rating }, (_, i) => (
                          <span key={i} className="text-yellow-500">★</span>
                        ))}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {review.isApproved ? 'Approved' : 'Pending Approval'}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    {!review.isApproved && (
                      <button
                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                        onClick={() => handleApprove(review.email)}
                      >
                        Approve
                      </button>
                    )}
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                      onClick={() => handleReject(review.email)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </section>

      <footer className="bg-accent text-white p-4 text-center">
        <p>&copy; 2025 KV Audio. All rights reserved.</p>
      </footer>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}
