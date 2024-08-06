import React from "react";

const TopVendorsTable = ({vendors}) => {
  return (
    <section className="overflow-x-auto shadow-xl ">
      <table className="min-w-full border-gray-300 text-sm">
        <thead className="sticky top-0 bg-gray-800 text-white">
          <tr>
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Organizer Name</th>
            <th className="p-2 text-left">Total Tickets</th>
            <th className="p-2 text-left">Total Followers</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor, idx) => (
            <tr
              key={vendor.id}
              className={`hover:bg-gray-200 ${
                idx % 2 === 0 ? "bg-gray-100" : ""
              }`}
            >
              <td className="p-2">{idx + 1}</td>
              <td className="p-2">{vendor.organizer_name}</td>
              <td className="p-2">{vendor.total_tickets}</td>
              <td className="p-2">{vendor.total_followers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TopVendorsTable;
