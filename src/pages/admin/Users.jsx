import React, {useEffect, useState} from "react";
import {blockUser, userList} from "../../api/adminApi/Users";


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const responseData = await userList();
      console.log("response of userList", responseData);
      setUsers(responseData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleBlockUnblock = async (userId) => {
    try {
      await blockUser(userId);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? {...user, is_active: !user.is_active} : user
        )
      );
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4 pt-4">
      <div className="bg-gray-800 rounded-t-xl p-4 ">
        <h1 className="text-xl font-semibold text-white">Users List</h1>
      </div>
      <div className="overflow-x-auto shadow-xl max-h-[calc(100vh-200px)]">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg">
          <thead className="bg-gray-400 sticky top-0">
            <tr>
              <th className="px-6 py-3 border border-gray-300 text-left  font-semibold">
                #
              </th>
              <th className="px-6 py-3 border border-gray-300 text-left  font-semibold">
                Username
              </th>
              <th className="px-6 py-3 border border-gray-300 text-left  font-semibold">
                Email
              </th>
              <th className="px-6 py-3 border border-gray-300 text-left font-semibold">
                Phone
              </th>
              <th className="px-6 py-3 border border-gray-300 text-left  font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border border-gray-300">{idx + 1}</td>
                <td className="px-6 py-4 border border-gray-300">
                  {user.username ? user.username : "-"}
                </td>
                <td className="px-6 py-4 border border-gray-300">
                  <div className="flex">
                    <a
                      href={`mailto:${user.email}`}
                      className={
                        user.email ? "text-blue-500 hover:underline" : ""
                      }
                    >
                      {user.email ? user.email : "-"}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 border border-gray-300">
                  <div className="flex">
                    <a
                      href={`tel:${user.phone_number}`}
                      className={
                        user.phone_number
                          ? "text-blue-500 hover:underline"
                          : " "
                      }
                    >
                      {user.phone_number ? user.phone_number : "-"}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 border border-gray-300">
                  <button
                    onClick={() => handleBlockUnblock(user.id)}
                    className={`w-28 px-4 py-1 rounded ${
                      user.is_active
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {user.is_active ? "Block" : "Unblock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
