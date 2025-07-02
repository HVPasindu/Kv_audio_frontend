import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOrder, setActiveOrder] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    if (loading) {
      fetchOrders();
    }
  }, [loading]);

  const handleOrderStatusChange = async (orderId, status) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/status/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refresh orders after status change
      setLoading(true);
      setModalOpened(false); // Close modal after status change
    } catch (error) {
      console.error("Error changing order status:", error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh orders after deleting
      setLoading(true);
      setModalOpened(false); // Close modal after deletion
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center py-6 px-4 md:px-10">
      <h1 className="text-3xl font-semibold mb-6 text-accent">Manage Orders</h1>

      {loading ? (
        <div className="flex justify-center items-center text-lg text-gray-600">
          <div className="animate-spin h-8 w-8 border-t-2 border-accent rounded-full"></div>
          <span className="ml-2">Loading orders...</span>
        </div>
      ) : (
        <div className="overflow-x-auto w-full max-w-7xl">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-accent text-white">
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Order Date</th>
                <th className="p-3 text-left">Start Date</th>
                <th className="p-3 text-left">End Date</th>
                <th className="p-3 text-left">Total Amount</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setActiveOrder(order);
                    setModalOpened(true);
                  }}
                >
                  <td className="p-3">{order.orderId}</td>
                  <td className="p-3">{order.email}</td>
                  <td className="p-3">{new Date(order.orderDate).toLocaleString()}</td>
                  <td className="p-3">{new Date(order.startingDate).toLocaleDateString()}</td>
                  <td className="p-3">{new Date(order.endingDate).toLocaleDateString()}</td>
                  <td className="p-3">{order.totalAmount ? `Rs.${order.totalAmount}` : "N/A"}</td>
                  <td
                    className={`p-3 ${order.status === "Pending" ? "bg-yellow-300 text-black" :
               order.status === "rejected" ? "bg-red-800 text-white" :
               order.status === "approved" ? "bg-green-300 text-green-800" :
               "bg-gray-300 text-gray-800"}`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpened && activeOrder && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#00000075] flex justify-center items-center">
          <div className="w-[90%] max-w-md bg-white p-6 rounded-lg shadow-lg relative">
            <IoMdCloseCircleOutline
              className="absolute top-2 right-2 text-3xl cursor-pointer hover:text-red-600"
              onClick={() => setModalOpened(false)}
            />
            <h1 className="text-2xl font-semibold mb-4">Order Details</h1>
            <div className="flex flex-col gap-2 mb-6">
              <p><span className="font-semibold">Order ID:</span> {activeOrder.orderId}</p>
              <p><span className="font-semibold">Email:</span> {activeOrder.email}</p>
              <p><span className="font-semibold">Days:</span> {activeOrder.days}</p>
              <p><span className="font-semibold">Starting Date:</span> {new Date(activeOrder.startingDate).toLocaleDateString()}</p>
              <p><span className="font-semibold">Ending Date:</span> {new Date(activeOrder.endingDate).toLocaleDateString()}</p>
              <p><span className="font-semibold">Total Amount:</span> Rs. {activeOrder.totalAmount}</p>
              <p><span className="font-semibold">Approval Status:</span> {activeOrder.status}</p>
              <p><span className="font-semibold">Order Date:</span> {new Date(activeOrder.orderDate).toLocaleDateString()}</p>
            </div>

            <div className="flex justify-center gap-6 my-5">
              <button
                onClick={() => handleOrderStatusChange(activeOrder.orderId, "approved")}
                className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition"
              >
                Approve
              </button>
              <button
                onClick={() => handleOrderStatusChange(activeOrder.orderId, "rejected")}
                className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition"
              >
                Reject
              </button>
              <button
                onClick={() => handleDeleteOrder(activeOrder.orderId)}
                className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition"
              >
                Delete Order
              </button>
            </div>

            <table className="w-full mt-6">
              <thead>
                <tr>
                  <th className="p-2 text-left">Product</th>
                  <th className="p-2 text-left">Qty</th>
                  <th className="p-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {activeOrder.orderedItems.map((item) => (
                  <tr key={item.product.key} className="border-t">
                    <td className="p-2">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover"
                      />
                    </td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">{item.product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
