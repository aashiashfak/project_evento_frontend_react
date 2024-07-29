import React, {useEffect, useState} from "react";
import {blockOrganizer, organizerList} from "../../api/adminApi/Orgnaizers";
import {FaEnvelope, FaPhone} from "react-icons/fa";

const Organizers = () => {
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganizers();
  }, []);

  const fetchOrganizers = async () => {
    try {
      const responseData = await organizerList();
      setOrganizers(responseData);
      console.log('vendor response data...',responseData)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleBlockUnblock = async (organizerId) => {
    try {
      await blockOrganizer(organizerId);
      setOrganizers((prevOrganizers) =>
        prevOrganizers.map((organizer) =>
          organizer.user.id === organizerId
            ? {...organizer, user: {...organizer.user, is_active:!organizer.user.is_active}}
            : organizer
        )
      );
    } catch (error) {
      console.error("Error blocking/unblocking organizer:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="bg-gray-800 rounded-t-xl p-4">
        <h1 className="text-xl font-semibold text-white">Organizers List</h1>
      </div>
      <table className="min-w-full bg-white border border-gray-300 shadow-lg">
        <thead>
          <tr>
            <th className="px-6 py-3 border border-gray-300 text-left font-semibold">
              Organizer Name
            </th>
            <th className="px-6 py-3 border border-gray-300 text-left font-semibold">
              Email
            </th>
            <th className="px-6 py-3 border border-gray-300 text-left font-semibold">
              Phone
            </th>
            <th className="px-6 py-3 border border-gray-300 text-left font-semibold">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {organizers.map((organizer) => (
            <tr key={organizer.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 border border-gray-300">
                {organizer.organizer_name}
              </td>
              <td className="px-6 py-4 border border-gray-300">
                <div className="flex">
                  {organizer.user.email && (
                    <FaEnvelope className="mr-2 mt-1 text-gray-600" />
                  )}
                  <a
                    href={`mailto:${organizer.user.email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {organizer.user.email}
                  </a>
                </div>
              </td>
              <td className="px-6 py-4 border border-gray-300">
                <div className="flex">
                  {organizer.user.phone_number && (
                    <FaPhone className="mr-2 mt-1 text-gray-600" />
                  )}
                  <a
                    href={`tel:${organizer.user.phone_number}`}
                    className="text-blue-500 hover:underline"
                  >
                    {organizer.user.phone_number}
                  </a>
                </div>
              </td>
              <td className="px-6 py-4 border border-gray-300">
                <button
                  onClick={() => handleBlockUnblock(organizer.user.id)}
                  className={`w-28 px-4 py-1 rounded ${
                    organizer.user.is_active
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {organizer.user.is_active ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Organizers;
