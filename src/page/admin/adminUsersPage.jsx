import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminUserssPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  if(loading){
     fetchUsers();
  }
 
}, [loading]);


  function handleBlockuser(email){
   
    const token = localStorage.getItem("token");
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/user/block/${email}`,{},{
      headers: {
          Authorization: "Bearer " + token,
        },
    }).then(()=>{
      setLoading(true)
    }).catch((err)=>{
      console.error(err);
    })

  }

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Users Page</h1>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Profile Picture</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Phone Number</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="p-3">
                    <img
                      src={user.profilePicture}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  </td>
                  <td className="p-3">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">{user.phoneNumber}</td>
                  <td className="p-3">{user.address || "N/A"}</td>
                  <td onClick={()=>{handleBlockuser(user.email)}} className="p-3 cursor-pointer">{user.isBlocked?"BLOCKED":"ACTIVE"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
