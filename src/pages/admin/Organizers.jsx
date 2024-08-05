import React, {useEffect, useState} from "react";
import {blockOrganizer, organizerList} from "../../api/adminApi/Orgnaizers";

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
      console.log("vendor response data...", responseData);
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
            ? {
                ...organizer,
                user: {...organizer.user, is_active: !organizer.user.is_active},
              }
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
      <div className="overflow-x-auto shadow-xl max-h-[calc(100vh-200px)]">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg">
          <thead className="sticky top-0 bg-gray-400">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">#</th>
              <th className="px-6 py-3 text-left font-semibold">
                Organizer Name
              </th>
              <th className="px-6 py-3 text-left font-semibold">Email</th>
              <th className="px-6 py-3 text-left font-semibold">Phone</th>
              <th className="px-6 py-3 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {organizers.map((organizer, idx) => (
              <tr
                key={organizer.id}
                className={` hover:bg-gray-200 ${
                  idx % 2 == 0 ? "bg-gray-100" : ""
                }`}
              >
                <td className="px-6 py-4 ">{idx + 1}</td>
                <td className="px-6 py-4 ">{organizer.organizer_name}</td>
                <td className="px-6 py-4 ">
                  <div className="flex">
                    <a
                      href={`mailto:${organizer.user.email}`}
                      className="text-blue-500 hover:underline"
                    >
                      {organizer.user.email}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 ">
                  <div className="flex">
                    <a
                      href={`tel:${organizer.user.phone_number}`}
                      className="text-blue-500 hover:underline"
                    >
                      {organizer.user.phone_number}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleBlockUnblock(organizer.user.id)}
                    className={`w-24 px-4 py-1 rounded ${
                      organizer.user.is_active
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
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
    </div>
  );
};

export default Organizers;
