import React from "react";
import {FaEdit, FaTrash} from "react-icons/fa";

const CategoryTable = ({categories, onEditClick, onDeleteClick}) => {
  return (
    <div className="overflow-x-auto shadow-xl max-h-[calc(100vh-200px)]">
      <table className="min-w-full border">
        <thead className="bg-gray-400 sticky top-0">
          <tr >
            <th className="px-4 text-left py-2 ">#</th>
            <th className="px-4 text-left py-2 ">Name</th>
            <th className="px-4 text-left py-2 ">Image</th>
            <th className="px-4 text-left py-2 ">Action</th>
          </tr>
        </thead>
        <tbody >
          {categories.map((category, idx) => (
            <tr key={category.id} className="border-t">
              <td className="px-4 py-2 border">{idx + 1}</td>
              <td className="px-4 py-2 border">{category.name}</td>
              <td className="px-4 py-2 border">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="px-4 py-2 mt-4 flex  space-x-2">
                <button onClick={() => onEditClick(category)}>
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDeleteClick(category.id, category.name)}
                >
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
