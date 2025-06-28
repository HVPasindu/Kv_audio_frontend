import { useState, useEffect } from 'react';
import { FaUsers, FaBoxes, FaChartBar, FaShoppingCart } from 'react-icons/fa';
import { MdOutlineInventory } from 'react-icons/md';
import axios from 'axios';

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    totalSales: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDashboardData(res.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="bg-primary min-h-screen flex flex-col py-6 px-4 md:px-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-accent">Admin Dashboard</h1>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Orders */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <div className="p-4 bg-accent text-white rounded-full">
            <FaShoppingCart className="text-3xl" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-accent">Total Orders</h3>
            <p className="text-2xl font-bold">{dashboardData.totalOrders}</p>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <div className="p-4 bg-accent text-white rounded-full">
            <FaUsers className="text-3xl" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-accent">Total Users</h3>
            <p className="text-2xl font-bold">{dashboardData.totalUsers}</p>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <div className="p-4 bg-accent text-white rounded-full">
            <MdOutlineInventory className="text-3xl" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-accent">Total Products</h3>
            <p className="text-2xl font-bold">{dashboardData.totalProducts}</p>
          </div>
        </div>

        {/* Total Sales */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <div className="p-4 bg-accent text-white rounded-full">
            <FaChartBar className="text-3xl" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-accent">Total Sales</h3>
            <p className="text-2xl font-bold">{`Rs. ${dashboardData.totalSales.toFixed(2)}`}</p>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white mt-8 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-accent mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-accent text-white">
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">User</th>
                <th className="py-3 px-6 text-left">Amount</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Example static data, replace with dynamic */}
              <tr className="border-t hover:bg-gray-100">
                <td className="py-3 px-6">12345</td>
                <td className="py-3 px-6">John Doe</td>
                <td className="py-3 px-6">Rs. 1500</td>
                <td className="py-3 px-6">Completed</td>
                <td className="py-3 px-6">2025-06-30</td>
              </tr>
              <tr className="border-t hover:bg-gray-100">
                <td className="py-3 px-6">12346</td>
                <td className="py-3 px-6">Jane Smith</td>
                <td className="py-3 px-6">Rs. 3000</td>
                <td className="py-3 px-6">Pending</td>
                <td className="py-3 px-6">2025-06-29</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
