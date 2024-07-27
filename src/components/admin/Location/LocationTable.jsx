import React from "react";
import {FaEdit, FaTrash} from "react-icons/fa";

const LocationTable = ({locations, onEditClick, onDeleteClick}) => {
  return (
    <table className="min-w-full bg-white border border-gray-300 shadow-xl">
      <thead>
        <tr>
          <th className="p-2 border text-left">Location Name</th>
          <th className="p-2 border text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((location) => (
          <tr key={location.id}>
            <td className="p-2 border ">{location.name}</td>
            <td className="p-3 border flex space-x-4">
              <button
                onClick={() => onEditClick(location)}
              >
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
  );
};

export default LocationTable;
