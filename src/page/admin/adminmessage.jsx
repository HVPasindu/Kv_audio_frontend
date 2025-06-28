import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

export default function AdminMessage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpened, setModalOpened] = useState(false);
  const [activeInquiry, setActiveInquiry] = useState(null);

  // Fetch all inquiries
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/inquiry/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInquiries(res.data);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
        toast.error('Failed to fetch inquiries.');
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  // Handle inquiry update
  const handleInquiryUpdate = (id, status) => {
    const token = localStorage.getItem('token');
    const updatedData = { status }; // Assuming you're updating status

    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/api/inquiry/update/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success('Inquiry updated successfully');
        setInquiries(inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
        setModalOpened(false);
      })
      .catch((error) => {
        toast.error('Failed to update inquiry');
        console.error(error);
      });
  };

  // Handle delete inquiry
  const handleDeleteInquiry = (id) => {
    const token = localStorage.getItem('token');

    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/inquiry/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success('Inquiry deleted successfully');
        setInquiries(inquiries.filter((inq) => inq.id !== id));
      })
      .catch((error) => {
        toast.error('Failed to delete inquiry');
        console.error(error);
      });
  };

  return (
    <div className="bg-primary min-h-screen flex flex-col py-6 px-4 md:px-10">
      <h1 className="text-3xl font-semibold mb-6 text-accent">Manage Inquiries</h1>

      {/* Inquiries Table */}
      <div className="overflow-x-auto w-full max-w-7xl">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-accent text-white">
              <th className="py-3 px-6 text-left">Inquiry ID</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Message</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6">Loading...</td>
              </tr>
            ) : (
              inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="border-t hover:bg-gray-100">
                  <td className="py-3 px-6">{inquiry.id}</td>
                  <td className="py-3 px-6">{inquiry.email}</td>
                  <td className="py-3 px-6">{inquiry.message}</td>
                  <td className="py-3 px-6">{inquiry.status}</td>
                  <td className="py-3 px-6 flex space-x-4">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        setActiveInquiry(inquiry);
                        setModalOpened(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteInquiry(inquiry.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Inquiry Update Modal */}
      {modalOpened && activeInquiry && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#00000075] flex justify-center items-center">
          <div className="w-[90%] max-w-md bg-white p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-3xl cursor-pointer hover:text-red-600"
              onClick={() => setModalOpened(false)}
            >
              X
            </button>
            <h2 className="text-2xl font-semibold mb-4">Update Inquiry Status</h2>
            <div className="space-y-4">
              <p><span className="font-semibold">Inquiry ID:</span> {activeInquiry.id}</p>
              <p><span className="font-semibold">Email:</span> {activeInquiry.email}</p>
              <p><span className="font-semibold">Message:</span> {activeInquiry.message}</p>
              <p><span className="font-semibold">Current Status:</span> {activeInquiry.status}</p>
            </div>

            {/* Status Update Buttons */}
            <div className="mt-6 flex justify-center gap-6">
              <button
                className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition"
                onClick={() => handleInquiryUpdate(activeInquiry.id, "Approved")}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition"
                onClick={() => handleInquiryUpdate(activeInquiry.id, "Rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}
