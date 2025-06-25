import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import Toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { useNavigate } from 'react-router-dom';

export default function ReviewPage() {
  const [comment, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  // Fetch existing reviews
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/review`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReviews(response.data); // Setting reviews data to state
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, [token]);

  // Handle form input changes
  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  // Submit a new review
  const handleSubmitReview = () => {
    if (!comment || rating === 0) {
      toast.error('Please provide a review and a rating.');
      return;
    }

    setIsSubmitting(true);

    const reviewData = {
      comment,
      rating,
    };

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/review/`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success('Review added successfully!');
        setReview('');
        setRating(0);
        setReviews([...reviews, response.data]); // Add the new review to the list
      })
      .catch((error) => {
        toast.error('Failed to submit your review.');
        console.error(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Handle Delete Review using email
  const handleDeleteReview = (email) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/review/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setReviews(reviews.filter((review) => review.email !== email)); // Remove deleted review from state
        toast.success('Review deleted successfully!');
      })
      .catch((error) => {
        toast.error('Failed to delete review.');
        console.error(error);
      });
  };

  // Handle Update Review using email
  const handleUpdateReview = (review) => {
    navigate("/reviewUpdate", { state: review }); 
    
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
        {/* Review Form Section */}
        <div className="w-full md:w-1/2 max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-accent mb-4">Leave a Review</h2>

          {/* Rating */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Rating (1 to 5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={handleRatingChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Rate from 1 to 5"
            />
          </div>

          {/* Review Text */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Your Review:</label>
            <textarea
              value={comment}
              onChange={handleReviewChange}
              rows="4"
              className="w-full p-3 border rounded-lg"
              placeholder="Write your review here..."
            />
          </div>

          {/* Submit Review Button */}
          <button
            onClick={handleSubmitReview}
            className="w-full bg-accent text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>

        {/* Reviews Display Section */}
        <div className="w-full md:w-1/2 max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-accent mb-4">Reviews</h2>

          {/* Display reviews from the database */}
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-100 rounded-lg shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{review.name}</h3>
                    <span className="text-yellow-500">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <span key={i} className="text-yellow-500">★</span>
                      ))}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  {/* Update and Delete Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateReview(review)} // Update to desired comment and rating
                      className="bg-yellow-500 text-white py-1 px-3 rounded-lg"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.email)}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-accent text-white p-4 text-center">
        <p>&copy; 2025 KV Audio. All rights reserved.</p>
      </footer>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
