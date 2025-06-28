import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'; // Importing from react-hot-toast

const UpdateReview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract review data passed from the previous page
  const review = location.state;

  // Initialize state with the review data
  const [updatedComment, setUpdatedComment] = useState(review.comment || '');
  const [updatedRating, setUpdatedRating] = useState(review.rating || 0);

  // Handle input changes
  const handleCommentChange = (event) => {
    setUpdatedComment(event.target.value);
  };

  const handleRatingChange = (event) => {
    setUpdatedRating(Number(event.target.value));
  };

  // Handle Update Review
  const handleUpdateReview = () => {
    if (!updatedComment || updatedRating === 0) {
      toast.error('Please provide a review and a rating.');
      return;
    }

    const updatedReviewData = {
      comment: updatedComment,
      rating: updatedRating,
    };

    const token = localStorage.getItem('token');

    // Send the updated data to the backend API
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/api/review/${review.email}`, updatedReviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success('Review updated successfully!');
        navigate("/review"); // Navigate back to the admin review page or list
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message ||'Failed to update review.');
        console.error(error);
      });
  };

  // Handle Cancel (Navigate back to /review page)
  const handleCancel = () => {
    navigate("/review");
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-6 bg-accent text-white flex justify-between items-center">
        <div className="text-2xl font-bold">
          <span className="text-primary">KV Audio</span>
        </div>
      </header>

      {/* Main Content Section */}
      <section className="flex flex-col md:flex-row justify-center gap-12 px-6 py-12">
        <div className="w-full md:w-1/2 max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-accent mb-4">Update Review</h2>

          {/* Rating */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Rating (1 to 5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={updatedRating}
              onChange={handleRatingChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Rate from 1 to 5"
            />
          </div>

          {/* Review Text */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Your Review:</label>
            <textarea
              value={updatedComment}
              onChange={handleCommentChange}
              rows="4"
              className="w-full p-3 border rounded-lg"
              placeholder="Write your review here..."
            />
          </div>

          {/* Submit Update Button */}
          <button
            onClick={handleUpdateReview}
            className="w-full bg-accent text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Update Review
          </button>

          {/* Cancel Button */}
          <button
            onClick={handleCancel}
            className="w-full mt-4 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-accent text-white p-4 text-center">
        <p>&copy; 2025 KV Audio. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UpdateReview;
