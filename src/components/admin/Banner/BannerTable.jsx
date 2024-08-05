import React from "react";
import {FaEdit, FaTrash} from "react-icons/fa";

const BannerTable = ({banners, onEditClick, onDeleteClick}) => {
  return (
    <div className="overflow-x-auto shadow-xl max-h-[calc(100vh-200px)] ">
      <table className="min-w-[640px] bg-white border">
        <thead className="bg-gray-400 sticky top-0">
          <tr>
            <th className="px-4 py-2 ">#</th>
            <th className="px-4 py-2 ">Image</th>
            <th className="px-4 py-2 ">Description</th>
            <th className="px-4 py-2 ">Action</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner, idx) => (
            <tr
              key={banner.id}
              className={` hover:bg-gray-200 ${
                idx % 2 == 0 ? "bg-gray-100" : ""
              }`}
            >
              <td className="px-4 py-2 ">{idx + 1}</td>
              <td className="px-4 py-2  text-center">
                {banner.image ? (
                  <img
                    src={banner.image}
                    alt="Banner"
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  <span>No image</span>
                )}
              </td>
              <td className="px-4 py-2">{banner.description}</td>
              <td className="px-4 py-2 flex justify-center space-x-2 mt-5">
                <button onClick={() => onEditClick(banner)}>
                  <FaEdit />
                </button>
                <button
                  onClick={() =>
                    onDeleteClick(banner.id, banner.description.split(" ")[0])
                  }
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

export default BannerTable;
