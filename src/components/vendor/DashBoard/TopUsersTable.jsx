import React from "react";
import VendorDashboard from "../../../pages/vendor/VendorDashboard";

const TopUsersTable = ({topUsers}) => {
  console.log("topUSers:", topUsers);
  return (
    <section className="overflow-x-auto shadow-xl max-h-[calc(100vh-170px)] overflow-y-auto">
      <table className="min-w-full text-sm">
        <thead className="sticky top-0 bg-gray-800 text-white">
          <tr>
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Username</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Phone Number</th>
            <th className="p-2 text-left">Total Tickets</th>
          </tr>
        </thead>
        <tbody>
          {topUsers.map((user, idx) => (
            <tr
              key={idx} // Ensure unique key for each row
              className={`hover:bg-gray-200 ${
                idx % 2 === 0 ? "bg-gray-100" : ""
              }`}
            >
              <td className="p-2">{idx + 1}</td>
              <td className="p-2">
                {user.user__username ? user.user__username : "N/A"}
              </td>
              <td className="p-2">
                {user.user__email ? user.user__email : "N/A"}
              </td>
              <td className="p-2">
                {user.user__phone_number ? user.user__phone_number : "N/A"}
              </td>
              <td className="p-2">{user.total_tickets}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TopUsersTable;
