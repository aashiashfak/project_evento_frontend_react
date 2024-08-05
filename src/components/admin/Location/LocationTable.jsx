import React from "react";
import {FaEdit, FaTrash} from "react-icons/fa";

const LocationTable = ({locations, onEditClick, onDeleteClick}) => {
  return (
    <section className="overflow-x-auto shadow-xl max-h-[calc(100vh-200px)]">
      <table className="min-w-full  border-gray-300 ">
        <thead className="sticky top-0 bg-gray-400">
          <tr>
            <th className="p-2 border text-left">#</th>
            <th className="p-2 border text-left">Location Name</th>
            <th className="p-2 border text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location, idx) => (
            <tr key={location.id}>
              <td className="p-2 border ">{idx + 1}</td>
              <td className="p-2 border ">{location.name}</td>
              <td className="p-3 border flex space-x-4">
                <button onClick={() => onEditClick(location)}>
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDeleteClick(location.id, location.name)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default LocationTable;
