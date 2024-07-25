import React from "react";
import {FaEdit, FaTrash} from "react-icons/fa";

const CategoryTable = ({categories, onEditClick}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-t">
              <td className="px-4 py-2 border">{category.name}</td>
              <td className="px-4 py-2 border">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="px-4 py-2 mt-4 flex justify-center space-x-2">
                <button
                  className="text-blue-500"
                  onClick={() => onEditClick(category)}
                >
                  <FaEdit />
                </button>
                <button className="text-red-500">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
